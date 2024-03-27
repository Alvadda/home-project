import { Module } from '@nestjs/common'

import { PrismaModule } from '@/prisma/prisma.module'

import { ApplicationModule } from './application/application.module'

@Module({
  imports: [PrismaModule, ApplicationModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
