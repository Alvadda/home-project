import { Transform } from 'class-transformer'
import { IsDate, IsNotEmpty } from 'class-validator'

export class CreateSession {
  @Transform(({ value }) => new Date(value), { toClassOnly: true })
  @IsDate()
  @IsNotEmpty()
  startTime: Date

  @Transform(({ value }) => new Date(value), { toClassOnly: true })
  @IsDate()
  @IsNotEmpty()
  endTime: Date
}

export class SessionRo extends CreateSession {
  id: number
  applicationId: number
  duration: number
}

export class SessionPeriod {
  @Transform(({ value }) => new Date(value), { toClassOnly: true })
  @IsDate()
  @IsNotEmpty()
  startDate: Date

  @Transform(({ value }) => new Date(value), { toClassOnly: true })
  @IsDate()
  @IsNotEmpty()
  endDate: Date
}
