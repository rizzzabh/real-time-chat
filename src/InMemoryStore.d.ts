import type { UserId, Chat } from "./store/Store.js";
import { Store } from "./store/Store.js";
export declare class InMemoryStore extends Store {
    private store;
    private chatIdCounter;
    constructor();
    initRoom(roomId: string): void;
    getChats(roomId: string, limit: number, offset: number): Chat[];
    addChat(userId: UserId, roomId: string, name: string, message: string): void;
    upvote(userId: UserId, roomId: string, chatId: string): void;
}
//# sourceMappingURL=InMemoryStore.d.ts.map