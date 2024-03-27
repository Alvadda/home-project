import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'

import { CreateSession, SessionRo } from './dto/sessions.dto'
import { SessionsService } from './sessions.service'

@ApiTags('Application/Sessions')
@Controller('application/:appId/sessions')
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @Post()
  @ApiResponse({
    status: 200,
    type: SessionRo,
  })
  createSession(@Param('appId', ParseIntPipe) appId: number, @Body() body: CreateSession) {
    return this.sessionsService.createAppSession(appId, body)
  }

  @Get()
  @ApiResponse({
    status: 200,
    type: [SessionRo],
  })
  getSessionForApp(@Param('appId', ParseIntPipe) appId: number) {
    return this.sessionsService.getSessionsForApp(appId)
  }
}
