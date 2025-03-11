import { ChatMessage } from "@langchain/core/messages";
import type { GraphStepFunction } from "../types";
import type { PageCreatorGraph } from "../graph-state/init-page-creator-graph";
import { Result } from "../utils/result";

export const htmlParserNode: GraphStepFunction<PageCreatorGraph> = async (state) => {
    const html = state.messages.at(-1)?.content.toString()

    if (!html) {
        throw new Error("Html parser node called when there is no messages to parse")
    }

    const htmlRewriter = new HTMLRewriter()

    const parsed = Result.fromFallible(() => htmlRewriter.transform(html))


    if (parsed.isError()) {
        throw new Error(parsed.getError())
    }

    return { htmlIsValid: true }
}