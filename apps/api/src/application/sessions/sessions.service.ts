import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { AppUsageSessions, Prisma, TrackedApplications } from '@prisma/client'
import { differenceInSeconds } from 'date-fns'

import { PrismaService } from '@/prisma/prisma.service'

type SessionWithApplication = AppUsageSessions & {
  application: TrackedApplications
}

type ApplicationWithSessions = TrackedApplications & {
  sessions: SessionWithApplication[]
}

@Injectable()
export class SessionsService {
  constructor(private prisma: PrismaService) {}

  private async throwIfAppDoesNotExist(appId: number) {
    const applicationExist = await this.prisma.trackedApplications.findFirst({ where: { id: appId } })
    if (!applicationExist) throw new HttpException('Application not found', HttpStatus.NOT_FOUND)

    return applicationExist
  }

  private groupBySessionsByApplication(sessions: SessionWithApplication[]) {
    return sessions.reduce((acc, session) => {
      const application = session.application

      const exist = acc.findIndex((a) => a.id === application.id)

      if (exist !== -1) {
        acc[exist].sessions.push(session)
        return acc
      }

      acc.push({ ...application, sessions: [session] })
      return acc
    }, [] as ApplicationWithSessions[])
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

  async getSessionsForPeriod(startDate: Date, endDate: Date) {
    const sessions = await this.prisma.appUsageSessions.findMany({
      where: {
        endTime: {
          lte: endDate,
          gte: startDate,
        },
      },
      include: { application: true },
    })

    return this.groupBySessionsByApplication(sessions)
  }
}
