import { Controller, Res, Get, Post, Body, Param } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { FastifyReply } from 'fastify';
import { nanoid } from 'nanoid';
import * as prisma from '@prisma/client';
import * as bcrypt from 'bcrypt';
import * as Responses from './responses';

const AUTH_TYPE_NORMAL: number = 1

@Controller()
export class AppController {
  constructor(private readonly appService: PrismaService) { }

  @Get()
  getIndex(): string {
    return "{}";
  }

  // User / Character
  @Post('v1/validate-user-login')
  async validateUserLogin(
    @Res() res: FastifyReply,
    @Body() data: { username: string, password: string }
  ) {
    const userLogin = await this.appService.userlogin.findFirst({
      where: {
        username: data.username,
        authType: AUTH_TYPE_NORMAL,
      }
    })
    if (!userLogin) {
      res.status(404).send();
      return;
    }
    const isValid: boolean = await bcrypt.compare(data.password, userLogin.password);
    if (!isValid) {
      res.status(400).send();
      return;
    }
    res.status(200).send();
  }

  @Post('v1/validate-access-token')
  async validateAccessToken(
    @Res() res: FastifyReply,
    @Body() data: { userId: string, accessToken: string }
  ) {
    const userLogin = await this.appService.userlogin.findFirst({
      where: {
        id: data.userId,
        accessToken: data.accessToken,
      }
    });
    if (!userLogin) {
      res.status(400).send();
      return;
    }
    res.status(200).send();
  }

  @Post('v1/validate-email-verification')
  async validateEmailVerification(
    @Res() res: FastifyReply,
    @Body() data: { userId: string }
  ) {
    const userLogin = await this.appService.userlogin.findFirst({
      where: {
        id: data.userId,
        isEmailVerified: true,
      }
    });
    if (!userLogin) {
      res.status(400).send();
      return;
    }
    res.status(200).send();
  }

  @Post('v1/check-email-availability')
  async validateEmailAvailability(
    @Res() res: FastifyReply,
    @Body() data: { email: string }
  ) {
    const count = await this.appService.userlogin.count({
      where: {
        email: data.email
      }
    });
    if (count > 0) {
      res.status(400).send();
      return;
    }
    res.status(200).send();
  }

  @Post('v1/check-username-availability')
  async validateUsernameAvailability(
    @Res() res: FastifyReply,
    @Body() data: { username: string }
  ) {
    const count = await this.appService.userlogin.count({
      where: {
        username: data.username
      }
    });
    if (count > 0) {
      res.status(400).send();
      return;
    }
    res.status(200).send();
  }

  @Get('v1/users/:userId/level')
  async getUserLevel(
    @Res() res: FastifyReply,
    @Param('userId') userId: string
  ) {
    const userLogin = await this.appService.userlogin.findUnique({
      where: {
        id: userId
      },
      select: {
        userLevel: true,
      }
    });
    if (!userLogin) {
      res.status(404).send();
      return;
    }
    res.status(200).send({
      userLevel: userLogin.userLevel
    } as Responses.UserLevelResp);
  }

  @Get('v1/users/:userId/gold')
  async getUserGold(
    @Res() res: FastifyReply,
    @Param('userId') userId: string
  ) {
    const userLogin = await this.appService.userlogin.findUnique({
      where: {
        id: userId
      },
      select: {
        gold: true,
      }
    });
    if (!userLogin) {
      res.status(404).send();
      return;
    }
    res.status(200).send({
      gold: userLogin.gold
    } as Responses.GoldResp);
  }

  @Post('v1/update-user-gold')
  async updateUserGold(
    @Res() res: FastifyReply,
    @Body() data: { userId: string, gold: number }
  ) {
    const userLogin = await this.appService.userlogin.update({
      where: {
        id: data.userId
      },
      data: {
        gold: data.gold
      }
    });
    if (!userLogin) {
      res.status(404).send();
      return;
    }
    res.status(200).send();
  }

