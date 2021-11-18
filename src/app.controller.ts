import { Controller, Res, Get, Post, Body, Param } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { FastifyReply } from 'fastify'
import * as Responses from './responses';

@Controller()
export class AppController {
  constructor(private readonly appService: PrismaService) {}

  @Get()
  getIndex(): string {
    return "{}";
  }

  @Post('v1/validate-user-login')
  async validateUserLogin(
    @Res() res: FastifyReply,
    @Body() data: { username: string, password: string }) {

  }

  @Post('v1/validate-access-token')
  async validateAccessToken(
    @Res() res: FastifyReply,
    @Body() data: { userId: string, accessToken: string }) {

  }

  @Post('v1/validate-email-verification')
  async validateEmailVerification(
    @Res() res: FastifyReply,
    @Body() data: { userId: string }) {

  }

  @Post('/validate-email-availability')
  async validateEmailAvailability(
    @Res() res: FastifyReply,
    @Body() data: { email: string }) {

  }

  @Get('v1/user-level/:userId')
  async getUserLevel(
    @Res() res: FastifyReply,
    @Param('userId') userId: string) {

  }

  @Get('v1/user-gold/:userId')
  async getUserGold(
    @Res() res: FastifyReply,
    @Param('userId') userId: string) {

  }

  @Post('v1/update-user-gold')
  async updateUserGold(
    @Res() res: FastifyReply,
    @Body() data: { userId: string, amount: number }) {

  }

  @Get('v1/user-cash/:userId')
  async getUserCash(
    @Res() res: FastifyReply,
    @Param('userId') userId: string) {

  }

  @Post('v1/update-user-cash')
  async updateUserCash(
    @Res() res: FastifyReply,
    @Body() data: { userId: string, amount: number }) {

  }

  @Post('v1/update-access-token')
  async updateAccessToken(
    @Res() res: FastifyReply,
    @Body() data: { userId: string, accessToken: string }) {

  }

  @Post('v1/create-user-login')
  async createUserLogin(
    @Res() res: FastifyReply,
    @Body() data: { username: string, password: string, email: string }) {

  }

  @Post('/validate-username-availability')
  async validateUsernameAvailability(
    @Res() res: FastifyReply,
    @Body() data: { username: string }) {

  }

  @Get('v1/user-unban-time/:userId')
  async getUserUnbanTime(
    @Res() res: FastifyReply,
    @Param('userId') userId: string) {

  }

  @Post('v1/update-user-unban-time')
  async updateUserUnbanTime(
    @Res() res: FastifyReply,
    @Body() data: { characterName: string, unbanTime: number }) {

  }

  @Post('v1/update-character-unmute-time')
  async updateCharacterUnmuteTime(
    @Res() res: FastifyReply,
    @Body() data: { characterName: string, unmuteTime: number }) {

  }
}
