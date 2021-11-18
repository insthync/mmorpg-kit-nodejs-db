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

  // User / Character
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

  @Post('v1/check-email-availability')
  async validateEmailAvailability(
    @Res() res: FastifyReply,
    @Body() data: { email: string }) {

  }

  @Post('v1/check-username-availability')
  async validateUsernameAvailability(
    @Res() res: FastifyReply,
    @Body() data: { username: string }) {

  }

  @Get('v1/users/:userId/level')
  async getUserLevel(
    @Res() res: FastifyReply,
    @Param('userId') userId: string) {

  }

  @Get('v1/users/:userId/gold')
  async getUserGold(
    @Res() res: FastifyReply,
    @Param('userId') userId: string) {

  }

  @Post('v1/update-user-gold')
  async updateUserGold(
    @Res() res: FastifyReply,
    @Body() data: { userId: string, amount: number }) {

  }

  @Get('v1/users/:userId/cash')
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

  @Get('v1/users/:userId/unbanTime')
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

  @Post('v1/check-character-name-availability')
  async validateCharacterNameAvailability(
    @Res() res: FastifyReply,
    @Body() data: { characterName: string }) {

  }

  @Post('v1/create-character')
  async createCharacter(
    @Res() res: FastifyReply,
    @Body() data: { userId: string, character: any }) {

  }

  @Post('v1/read-characters')
  async readCharacters(
    @Res() res: FastifyReply,
    @Body() data: { userId: string }) {

  }
  
  @Post('v1/read-character')
  async readCharacter(
    @Res() res: FastifyReply,
    @Body() data: { characterId: string }) {

  }

  @Post('v1/update-character')
  async updateCharacter(
    @Res() res: FastifyReply,
    @Body() data: { userId: string, character: any }) {

  }

  @Post('v1/delete-character')
  async deleteCharacter(
    @Res() res: FastifyReply,
    @Body() data: { userId: string, characterId: string }) {

  }
  
  @Post('v1/read-summon-buffs')
  async readSummonBuffs(
    @Res() res: FastifyReply,
    @Body() data: { characterId: string }) {

  }

  @Post('v1/update-summon-buffs')
  async updateSummonBuffs(
    @Res() res: FastifyReply,
    @Body() data: { characterId: string, summonBuffs: Array<any> }) {

  }

  @Post('v1/find-characters')
  async findCharacters(
    @Res() res: FastifyReply,
    @Body() data: { characterName: string }) {

  }

  @Post('v1/create-friend')
  async createFriend(
    @Res() res: FastifyReply,
    @Body() data: { id1: string, id2: string }) {

  }

  @Post('v1/delete-friend')
  async deleteFriend(
    @Res() res: FastifyReply,
    @Body() data: { id1: string, id2: string }) {

  }

  @Get('v1/characters/:characterId/friends')
  async getFriends(
    @Res() res: FastifyReply,
    @Param('characterId') characterId: string) {

  }

  @Post('v1/read-character-id')
  async readCharacterId(
    @Res() res: FastifyReply,
    @Body() data: { characterName: string }) {

  }

  @Post('v1/read-user-id')
  async readUserId(
    @Res() res: FastifyReply,
    @Body() data: { characterName: string }) {

  }

  // Building
  @Post('v1/create-building')
  async createBuilding(
    @Res() res: FastifyReply,
    @Body() data: { mapName: string, building: any }) {

  }

  @Post('v1/read-buildings')
  async readBuildings(
    @Res() res: FastifyReply,
    @Body() data: { mapName: string }) {

  }

  @Post('v1/update-building')
  async updateBuilding(
    @Res() res: FastifyReply,
    @Body() data: { mapName: string, building: any }) {

  }

  @Post('v1/delete-building')
  async deleteBuilding(
    @Res() res: FastifyReply,
    @Body() data: { mapName: string, buildingId: string }) {

  }

  // Party
  @Post('v1/create-party')
  async createParty(
    @Res() res: FastifyReply,
    @Body() data: { shareExp: boolean, shareItem: boolean, leaderId: string }) {

  }

  @Post('v1/read-party')
  async readParty(
    @Res() res: FastifyReply,
    @Body() data: { partyId: number }) {

  }

  @Post('v1/update-party-leader')
  async updatePartyLeader(
    @Res() res: FastifyReply,
    @Body() data: { partyId: number, leaderId: string }) {

  }

  @Post('v1/update-party')
  async updateParty(
    @Res() res: FastifyReply,
    @Body() data: { partyId: number, shareExp: boolean, shareItem: boolean }) {

  }

  @Post('v1/delete-party')
  async deleteParty(
    @Res() res: FastifyReply,
    @Body() data: { partyId: number }) {

  }

  @Post('v1/update-character-party')
  async updateCharacterParty(
    @Res() res: FastifyReply,
    @Body() data: { characterId: string, partyId: number }) {

  }
  
  // Guild
  @Post('v1/check-guild-name-availability')
  async validateGuildNameAvailability(
    @Res() res: FastifyReply,
    @Body() data: { guildName: string }) {

  }

  @Post('v1/create-guild')
  async createGuild(
    @Res() res: FastifyReply,
    @Body() data: { shareExp: boolean, shareItem: boolean, leaderId: string }) {

  }

  @Post('v1/read-guild')
  async readGuild(
    @Res() res: FastifyReply,
    @Body() data: { guildId: number }) {

  }

  @Post('v1/update-guild-level')
  async updateGuildLevel(
    @Res() res: FastifyReply,
    @Body() data: { guildId: number, level: number, exp: number, skillPoint: number }) {

  }

  @Post('v1/update-guild-leader')
  async updateGuildLeader(
    @Res() res: FastifyReply,
    @Body() data: { guildId: number, leaderId: string }) {

  }

  @Post('v1/update-guild-message')
  async updateGuildMessage(
    @Res() res: FastifyReply,
    @Body() data: { guildId: number, guildMessage: string }) {

  }

  @Post('v1/update-guild-message2')
  async updateGuildMessage2(
    @Res() res: FastifyReply,
    @Body() data: { guildId: number, guildMessage2: string }) {

  }

  @Post('v1/update-guild-score')
  async updateGuildScore(
    @Res() res: FastifyReply,
    @Body() data: { guildId: number, score: number }) {

  }

  @Post('v1/update-guild-options')
  async updateGuildOptions(
    @Res() res: FastifyReply,
    @Body() data: { guildId: number, options: string }) {

  }

  @Post('v1/update-guild-auto-accept-requests')
  async updateGuildAutoAcceptRequests(
    @Res() res: FastifyReply,
    @Body() data: { guildId: number, autoAcceptRequests: boolean }) {

  }

  @Post('v1/update-guild-rank')
  async updateGuildRank(
    @Res() res: FastifyReply,
    @Body() data: { guildId: number, rank: string }) {

  }

  @Post('v1/update-guild-role')
  async updateGuildRole(
    @Res() res: FastifyReply,
    @Body() data: { guildId: number, guildRole: number, name: string, canInvite: boolean, canKick: boolean, shareExpPercentage: number }) {

  }

  @Post('v1/update-guild-member-role')
  async updateGuildMemberRole(
    @Res() res: FastifyReply,
    @Body() data: { characterId: string, guildRole: number }) {

  }

  @Post('v1/update-guild-skill-level')
  async updateGuildSkillLevel(
    @Res() res: FastifyReply,
    @Body() data: { guildId: number, skillDataId: number, skillLevel: number, skillPoint: number }) {

  }

  @Post('v1/delete-guild')
  async deleteGuild(
    @Res() res: FastifyReply,
    @Body() data: { guildId: number }) {

  }

  @Post('v1/update-character-guild')
  async updateCharacterGuild(
    @Res() res: FastifyReply,
    @Body() data: { characterId: string, guildId: number, guildRole: number }) {

  }

  @Get('v1/guilds/:guildId/gold')
  async getGuildGold(
    @Res() res: FastifyReply,
    @Param('guildId') guildId: number) {

  }

  @Post('v1/update-guild-gold')
  async updateGuildGold(
    @Res() res: FastifyReply,
    @Body() data: { guildId: number, amount: number }) {

  }

  // Storage items
  @Post('v1/read-storage-items')
  async readStorageItems(
    @Res() res: FastifyReply,
    @Body() data: { storageType: number, storageOwner: string }) {

  }

  @Post('v1/update-storage-items')
  async updateStorageItems(
    @Res() res: FastifyReply,
    @Body() data: { storageType: number, storageOwner: string, storageItems: Array<any> }) {

  }

  // Mail
  @Post('v1/create-mail')
  async createMail(
    @Res() res: FastifyReply,
    @Body() data: { mail: any }) {

  }

  @Post('v1/read-mails')
  async readMails(
    @Res() res: FastifyReply,
    @Body() data: { userId: string, onlyNewMails: boolean }) {

  }
  
  @Post('v1/read-mail')
  async readMail(
    @Res() res: FastifyReply,
    @Body() data: { userId: string, mailId: string }) {

  }
  
  @Post('v1/update-read-mail-state')
  async updateReadMailState(
    @Res() res: FastifyReply,
    @Body() data: { userId: string, mailId: string }) {

  }
  
  @Post('v1/update-claim-mail-items-state')
  async updateClaimMailItemsState(
    @Res() res: FastifyReply,
    @Body() data: { userId: string, mailId: string }) {

  }
  
  @Post('v1/update-delete-mail-state')
  async updateDeleteMailState(
    @Res() res: FastifyReply,
    @Body() data: { userId: string, mailId: string }) {

  }

  @Get('v1/users/:userId/mail-notification-count')
  async getMailNotificationCount(
    @Res() res: FastifyReply,
    @Param('userId') userId: string) {

  }
}
