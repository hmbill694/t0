import { tool } from "@langchain/core/tools";
import { z } from "zod";


export const writeFile = tool(async (input, config) => {
    const path = "../../out/test.txt";
    // await Bun.write(path, input);

    return "Written to file"
}, {
    name: "write-file-to-output-dir",
    description: "The agent will use this to write to a file.",
    schema: z.string()
})