  @Get('v1/users/:userId/cash')
  async getUserCash(
    @Res() res: FastifyReply,
    @Param('userId') userId: string
  ) {
    const userLogin = await this.appService.userlogin.findUnique({
      where: {
        id: userId
      },
      select: {
        cash: true,
      }
    });
    if (!userLogin) {
      res.status(404).send();
      return;
    }
    res.status(200).send({
      cash: userLogin.cash
    } as Responses.CashResp);
  }

  @Post('v1/update-user-cash')
  async updateUserCash(
    @Res() res: FastifyReply,
    @Body() data: { userId: string, cash: number }
  ) {
    const userLogin = await this.appService.userlogin.update({
      where: {
        id: data.userId
      },
      data: {
        cash: data.cash
      }
    });
    if (!userLogin) {
      res.status(404).send();
      return;
    }
    res.status(200).send();
  }

  @Get('v1/users/:userId/unbanTime')
  async getUserUnbanTime(
    @Res() res: FastifyReply,
    @Param('userId') userId: string
  ) {
    const userLogin = await this.appService.userlogin.findUnique({
      where: {
        id: userId
      },
      select: {
        unbanTime: true,
      }
    });
    if (!userLogin) {
      res.status(404).send();
      return;
    }
    res.status(200).send({
      unbanTime: userLogin.unbanTime
    } as Responses.UnbanTimeResp);
  }

  @Post('v1/update-user-unban-time')
  async updateUserUnbanTime(
    @Res() res: FastifyReply,
    @Body() data: { characterName: string, unbanTime: bigint }
  ) {
    const character = await this.appService.characters.findFirst({
      where: {
        characterName: data.characterName
      }
    });
    if (!character) {
      res.status(404).send();
      return;
    }
    const userLogin = await this.appService.userlogin.update({
      where: {
        id: character.userId
      },
      data: {
        unbanTime: data.unbanTime
      }
    })
    if (!userLogin) {
      res.status(404).send();
      return;
    }
    res.status(200).send();
  }

  @Post('v1/update-character-unmute-time')
  async updateCharacterUnmuteTime(
    @Res() res: FastifyReply,
    @Body() data: { characterName: string, unmuteTime: bigint }
  ) {
    let character = await this.appService.characters.findFirst({
      where: {
        characterName: data.characterName
      }
    });
    if (!character) {
      res.status(404).send();
      return;
    }
    character = await this.appService.characters.update({
      where: {
        id: character.id
      },
      data: {
        unmuteTime: data.unmuteTime
      }
    })
    res.status(200).send();
  }

  @Post('v1/update-access-token')
  async updateAccessToken(
    @Res() res: FastifyReply,
    @Body() data: { userId: string, accessToken: string }
  ) {
    const userLogin = await this.appService.userlogin.update({
      where: {
        id: data.userId
      },
      data: {
        accessToken: data.accessToken
      }
    })
    if (!userLogin) {
      res.status(404).send();
      return;
    }
    res.status(200).send();
  }

  @Post('v1/create-user-login')
  async createUserLogin(
    @Res() res: FastifyReply,
    @Body() data: { username: string, password: string, email: string }
  ) {
    const userLogin = await this.appService.userlogin.create({
      data: {
        id: nanoid(),
        username: data.username,
        password: bcrypt.hashSync(data.password, bcrypt.genSaltSync()),
        email: data.email
      }
    })
    if (!userLogin) {
      res.status(500).send();
      return;
    }
    res.status(200).send();
  }

  @Post('v1/check-character-name-availability')
  async validateCharacterNameAvailability(
    @Res() res: FastifyReply,
    @Body() data: { characterName: string }
  ) {
    const count = await this.appService.characters.count({
      where: {
        characterName: data.characterName
      }
    });
    if (count > 0) {
      res.status(400).send();
      return;
    }
    res.status(200).send();
  }

  @Post('v1/create-character')
  async createCharacter(
    @Res() res: FastifyReply,
    @Body() data: { userId: string, character: any }
  ) {

  }

  @Post('v1/read-characters')
  async readCharacters(
    @Res() res: FastifyReply,
    @Body() data: { userId: string }
  ) {

  }

