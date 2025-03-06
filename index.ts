import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { BaseMessage } from "@langchain/core/messages";
import { Annotation, END, START, StateGraph } from "@langchain/langgraph";
import { MemorySaver } from "@langchain/langgraph";
import { HumanMessage } from "@langchain/core/messages";
import type { Tool } from "@langchain/core/tools";
import { writeFile } from "./lib/tools/file-manipulation";
import initGraphState from "./lib/graph-state/init-graph-state";
import { responder } from "./lib/steps/story-teller";



// Define the tools for the agent to use
const agentTools: Tool[] = [writeFile];

const agentModel = new ChatGoogleGenerativeAI({
  model: "gemini-2.0-flash",
  temperature: 0,
  maxRetries: 2,
  apiKey: process.env.GOOGLE_API_KEY
});

// Initialize memory to persist state between graph runs
const agentCheckpointer = new MemorySaver();

const workflow = new StateGraph(initGraphState())
    .addNode("query-node", responder(agentModel))
    // .addNode("write-to-file-tool", writeFile)
    .addEdge(START, "query-node")
    .addEdge("query-node", END)
    // .addEdge("query-node", "write-to-file-tool")
    // .addEdge("write-to-file-tool", END)

const app = workflow.compile()

console.log(await app.invoke({ messages: [], topic: "Large cats" }))