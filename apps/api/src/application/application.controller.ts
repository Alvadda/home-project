import { Body, Controller, Get, Post } from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'

import { ApplicationService } from './application.service'
import { ApplicationRo, CreateApplicationDto } from './dto/application.dto'

@ApiTags('Application')
@Controller('application')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Post()
  @ApiResponse({
    status: 200,
    type: ApplicationRo,
  })
  createTrackingApp(@Body() params: CreateApplicationDto) {
    return this.applicationService.createTrackingApp({ ...params })
  }

  @Get()
  @ApiResponse({
    status: 200,
    type: [ApplicationRo],
  })
  getTrackingApps() {
    return this.applicationService.getTrackingApps()
  }
}
