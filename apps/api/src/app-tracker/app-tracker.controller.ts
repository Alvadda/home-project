import { Body, Controller, Get, Post } from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'

import { AppTrackingResponseDto, CreateAppTrackingDto } from '@/app-tracker/dto/create-app-tracking.dto'

import { AppTrackerService } from './app-tracker.service'

@ApiTags('App Tracker')
@Controller('app-tracker')
export class AppTrackerController {
  constructor(private readonly appTrackerService: AppTrackerService) {}

  @Post()
  @ApiResponse({
    status: 200,
    type: AppTrackingResponseDto,
  })
  createAppTracking(@Body() params: CreateAppTrackingDto) {
    return this.appTrackerService.createAppTracking({ ...params })
  }

  @Get()
  @ApiResponse({
    status: 200,
    type: [AppTrackingResponseDto],
  })
  getGroupPosts() {
    return this.appTrackerService.getAppTracking()
  }
}
