import type { BaseChatModel } from "@langchain/core/language_models/chat_models";
import type { ApplicationGraphState } from "../graph-state/init-graph-state";

export type GraphStepFunction = (state: ApplicationGraphState) => Promise<Partial<ApplicationGraphState>>

export type GraphStepFunctionWithModel<Model extends BaseChatModel = BaseChatModel> = (llm: Model) => GraphStepFunction