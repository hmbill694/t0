import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { END, START, StateGraph } from "@langchain/langgraph";
import initGraphState from "./lib/graph-state/init-page-creator-graph";
import { htmlGenerator } from "./lib/steps/html-generator";
import { writeToFile } from "./lib/steps/file-writter";
import { htmlParserNode } from "./lib/steps/html-parser";
import { Elysia, redirect, t } from 'elysia'
import { staticPlugin } from '@elysiajs/static'
import { html, Html } from '@elysiajs/html'
import Index from "./lib/views/index"



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

const generationGraph = workflow.compile()

// console.log(await generationGraph.invoke({ userInput: "The application shell for an application named T0. The Appshell should have a nav that is sticky and be styled with flexbox. There should be a footer and the content area should fill the entirity of the remaining space. The page should be at least the 100vh. There should be form in the content area. The form should post to /api/v1/generate-document. The form has one textarea named chat." }))


const app = new Elysia()
  .use(staticPlugin())
  .use(html())
	.get('/', Index)
  .post('/api/v1/generate-document', async ({ body }) => {
    console.log("Generating your file with the below description", body.chat)
    await generationGraph.invoke({ userInput: body.chat })
    return redirect('/')
  }, {
    body: t.Object({
      chat: t.String()
    })
  })
	.listen(3000)

console.log(
	`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
)