  @Post('v1/read-character')
  async readCharacter(
    @Res() res: FastifyReply,
    @Body() data: { characterId: string }
  ) {

  }

  @Post('v1/update-character')
  async updateCharacter(
    @Res() res: FastifyReply,
    @Body() data: { userId: string, character: any }
  ) {

  }

  @Post('v1/delete-character')
  async deleteCharacter(
    @Res() res: FastifyReply,
    @Body() data: { userId: string, characterId: string }
  ) {

  }

  @Post('v1/read-summon-buffs')
  async readSummonBuffs(
    @Res() res: FastifyReply,
    @Body() data: { characterId: string }
  ) {
    const summonBuffs = await this.appService.summonbuffs.findMany({
      where: {
        characterId: data.characterId
      }
    });
    res.status(200).send({
      summonBuffs: summonBuffs
    } as Responses.SummonBuffsResp);
  }

  @Post('v1/update-summon-buffs')
  async updateSummonBuffs(
    @Res() res: FastifyReply,
    @Body() data: { characterId: string, summonBuffs: Array<prisma.summonbuffs> }
  ) {
    await this.appService.summonbuffs.deleteMany({
      where: {
        characterId: data.characterId
      }
    });
    this.appService.summonbuffs.createMany({
      data: data.summonBuffs
    })
    res.status(200).send();
  }

  @Post('v1/find-characters')
  async findCharacters(
    @Res() res: FastifyReply,
    @Body() data: { characterName: string }
  ) {
    const characters = await this.appService.characters.findMany({
      where: {
        characterName: {
          contains: data.characterName
        }
      }
    });
    res.status(200).send({
      characters: characters
    } as Responses.CharactersResp);
  }

  @Post('v1/create-friend')
  async createFriend(
    @Res() res: FastifyReply,
    @Body() data: { id1: string, id2: string }
  ) {
    await this.appService.friend.create({
      data: {
        characterId1: data.id1,
        characterId2: data.id2
      }
    });
    res.status(200).send();
  }

  @Post('v1/delete-friend')
  async deleteFriend(
    @Res() res: FastifyReply,
    @Body() data: { id1: string, id2: string }
  ) {
    await this.appService.friend.deleteMany({
      where: {
        characterId1: data.id1,
        characterId2: data.id2
      }
    });
    res.status(200).send();
  }

  @Get('v1/characters/:characterId/friends')
  async getFriends(
    @Res() res: FastifyReply,
    @Param('characterId') characterId: string
  ) {
    const friends = await this.appService.friend.findMany({
      where: {
        characterId1: characterId
      },
      select: {
        characterId2: true
      }
    });
    const friendIds = new Array<string>();
    friends.forEach(friend => {
      friendIds.push(friend.characterId2);
    });
    const characters = await this.appService.characters.findMany({
      where: {
        id: {
          in: friendIds
        }
      }
    });
    res.status(200).send({
      characters: characters
    } as Responses.CharactersResp);
  }

  @Post('v1/read-character-id')
  async readCharacterId(
    @Res() res: FastifyReply,
    @Body() data: { characterName: string }
  ) {
    const character = await this.appService.characters.findFirst({
      where: {
        characterName: data.characterName
      }
    });
    if (!character) {
      res.status(404).send();
      return;
    }
    res.status(200).send({
      characterId: character.id,
    } as Responses.CharacterIdResp);
  }

  @Post('v1/read-user-id')
  async readUserId(
    @Res() res: FastifyReply,
    @Body() data: { characterName: string }
  ) {
    const character = await this.appService.characters.findFirst({
      where: {
        characterName: data.characterName
      }
    });
    if (!character) {
      res.status(404).send();
      return;
    }
    res.status(200).send({
      userId: character.userId,
    } as Responses.UserIdResp);
  }

  // Building
  @Post('v1/create-building')
  async createBuilding(
    @Res() res: FastifyReply,
    @Body() data: prisma.buildings
  ) {
    await this.appService.buildings.create({
      data: data
    })
    res.status(200).send();
  }

