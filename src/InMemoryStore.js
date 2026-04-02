import { Store } from "./store/Store.js";
export class InMemoryStore extends Store {
    store;
    chatIdCounter;
    constructor() {
        super();
        this.store = new Map();
        this.chatIdCounter = 0;
    }
    initRoom(roomId) {
        if (!this.store.has(roomId)) {
            this.store.set(roomId, []);
        }
    }
    getChats(roomId, limit, offset) {
        const chats = this.store.get(roomId);
        if (!chats) {
            return [];
        }
        return chats.slice(offset, offset + limit);
    }
    addChat(userId, roomId, name, message) {
        const chats = this.store.get(roomId);
        if (!chats) {
            throw new Error(`Room ${roomId} not initialized`);
        }
        const chat = {
            id: (++this.chatIdCounter).toString(),
            userId,
            name,
            message,
            upvotes: [],
        };
        chats.push(chat);
    }
    upvote(userId, roomId, chatId) {
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
//# sourceMappingURL=InMemoryStore.js.map