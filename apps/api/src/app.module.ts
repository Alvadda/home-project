import { Module } from '@nestjs/common'

import { PrismaModule } from '@/prisma/prisma.module'

import { AppTrackerModule } from './app-tracker/app-tracker.module'

@Module({
  imports: [PrismaModule, AppTrackerModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
