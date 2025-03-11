import type { BaseMessage } from "@langchain/core/messages";
import { Annotation } from "@langchain/langgraph";

export default function initGraphState() {
  return Annotation.Root({
    // Define a 'messages' channel to store an array of BaseMessage objects
    messages: Annotation<BaseMessage[]>({
      // Reducer function: Combines the current state with new messages
      reducer: (currentState, updateValue) => currentState.concat(updateValue),
      // Default function: Initialize the channel with an empty array
      default: () => [],
    }),
    userInput: Annotation<String>,
    htmlIsValid: Annotation<Boolean>,
    outputFileName: Annotation<String>
  });
}

export type PageCreatorGraph = { messages: BaseMessage[], htmlIsValid: Boolean, userInput: String, outputFileName: String }
