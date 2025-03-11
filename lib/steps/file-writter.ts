import { ChatMessage } from "@langchain/core/messages";
import type { GraphStepFunction } from "../types";
import type { PageCreatorGraph } from "../graph-state/init-page-creator-graph";

const randomWords = [
    "maple",
    "father",
    "gnarly",
    "yuge",
    "ringo",
    "purple",
    "large",
    "bigtime",
    "icey",
    "ingo",
    "aquatic",
    "hole",
    "wood",
    "elm",
    "berch",
    "oak",
    "spruce",
    "marble",
    "granite",
    "basalt",
    "areas",
    "oopsy",
    "magma",
    "lava",
    "freedom",
    "velvet"
]

export const generateFileName = () => {
    const min = Math.ceil(0);
    const max = Math.floor(randomWords.length - 1);

    const words = Array.from({ length: 3 }, () => randomWords[Math.floor(Math.random() * (max - min + 1) + min)] ?? "fiddle")
    return words.join("-")
}

export const writeToFile: GraphStepFunction<PageCreatorGraph> = async (state) => {

    if(!state.htmlIsValid) {
        throw new Error("There is no HTML to write to a file.")
    }

    const html = state.messages.at(-1)?.content.toString() ?? "No content to write to file."

    const fileName = `${generateFileName()}.html`

    const path = `public/out/${fileName}`;

    await Bun.write(path, html)

    return { outputFileName:  fileName}
}