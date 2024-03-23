import { Body, Controller, Get, Post } from '@nestjs/common'

import { AppTrackerService } from './app-tracker.service'

@Controller('app-tracker')
export class AppTrackerController {
  constructor(private readonly appTrackerService: AppTrackerService) {}

  @Post()
  createAppTracking(@Body() { name }) {
    return this.appTrackerService.createAppTracking({ name, startDate: new Date(), endDate: new Date(), duration: 0 })
  }

  @Get()
  getGroupPosts() {
    return this.appTrackerService.getAppTracking()
  }
}
