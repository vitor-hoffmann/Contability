import { Module } from '@nestjs/common';
import { AppService } from '../services/app.service';
import { PrismaModule } from '../models/prisma.module';
import { UserService } from '../services/user.service';
import { UserController } from '../controller/user.controller';
import { ExpensesController } from 'src/controller/expenses.controller';
import { ExpensesService } from 'src/services/expenses.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../auth/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from '../services/auth.service';
import { AuthController } from '../controller/auth.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PassportModule,
    PrismaModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '60m' },
      }),
    }),
  ],
  controllers: [UserController, ExpensesController, AuthController],
  providers: [
    AppService,
    UserService,
    AuthService,
    ExpensesService,
    JwtStrategy,
  ],
  exports: [JwtModule],
})
export class AppModule {}
