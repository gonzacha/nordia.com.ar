import { Message } from "@/app/types/demo";

/**
 * Message Queue for simulating natural conversation flow
 * Handles typing indicators and delays between messages
 */

type QueuedMessage = {
    message: Message;
    delay: number;
    showTyping?: boolean;
};

type QueueCallbacks = {
    onTypingStart: () => void;
    onTypingEnd: () => void;
    onMessageAdd: (message: Message) => void;
};

export class MessageQueue {
    private queue: QueuedMessage[] = [];
    private isProcessing = false;
    private callbacks: QueueCallbacks;

    constructor(callbacks: QueueCallbacks) {
        this.callbacks = callbacks;
    }

    /**
     * Add message to queue
     * @param message - Message to add
     * @param delay - Delay before showing message (simulates typing time)
     * @param showTyping - Whether to show typing indicator
     */
    add(message: Message, delay: number, showTyping = true) {
        this.queue.push({ message, delay, showTyping });

        if (!this.isProcessing) {
            this.process();
        }
    }

    /**
     * Add multiple messages at once
     */
    addBatch(messages: Array<{ message: Message; delay: number; showTyping?: boolean }>) {
        messages.forEach(({ message, delay, showTyping }) => {
            this.queue.push({ message, delay, showTyping });
        });

        if (!this.isProcessing) {
            this.process();
        }
    }

    /**
     * Clear the queue
     */
    clear() {
        this.queue = [];
        this.isProcessing = false;
        this.callbacks.onTypingEnd();
    }

    /**
     * Process queue sequentially
     */
    private async process() {
        this.isProcessing = true;

        while (this.queue.length > 0) {
            const item = this.queue.shift()!;

            // Show typing indicator if needed
            if (item.showTyping && item.message.role === "bot") {
                this.callbacks.onTypingStart();
                await this.sleep(item.delay);
                this.callbacks.onTypingEnd();
            } else {
                await this.sleep(item.delay);
            }

            // Add message
            this.callbacks.onMessageAdd(item.message);

            // Small delay between messages for readability
            await this.sleep(300);
        }

        this.isProcessing = false;
    }

    private sleep(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * Check if queue is currently processing
     */
    get processing(): boolean {
        return this.isProcessing;
    }

    /**
     * Get number of messages in queue
     */
    get length(): number {
        return this.queue.length;
    }
}
