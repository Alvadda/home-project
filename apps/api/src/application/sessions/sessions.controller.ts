import { Body, Controller, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'

import { CreateSession, SessionPeriod, SessionRo } from './dto/sessions.dto'
import { SessionsService } from './sessions.service'

@ApiTags('Application/Sessions')
@Controller('application')
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @Post(':appId/sessions')
  @ApiResponse({
    status: 200,
    type: SessionRo,
  })
  createSession(@Param('appId', ParseIntPipe) appId: number, @Body() body: CreateSession) {
    return this.sessionsService.createAppSession(appId, body)
  }

  @Get(':appId/sessions')
  @ApiResponse({
    status: 200,
    type: [SessionRo],
  })
  getSessionForApp(@Param('appId', ParseIntPipe) appId: number) {
    return this.sessionsService.getSessionsForApp(appId)
  }

  @Get('sessions/period')
  @ApiResponse({
    status: 200,
    type: [SessionRo],
  })
  getSessionsForPeriod(@Query() query: SessionPeriod) {
    return this.sessionsService.getSessionsForPeriod(query.startDate, query.endDate)
  }
}
