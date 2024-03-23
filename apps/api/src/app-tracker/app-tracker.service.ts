import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'

import { PrismaService } from '@/prisma/prisma.service'

@Injectable()
export class AppTrackerService {
  constructor(private prisma: PrismaService) {}

  createAppTracking(data: Prisma.AppTrackingCreateInput) {
    return this.prisma.appTracking.create({
      data,
    })
  }

  getAppTracking() {
    return this.prisma.appTracking.findMany()
  }
}
