import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { END, START, StateGraph } from "@langchain/langgraph";
import initGraphState from "./lib/graph-state/init-page-creator-graph";
import { htmlGenerator } from "./lib/steps/html-generator";
import { writeToFile } from "./lib/steps/file-writter";
import { htmlParserNode } from "./lib/steps/html-parser";

const agentModel = new ChatGoogleGenerativeAI({
  model: "gemini-2.0-flash",
  temperature: 0,
  maxRetries: 2,
  apiKey: process.env.GOOGLE_API_KEY
});

const workflow = new StateGraph(initGraphState())
    .addNode("query-node", htmlGenerator(agentModel))
    .addNode("html-validator", htmlParserNode)
    .addNode("file-writter", writeToFile)
    .addEdge(START, "query-node")
    .addEdge("query-node", "html-validator")
    .addEdge("html-validator", "file-writter")
    .addEdge("file-writter", END)

const app = workflow.compile()

console.log(await app.invoke({ userInput: "The application shell for an application named Searchly. The Appshell should have a nav that is sticky." }))