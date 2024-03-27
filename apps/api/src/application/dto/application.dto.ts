import { ApiProperty } from '@nestjs/swagger'
import { IsHexColor, IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreateApplicationDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  processName: string

  @IsString()
  @IsOptional()
  titleDetail?: string

  @IsString()
  @IsNotEmpty()
  @IsHexColor()
  color: string
}

export class ApplicationRo extends CreateApplicationDto {
  id: number
}