  @Post('v1/read-buildings')
  async readBuildings(
    @Res() res: FastifyReply,
    @Body() data: { mapName: string }
  ) {
    const buildings = await this.appService.buildings.findMany({
      where: {
        mapName: data.mapName
      }
    });
    await res.status(200).send({
      buildings: buildings
    } as Responses.BuildingsResp);
  }

  @Post('v1/update-building')
  async updateBuilding(
    @Res() res: FastifyReply,
    @Body() data: prisma.buildings
  ) {
    await this.appService.buildings.delete({
      where: {
        id: data.id
      }
    });
    await this.appService.buildings.create({
      data: data
    })
    res.status(200).send();
  }

  @Post('v1/delete-building')
  async deleteBuilding(
    @Res() res: FastifyReply,
    @Body() data: { buildingId: string }
  ) {
    await this.appService.buildings.delete({
      where: {
        id: data.buildingId
      }
    });
    res.status(200).send();
  }

  // Party
  @Post('v1/create-party')
  async createParty(
    @Res() res: FastifyReply,
    @Body() data: { shareExp: boolean, shareItem: boolean, leaderId: string }
  ) {
    const party = await this.appService.party.create({
      data: data
    });
    const character = await this.appService.characters.update({
      where: {
        id: data.leaderId
      },
      data: {
        partyId: party.id
      }
    });
    if (!character) {
      res.status(404).send();
      return;
    }
    res.status(200).send();
  }

  @Post('v1/read-party')
  async readParty(
    @Res() res: FastifyReply,
    @Body() data: { partyId: number }
  ) {
    const party = await this.appService.party.findUnique({
      where: {
        id: data.partyId
      }
    })
    if (!party) {
      res.status(400).send();
      return;
    }
    res.status(200).send({
      party: party
    } as Responses.PartyResp);
  }

  @Post('v1/update-party-leader')
  async updatePartyLeader(
    @Res() res: FastifyReply,
    @Body() data: { partyId: number, leaderId: string }
  ) {
    const character = await this.appService.characters.findUnique({
      where: {
        id: data.leaderId
      }
    })
    if (!character) {
      res.status(404).send();
      return;
    }
    const party = await this.appService.party.update({
      where: {
        id: data.partyId
      },
      data: {
        leaderId: data.leaderId
      }
    });
    if (!party) {
      res.status(500).send();
      return;
    }
    res.status(200).send();
  }

  @Post('v1/update-party')
  async updateParty(
    @Res() res: FastifyReply,
    @Body() data: { partyId: number, shareExp: boolean, shareItem: boolean }
  ) {
    const party = await this.appService.party.update({
      where: {
        id: data.partyId
      },
      data: {
        shareExp: data.shareExp,
        shareItem: data.shareItem
      }
    });
    if (!party) {
      res.status(404).send();
      return;
    }
    res.status(200).send();
  }

  @Post('v1/delete-party')
  async deleteParty(
    @Res() res: FastifyReply,
    @Body() data: { partyId: number }
  ) {
    await this.appService.party.delete({
      where: {
        id: data.partyId
      }
    });
    await this.appService.characters.updateMany({
      where: {
        partyId: data.partyId
      },
      data: {
        partyId: 0
      }
    })
    res.status(200).send();
  }

  @Post('v1/update-character-party')
  async updateCharacterParty(
    @Res() res: FastifyReply,
    @Body() data: { characterId: string, partyId: number }
  ) {
    const party = await this.appService.party.findUnique({
      where: {
        id: data.partyId
      }
    });
    if (!party) {
      res.status(500).send();
      return;
    }
    const character = await this.appService.characters.update({
      where: {
        id: data.characterId
      },
      data: {
        partyId: data.partyId
      }
    });
    if (!character) {
      res.status(404).send();
      return;
    }
    res.status(200).send();
  }

  // Guild
  @Post('v1/check-guild-name-availability')
  async validateGuildNameAvailability(
    @Res() res: FastifyReply,
    @Body() data: { guildName: string }
  ) {
    const count = await this.appService.guild.count({
      where: {
        guildName: data.guildName
      }
    });
    if (count > 0) {
      res.status(400).send();
      return;
    }
    res.status(200).send();
  }

