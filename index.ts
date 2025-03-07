import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { END, START, StateGraph } from "@langchain/langgraph";
import { MemorySaver } from "@langchain/langgraph";
import initGraphState from "./lib/graph-state/init-page-creator-graph";
import { responder } from "./lib/steps/story-teller";
import { writeToFile } from "./lib/steps/file-writter";




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
    .addNode("write-to-file-tool", writeToFile)
    .addEdge(START, "query-node")
    .addEdge("query-node", "write-to-file-tool")
    .addEdge("write-to-file-tool", END)

const app = workflow.compile()

console.log(await app.invoke({ messages: [], topic: "cats" }))