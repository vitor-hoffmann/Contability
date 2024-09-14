import { Module } from '@nestjs/common';
import { AppService } from '../services/app.service';
import { PrismaModule } from '../models/prisma.module';
import { UserService } from '../services/user.service';
import { UserController } from '../controller/user.controller';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [AppService, UserService],
})
export class AppModule {}
