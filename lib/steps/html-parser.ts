import { ChatMessage } from "@langchain/core/messages";
import type { GraphStepFunction } from "../types";
import { Result } from "../utils/result";
import type { PageCreatorGraph } from "../agent-graphs/generator-graph";

export const htmlParserNode: GraphStepFunction<PageCreatorGraph> = async (state) => {
    const html = state.outputHtml

    if (!html) {
        throw new Error("Html parser node called when there is no messages to parse")
    }

    const htmlRewriter = new HTMLRewriter()

    const parsed = Result.fromFallible(() => htmlRewriter.transform(html.toString()))


    if (parsed.isError()) {
        throw new Error(parsed.getError())
    }

    return { htmlIsValid: true }
}