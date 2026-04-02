export type UserId = string;

export interface Chat {
  id: string;
  userId: UserId;
  name: string;
  message: string;
  upvotes: UserId[];
}

export abstract class Store {
  constructor() {}

  abstract initRoom(roomId: string): void;

  abstract getChats(roomId: string, limit: number, offset: number): Chat[];
  abstract addChat(
    userId: UserId,
    roomId: string,
    name: string,
    message: string,
  ): void;

  abstract upvote(userId: UserId, roomId: string, chatId: string): void;
}
