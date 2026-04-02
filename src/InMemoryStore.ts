import type { UserId, Chat } from "./store/Store.js";
import { Store } from "./store/Store.js";

export class InMemoryStore extends Store {
  private store: Map<string, Chat[]>;
  private chatIdCounter: number;

  constructor() {
    super();
    this.store = new Map<string, Chat[]>();
    this.chatIdCounter = 0;
  }

  initRoom(roomId: string): void {
    if (!this.store.has(roomId)) {
      this.store.set(roomId, []);
    }
  }

  getChats(roomId: string, limit: number, offset: number): Chat[] {
    const chats = this.store.get(roomId);
    if (!chats) {
      return [];
    }
    return chats.slice(offset, offset + limit);
  }

  addChat(userId: UserId, roomId: string, name: string, message: string): void {
    const chats = this.store.get(roomId);
    if (!chats) {
      throw new Error(`Room ${roomId} not initialized`);
    }
    const chat: Chat = {
      id: (++this.chatIdCounter).toString(),
      userId,
      name,
      message,
      upvotes: [],
    };
    chats.push(chat);
  }

  upvote(userId: UserId, roomId: string, chatId: string): void {
    const chats = this.store.get(roomId);
    if (!chats) {
      throw new Error(`Room ${roomId} not found`);
    }
    const chat = chats.find((c) => c.id === chatId);
    if (!chat) {
      throw new Error(`Chat ${chatId} not found in room ${roomId}`);
    }
    if (!chat.upvotes.includes(userId)) {
      chat.upvotes.push(userId);
    }
  }
}
