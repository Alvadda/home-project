import { Module } from '@nestjs/common'

import { AppTrackerController } from './app-tracker.controller'
import { AppTrackerService } from './app-tracker.service'

@Module({
  controllers: [AppTrackerController],
  providers: [AppTrackerService],
})
export class AppTrackerModule {}
