import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreateAppTrackingDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsDate()
  @IsNotEmpty()
  startDate: Date

  @IsDate()
  @IsNotEmpty()
  endDate: Date

  @IsNumber()
  @IsNotEmpty()
  duration: number
}

export class AppTrackingResponseDto extends CreateAppTrackingDto {
  id: number
}
