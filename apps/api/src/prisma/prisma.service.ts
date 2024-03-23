import { Injectable, OnModuleInit } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    try {
      this.$connect()
      console.log('Connected to DB')
    } catch (error) {
      console.log('Error connecting to DB: ', error)
    }
  }
}
