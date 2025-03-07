import type { PageCreatorGraph } from "../graph-state/init-page-creator-graph";
import type { GraphStepFunctionWithModel } from "../types";
import { ChatMessage } from "@langchain/core/messages";

export const responder: GraphStepFunctionWithModel<PageCreatorGraph> = (llm) => async (state) => {
    const msg = await llm.invoke(`Tell me a story about ${state.topic}`)

    return { messages: [new ChatMessage(msg.content.toString(), "")] }
}