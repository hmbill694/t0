import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { Elysia, redirect, t } from 'elysia'
import { staticPlugin } from '@elysiajs/static'
import { html, Html } from '@elysiajs/html'
import Index from "./lib/views/index"
import GeneratedDocuments from "./lib/views/generated-documents";
import PageGeneratorAgentGraph from "./lib/agent-graphs/generator-graph";
import { getGeneratedDoc, getGeneratedPages, saveDocument } from "./lib/services/generated-documents";
import GeneratedDocument from "./lib/views/generated-document";



const agentModel = new ChatGoogleGenerativeAI({
  model: "gemini-2.0-flash",
  temperature: 0,
  maxRetries: 2,
  apiKey: process.env.GOOGLE_API_KEY
});

const htmlGeneratorGraph = PageGeneratorAgentGraph(agentModel)

const app = new Elysia()
  .use(staticPlugin())
  .use(html())
	.get('/', Index)
  .get('/generated-docs', async () => {
    const files = await getGeneratedPages()
    return GeneratedDocuments({ files })
  })
  .get('/generated-doc/:projectId/:docId', async ({ params }) => {
    const doc = await getGeneratedDoc(params)

    return GeneratedDocument({ html: doc.content })
  }, { params: t.Object({ projectId: t.Number(), docId: t.Number() }) })
  .post('/api/v1/generate-document', async ({ body }) => {
    console.log("Generating your file with the below description", body.chat)
    const state = await htmlGeneratorGraph.invoke({ userInput: body.chat })

    const doc = await saveDocument({ content: state.outputHtml, name: state.outputFileName, projectId: 1 })

    return redirect(`/generated-doc/${1}/${doc.id}`)
  }, {
    body: t.Object({
      chat: t.String()
    })
  })
	.listen(3000)

console.log(
	`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
)