  @Post('v1/create-guild')
  async createGuild(
    @Res() res: FastifyReply,
    @Body() data: { guildName: string, leaderId: string, options: string }
  ) {
    const guild = await this.appService.guild.create({
      data: data
    });
    const character = await this.appService.characters.update({
      where: {
        id: data.leaderId
      },
      data: {
        guildId: guild.id
      }
    });
    if (!character) {
      res.status(404).send();
      return;
    }
    res.status(200).send();
  }

  @Post('v1/read-guild')
  async readGuild(
    @Res() res: FastifyReply,
    @Body() data: { guildId: number }
  ) {
    const guild = await this.appService.guild.findUnique({
      where: {
        id: data.guildId
      }
    })
    if (!guild) {
      res.status(400).send();
      return;
    }
    res.status(200).send({
      guild: guild
    } as Responses.GuildResp);
  }

  @Post('v1/update-guild-level')
  async updateGuildLevel(
    @Res() res: FastifyReply,
    @Body() data: { guildId: number, level: number, exp: number, skillPoint: number }
  ) {
    const guild = await this.appService.guild.update({
      where: {
        id: data.guildId
      },
      data: {
        level: data.level,
        exp: data.exp,
        skillPoint: data.skillPoint
      }
    });
    if (!guild) {
      res.status(400).send();
      return;
    }
    res.status(200).send();
  }

  @Post('v1/update-guild-leader')
  async updateGuildLeader(
    @Res() res: FastifyReply,
    @Body() data: { guildId: number, leaderId: string }
  ) {
    const character = await this.appService.characters.findUnique({
      where: {
        id: data.leaderId
      }
    })
    if (!character) {
      res.status(404).send();
      return;
    }
    const guild = await this.appService.guild.update({
      where: {
        id: data.guildId
      },
      data: {
        leaderId: data.leaderId
      }
    });
    if (!guild) {
      res.status(500).send();
      return;
    }
    res.status(200).send();
  }

  @Post('v1/update-guild-message')
  async updateGuildMessage(
    @Res() res: FastifyReply,
    @Body() data: { guildId: number, guildMessage: string }
  ) {
    const guild = await this.appService.guild.update({
      where: {
        id: data.guildId
      },
      data: {
        guildMessage: data.guildMessage
      }
    });
    if (!guild) {
      res.status(400).send();
      return;
    }
    res.status(200).send();
  }

  @Post('v1/update-guild-message2')
  async updateGuildMessage2(
    @Res() res: FastifyReply,
    @Body() data: { guildId: number, guildMessage2: string }
  ) {
    const guild = await this.appService.guild.update({
      where: {
        id: data.guildId
      },
      data: {
        guildMessage2: data.guildMessage2
      }
    });
    if (!guild) {
      res.status(400).send();
      return;
    }
    res.status(200).send();
  }

  @Post('v1/update-guild-score')
  async updateGuildScore(
    @Res() res: FastifyReply,
    @Body() data: { guildId: number, score: number }
  ) {
    const guild = await this.appService.guild.update({
      where: {
        id: data.guildId
      },
      data: {
        score: data.score
      }
    });
    if (!guild) {
      res.status(400).send();
      return;
    }
    res.status(200).send();
  }

  @Post('v1/update-guild-options')
  async updateGuildOptions(
    @Res() res: FastifyReply,
    @Body() data: { guildId: number, options: string }
  ) {
    const guild = await this.appService.guild.update({
      where: {
        id: data.guildId
      },
      data: {
        options: data.options
      }
    });
    if (!guild) {
      res.status(400).send();
      return;
    }
    res.status(200).send();
  }

  @Post('v1/update-guild-auto-accept-requests')
  async updateGuildAutoAcceptRequests(
    @Res() res: FastifyReply,
    @Body() data: { guildId: number, autoAcceptRequests: boolean }
  ) {
    const guild = await this.appService.guild.update({
      where: {
        id: data.guildId
      },
      data: {
        autoAcceptRequests: data.autoAcceptRequests
      }
    });
    if (!guild) {
      res.status(400).send();
      return;
    }
    res.status(200).send();
  }

