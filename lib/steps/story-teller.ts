import type { GraphStepFunction } from "../types";
import { ChatMessage } from "@langchain/core/messages";

export const responder: GraphStepFunction = (llm) => async (state) => {
    const msg = await llm.invoke(`Tell me a story about ${state.topic}`)

    msg.content.toString()

    return { messages: [new ChatMessage(msg.content.toString(), "responder")] }
}