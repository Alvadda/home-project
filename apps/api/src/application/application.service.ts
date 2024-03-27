import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'

import { PrismaService } from '@/prisma/prisma.service'

@Injectable()
export class ApplicationService {
  constructor(private prisma: PrismaService) {}

  async createTrackingApp(data: Prisma.TrackedApplicationsCreateInput) {
    const appExist = this.prisma.trackedApplications.findFirst({ where: { processName: data.processName, titleDetail: data.titleDetail } })
    if (appExist) throw new HttpException('Application already exist', HttpStatus.CONFLICT)

    return this.prisma.trackedApplications.create({
      data,
    })
  }

  getTrackingApps() {
    return this.prisma.trackedApplications.findMany()
  }
}
