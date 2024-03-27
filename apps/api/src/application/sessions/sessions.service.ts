import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { differenceInSeconds } from 'date-fns'

import { PrismaService } from '@/prisma/prisma.service'

@Injectable()
export class SessionsService {
  constructor(private prisma: PrismaService) {}

  private async throwIfAppDoesNotExist(appId: number) {
    const applicationExist = await this.prisma.trackedApplications.findFirst({ where: { id: appId } })
    if (!applicationExist) throw new HttpException('Application not found', HttpStatus.NOT_FOUND)

    return applicationExist
  }

  async createAppSession(appId: number, data: Omit<Prisma.AppUsageSessionsCreateWithoutApplicationInput, 'duration'>) {
    await this.throwIfAppDoesNotExist(appId)

    const duration = differenceInSeconds(data.endTime, data.startTime)

    return this.prisma.appUsageSessions.create({
      data: {
        ...data,
        applicationId: appId,
        duration,
      },
    })
  }

  async getSessionsForApp(appId: number) {
    await this.throwIfAppDoesNotExist(appId)

    return this.prisma.appUsageSessions.findMany({ where: { applicationId: appId } })
  }
}