  @Post('v1/update-guild-rank')
  async updateGuildRank(
    @Res() res: FastifyReply,
    @Body() data: { guildId: number, rank: number }
  ) {
    const guild = await this.appService.guild.update({
      where: {
        id: data.guildId
      },
      data: {
        rank: data.rank
      }
    });
    if (!guild) {
      res.status(400).send();
      return;
    }
    res.status(200).send();
  }

  @Post('v1/update-guild-role')
  async updateGuildRole(
    @Res() res: FastifyReply,
    @Body() data: prisma.guildrole
  ) {
    await this.appService.guildrole.deleteMany({
      where: {
        guildId: data.guildId,
        guildRole: data.guildRole
      }
    });
    await this.appService.guildrole.create({
      data: data
    });
    res.status(200).send();
  }

  @Post('v1/update-guild-member-role')
  async updateGuildMemberRole(
    @Res() res: FastifyReply,
    @Body() data: { characterId: string, guildRole: number }
  ) {
    const character = await this.appService.characters.update({
      where: {
        id: data.characterId,
      },
      data: {
        guildRole: data.guildRole
      }
    });
    if (!character) {
      res.status(404).send();
      return;
    }
    res.status(200).send();
  }

  @Post('v1/update-guild-skill-level')
  async updateGuildSkillLevel(
    @Res() res: FastifyReply,
    @Body() data: prisma.guildskill
  ) {
    await this.appService.guildskill.deleteMany({
      where: {
        guildId: data.guildId,
        dataId: data.dataId
      }
    });
    await this.appService.guildskill.create({
      data: data
    });
    res.status(200).send();
  }

  @Post('v1/delete-guild')
  async deleteGuild(
    @Res() res: FastifyReply,
    @Body() data: { guildId: number }
  ) {
    await this.appService.guild.delete({
      where: {
        id: data.guildId
      }
    });
    await this.appService.guildrole.deleteMany({
      where: {
        guildId: data.guildId
      }
    });
    await this.appService.guildskill.deleteMany({
      where: {
        guildId: data.guildId
      }
    });
    await this.appService.characters.updateMany({
      where: {
        guildId: data.guildId
      },
      data: {
        guildId: 0,
        guildRole: 0,
        sharedGuildExp: 0,
      }
    })
    res.status(200).send();
  }

  @Post('v1/update-character-guild')
  async updateCharacterGuild(
    @Res() res: FastifyReply,
    @Body() data: { characterId: string, guildId: number, guildRole: number }
  ) {
    const guild = await this.appService.guild.findUnique({
      where: {
        id: data.guildId
      }
    });
    if (!guild) {
      res.status(500).send();
      return;
    }
    const character = await this.appService.characters.update({
      where: {
        id: data.characterId
      },
      data: {
        guildId: data.guildId,
        guildRole: data.guildRole
      }
    });
    if (!character) {
      res.status(404).send();
      return;
    }
    res.status(200).send();
  }

  @Get('v1/guilds/:guildId/gold')
  async getGuildGold(
    @Res() res: FastifyReply,
    @Param('guildId') guildId: number
  ) {
    const guild = await this.appService.guild.findUnique({
      where: {
        id: guildId
      },
      select: {
        gold: true,
      }
    });
    if (!guild) {
      res.status(404).send();
      return;
    }
    res.status(200).send({
      gold: guild.gold
    } as Responses.GoldResp);
  }

  @Post('v1/update-guild-gold')
  async updateGuildGold(
    @Res() res: FastifyReply,
    @Body() data: { guildId: number, gold: number }
  ) {
    const guild = await this.appService.guild.update({
      where: {
        id: data.guildId
      },
      data: {
        gold: data.gold
      }
    });
    if (!guild) {
      res.status(404).send();
      return;
    }
    res.status(200).send();
  }

  // Storage items
  @Post('v1/read-storage-items')
  async readStorageItems(
    @Res() res: FastifyReply,
    @Body() data: { storageType: number, storageOwnerId: string }
  ) {
    const storageItems = await this.appService.storageitem.findMany({
      where: {
        storageType: data.storageType,
        storageOwnerId: data.storageOwnerId
      }
    });
    res.status(200).send({
      storageItems: storageItems
    } as Responses.StorageItemsResp);
  }

