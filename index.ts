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
import { getFileNames } from "./lib/services/generated-documents";
import GeneratedDocuments from "./lib/views/generated-documents";



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

const app = new Elysia()
  .use(staticPlugin())
  .use(html())
	.get('/', Index)
  .get('/generated-docs', async () => {
    const files = await getFileNames("./public/out")
    return GeneratedDocuments({ files })
  })
  .post('/api/v1/generate-document', async ({ body }) => {
    console.log("Generating your file with the below description", body.chat)
    const fileName = await generationGraph.invoke({ userInput: body.chat }).then(ele => ele.outputFileName)
    return redirect(`/public/out/${fileName}`)
  }, {
    body: t.Object({
      chat: t.String()
    })
  })
	.listen(3000)

console.log(
	`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
)