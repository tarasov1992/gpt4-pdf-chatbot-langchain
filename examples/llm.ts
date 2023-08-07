import { OpenAI } from "langchain";

export const run = async () => {
    const llm = new OpenAI({
        temperature: 0.9,
        maxTokens: 1000,
        modelName: 'gpt-3.5-turbo'
    })
    const res = await llm.call('What is AI hallucination?')
    console.log({ res })
}

(async () => {
    await run()
})()