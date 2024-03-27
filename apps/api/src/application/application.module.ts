import { Module } from '@nestjs/common'

import { ApplicationController } from './application.controller'
import { ApplicationService } from './application.service'
import { SessionsModule } from './sessions/sessions.module'

@Module({
  imports: [SessionsModule],
  controllers: [ApplicationController],
  providers: [ApplicationService],
})
export class ApplicationModule {}
