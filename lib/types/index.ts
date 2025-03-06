import type { BaseChatModel } from "@langchain/core/language_models/chat_models";
import type { ApplicationGraphState } from "../graph-state/init-graph-state";

export type GraphStepFunction<Model extends BaseChatModel = BaseChatModel> = (llm: Model) => (state: ApplicationGraphState) => Promise<Partial<ApplicationGraphState>>