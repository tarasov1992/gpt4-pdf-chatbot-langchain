import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { Chroma } from "langchain/vectorstores/chroma"
import { CustomPDFLoader } from '@/utils/customPDFLoader';
import { DirectoryLoader } from 'langchain/document_loaders/fs/directory';

// name of the directory that contains all the files
const dirName = 'docs';

export const run = async () => {
  try {
    //load raw docs from all files in the directory
    const directoryLoader = new DirectoryLoader(dirName, {
      '.pdf': (path) => new CustomPDFLoader(path),
    });

    const rawDocs = await directoryLoader.load();

    // Split text into chunks
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });
    const docs = await textSplitter.splitDocuments(rawDocs);

    //create and store  embeddings
    await Chroma.fromDocuments(docs, new OpenAIEmbeddings(), {
      collectionName: "aave"
    })

  } catch (error) {
    console.log('error', error);
    throw new Error('Failed to ingest your data');
  }
};

(async () => {
  await run();
  console.log('ingestion complete');
})();