  @Post('v1/update-storage-items')
  async updateStorageItems(
    @Res() res: FastifyReply,
    @Body() data: { storageType: number, storageOwnerId: string, storageItems: Array<prisma.storageitem> }
  ) {
    await this.appService.storageitem.deleteMany({
      where: {
        storageType: data.storageType,
        storageOwnerId: data.storageOwnerId
      }
    });
    this.appService.storageitem.createMany({
      data: data.storageItems
    })
    res.status(200).send();
  }

  // Mail
  @Post('v1/create-mail')
  async createMail(
    @Res() res: FastifyReply,
    @Body() data: prisma.mail
  ) {
    await this.appService.mail.create({
      data: data
    })
    res.status(200).send();
  }

  @Post('v1/read-mails')
  async readMails(
    @Res() res: FastifyReply,
    @Body() data: { userId: string, onlyNewMails: boolean }
  ) {
    const mails = await this.appService.mail.findMany({
      where: {
        receiverId: data.userId,
        isDelete: false,
      }
    });
    const filteredMails = new Array<prisma.mail>();
    mails.forEach(mail => {
      if (!mail.isClaim && (mail.gold > 0 || mail.currencies) || mail.items)
        filteredMails.push(mail);
      else if (!mail.isRead)
        filteredMails.push(mail);
    });
    res.status(200).send({
      mails: filteredMails
    } as Responses.MailsResp);
  }

  @Post('v1/read-mail')
  async readMail(
    @Res() res: FastifyReply,
    @Body() data: { mailId: number }
  ) {
    const mail = await this.appService.mail.findFirst({
      where: {
        id: data.mailId,
      }
    });
    if (!mail) {
      res.status(400).send();
      return;
    }
    res.status(200).send({
      mail: mail
    } as Responses.MailResp);
  }

  @Post('v1/update-read-mail-state')
  async updateReadMailState(
    @Res() res: FastifyReply,
    @Body() data: { mailId: number }
  ) {
    const mail = await this.appService.mail.update({
      where: {
        id: data.mailId,
      },
      data: {
        isRead: true,
        readTimestamp: new Date()
      }
    });
    if (!mail) {
      res.status(400).send();
      return;
    }
    res.status(200).send({
      mail: mail
    } as Responses.MailResp);
  }

  @Post('v1/update-claim-mail-items-state')
  async updateClaimMailItemsState(
    @Res() res: FastifyReply,
    @Body() data: { mailId: number }
  ) {
    const mail = await this.appService.mail.update({
      where: {
        id: data.mailId,
      },
      data: {
        isClaim: true,
        claimTimestamp: new Date()
      }
    });
    if (!mail) {
      res.status(400).send();
      return;
    }
    res.status(200).send({
      mail: mail
    } as Responses.MailResp);
  }

  @Post('v1/update-delete-mail-state')
  async updateDeleteMailState(
    @Res() res: FastifyReply,
    @Body() data: { mailId: number }
  ) {
    const mail = await this.appService.mail.update({
      where: {
        id: data.mailId,
      },
      data: {
        isDelete: true,
        deleteTimestamp: new Date()
      }
    });
    if (!mail) {
      res.status(400).send();
      return;
    }
    res.status(200).send({
      mail: mail
    } as Responses.MailResp);
  }

  @Get('v1/users/:userId/mail-notification-count')
  async getMailNotificationCount(
    @Res() res: FastifyReply,
    @Param('userId') userId: string
  ) {
    const mails = await this.appService.mail.findMany({
      where: {
        receiverId: userId,
        isDelete: false,
      }
    });
    let count = 0;
    mails.forEach(mail => {
      if (!mail.isClaim && (mail.gold > 0 || mail.currencies) || mail.items)
        count++;
      else if (!mail.isRead)
        count++;
    });
    res.status(200).send({
      count: count
    } as Responses.MailNotificationCountResp);
  }
}
