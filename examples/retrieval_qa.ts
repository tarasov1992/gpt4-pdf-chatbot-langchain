import { readFileSync } from "fs" 
import { OpenAI } from "langchain"
import { RetrievalQAChain } from "langchain/chains";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter"
import { HNSWLib } from "langchain/vectorstores/hnswlib";


export const main = async () => {
    try {
        const llm = new OpenAI({})
        const text = readFileSync('state_of_the_union.txt', 'utf-8')
        const textSplitter = new RecursiveCharacterTextSplitter({
            chunkSize: 1000,
            chunkOverlap: 200
        })
        const docs = await textSplitter.createDocuments([text])
        const vectorStore = await HNSWLib.fromDocuments(docs, new OpenAIEmbeddings())

        const chain = RetrievalQAChain.fromLLM(llm, vectorStore.asRetriever()) 
        const res = await chain.call({
            input_documents: docs,
            query: 'Did the biggest companies in America pay federal taxes?'
        })

        console.log({ res })
    } catch (err) {
        console.log(err)
    }
}

(async () => {
  await main()  
})()