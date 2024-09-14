import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaModule } from './prisma.module';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [AppService, UserService],
})
export class AppModule {}
