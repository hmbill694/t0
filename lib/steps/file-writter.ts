import { ChatMessage } from "@langchain/core/messages";
import type { GraphStepFunction } from "../types";
import type { PageCreatorGraph } from "../graph-state/init-page-creator-graph";

export const writeToFile: GraphStepFunction<PageCreatorGraph> = async (state) => {

    if(!state.htmlIsValid) {
        throw new Error("")
    }

    const lastMessage = state.messages.at(-1)?.content.toString() ?? "No content to write to file."

    const path = `out/page-${new Date().toISOString()}.html`;

    await Bun.write(path, lastMessage)

    return { messages: [ new ChatMessage("File written to.", "file-writter")] }
}