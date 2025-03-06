import { ChatMessage } from "@langchain/core/messages";
import type { GraphStepFunction } from "../types";

export const writeToFile: GraphStepFunction = async (state) => {
    const lastMessage = state.messages.at(-1)?.content.toString() ?? "No content to write to file."

    const path = `out/story-out-${new Date().toISOString()}`;

    await Bun.write(path, lastMessage)

    return { messages: [ new ChatMessage("File written to.", "file-writter")] }
}