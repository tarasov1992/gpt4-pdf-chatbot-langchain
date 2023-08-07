import { LLMChain, OpenAI, PromptTemplate } from "langchain"
import { ChatOpenAI } from "langchain/chat_models/openai"
import { ChatPromptTemplate, HumanMessagePromptTemplate, SystemMessagePromptTemplate } from "langchain/prompts"

export const main = async () => {
    try {
        // constructing a chain from prompt template and llm
        const llm = new OpenAI({ temperature: 0 }) // 0 means no creativity when generating a completion
        const template = 'What is the capital of {country}?'
        const prompt = new PromptTemplate({ template, inputVariables: ['country'] })
        const normalChain = new LLMChain({ llm, prompt })
        const res = await normalChain.call({ country: 'Scotland' })
        console.log({ res })

        // constructing a chain using chat model that has a more structured form 
        const chatModel = new ChatOpenAI({ temperature: 0 })
        const chatPrompt = ChatPromptTemplate.fromPromptMessages([
            SystemMessagePromptTemplate.fromTemplate(
                'You are a helpful translator that translates from {input_language} to {output_language}.'
            ),
            HumanMessagePromptTemplate.fromTemplate('{text}')
        ])
        const chatChain = new LLMChain({ llm: chatModel, prompt: chatPrompt})
        const chatRes = await chatChain.call({
            'input_language': 'English',
            'output_language': 'Russian',
            'text': 'I love music.'
        })
        console.log({ chatRes })
    } catch (err) {
        console.log(err)
    }
}

(async () => {
    await main();
})()