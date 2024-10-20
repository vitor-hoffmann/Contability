import { Module } from '@nestjs/common';
import { AppService } from '../services/app.service';
import { PrismaModule } from '../models/prisma.module';
import { UserService } from '../user/user.service';
import { UserController } from '../user/user.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../auth/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from '../auth/auth.service';
import { AuthController } from '../auth/auth.controller';
import { TablesService } from 'src/tables/tables.service';
import { TablesController } from 'src/tables/tables.controller';

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
  controllers: [UserController, AuthController, TablesController],
  providers: [AppService, UserService, AuthService, JwtStrategy, TablesService],
  exports: [JwtModule],
})
export class AppModule {}
