import { readFileSync } from "fs"
import { OpenAI } from "langchain"
import { ConversationalRetrievalQAChain } from "langchain/chains"
import { OpenAIEmbeddings } from "langchain/embeddings/openai"
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter"
import { HNSWLib } from "langchain/vectorstores/hnswlib"

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

        const chain = ConversationalRetrievalQAChain.fromLLM(
            llm,
            (await vectorStore).asRetriever()
        )

        const question = 'How much money the biggest companies in America made in 2020?'
        const res = await chain.call({ question, chat_history: [] })
        console.log(res)
        const chatHistory = question + res.text
        const followUpRes = await chain.call({
            question: 'What was the previous response you gave?',
            chat_history: chatHistory
        })
        console.log(followUpRes)
    } catch (err) {
        console.log(err)
    }
}

(async () => {
    await main()
})()