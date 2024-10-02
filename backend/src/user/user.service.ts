import { Injectable } from '@nestjs/common';
import { PrismaService } from '../services/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async findAll() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        tables: true,
        isConfirmed: true,
        createdAt: true,
      },
    });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        tables: true,
        isConfirmed: true,
        createdAt: true,
      },
    });
  }

  async create(data: { name: string; email: string; password: string }) {
    const user = await this.prisma.user.create({
      data,
    });
    const token = this.jwtService.sign(
      { email: user.email },
      { expiresIn: '1h' },
    );
    await this.sendActivationEmail(user.email, token);
    return user;
  }

  async delete(email: string) {
    return this.prisma.user.delete({
      where: {
        email: email,
      },
    });
  }

  async recover(email: string) {
    const user = await this.findByEmail(email);
    if (user === null) {
      throw new Error('User not found');
    }
    const token = this.jwtService.sign({ email: email }, { expiresIn: '1h' });
    await this.sendRecoverEmail(email, token);
  }

  async reset(token: string, password: string) {
    try {
      const decoded = this.jwtService.verify(token);

      const user = await this.findByEmail(decoded.email);

      if (user === null) {
        throw new Error('User not found');
      }

      await this.prisma.user.update({
        where: { email: user.email },
        data: { password: password },
      });

      return { message: 'Password successfully reset' };
    } catch (error) {
      return { message: 'Invalid or expired token' };
    }
  }

  async sendRecoverEmail(email: string, token: string) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.configService.get<string>('EMAIL_USER'),
        pass: this.configService.get<string>('EMAIL_PASS'),
      },
    });
    const recoverLink = `${process.env.CLIENT_URL}/resetpassword?token=${token}`;
    const mailOptions = {
      from: this.configService.get<string>('EMAIL_USER'),
      to: email,
      subject: 'Recover your account',
      text: `Click the following link to recover your password: ${recoverLink}`,
    };
    await transporter.sendMail(mailOptions);
  }

  async sendActivationEmail(email: string, token: string) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.configService.get<string>('EMAIL_USER'),
        pass: this.configService.get<string>('EMAIL_PASS'),
      },
    });
    const activationLink = `${process.env.CLIENT_URL}/activate-account?token=${token}`;
    const mailOptions = {
      from: this.configService.get<string>('EMAIL_USER'),
      to: email,
      subject: 'Activate your account',
      text: `Click the following link to activate your account: ${activationLink}`,
    };
    await transporter.sendMail(mailOptions);
  }

  async confirmEmail(token: string) {
    try {
      const decoded = this.jwtService.verify(token);
      const user = await this.prisma.user.findUnique({
        where: { email: decoded.email },
      });

      if (!user) {
        throw new Error('User not found');
      }

      await this.prisma.user.update({
        where: { email: user.email },
        data: { isConfirmed: 1 },
      });

      return { message: 'Account successfully activated' };
    } catch (error) {
      throw new Error('Invalid or expired token');
    }
  }
}
