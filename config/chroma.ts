if (!process.env.CHROMA_COLLECTION_NAME) {
  throw new Error('Missing Pinecone index name in .env file');
}

const CHROMA_COLLECTION_NAME = process.env.CHROMA_COLLECTION_NAME

export { CHROMA_COLLECTION_NAME };
