import * as prisma from '@prisma/client';

export interface UserLevelResp {
    userLevel: number
}

export interface GoldResp {
    gold: number
}

export interface CashResp {
    cash: number
}

export interface CharacterIdResp {
    characterId: string
}

export interface UserIdResp {
    userId: string
}

export interface UnbanTimeResp {
    unbanTime: bigint
}

export interface UnmuteTimeResp {
    unmuteTime: bigint
}

export interface PartyResp {
    party: prisma.party
}

export interface GuildResp {
    guild: prisma.guild
}

export interface MailResp {
    mail: prisma.mail
}

export interface MailNotificationCountResp {
    count: number
}

export interface CharactersResp {
    characters: Array<prisma.characters>
}

export interface BuildingsResp {
    buildings: Array<prisma.buildings>
}

export interface StorageItemsResp {
    storageItems: Array<prisma.storageitem>
}

export interface MailsResp {
    mails: Array<prisma.mail>
}