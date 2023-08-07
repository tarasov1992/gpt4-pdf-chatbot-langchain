import { Chroma } from "langchain/vectorstores/chroma"
import { OpenAIEmbeddings } from "langchain/embeddings/openai"

export const run = async () => {
    try {
        const vectorStore = await Chroma.fromExistingCollection(
            new OpenAIEmbeddings,
            { collectionName: 'aave' }
        )
        const res = await vectorStore.similaritySearch("ecosystem", 2)
        console.log(res)
    } catch (err) {
        console.log(`error: ${err}`)
    }
}

(async () => {
    await run();
})();