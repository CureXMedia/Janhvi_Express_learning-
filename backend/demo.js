import {ConversationalRetrievalQAChain} from "langchain/chains";
import { ConversationSummaryMemory } from "langchain/memory";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { OpenAIEmbeddings } from "@langchain/openai";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { CharacterTextSplitter } from "langchain/text_splitter";
import { OpenAI} from "@langchain/openai";
// import { MongoClient } from "mongodb";
// import {OpenAI} from "openai";
// import { MongoDBAtlasVectorSearch } from "@langchain/community/vectorstores/mongodb_atlas";

const openAIApiKey = process.env.OPENAI_API_KEY;

// const client = new MongoClient(process.env.MONGO_DB || "");

// const collection = client.db("vectoreStore").collection("winterbot");


const memory = new ConversationSummaryMemory({
    memoryKey: "chat_history",
    llm: new OpenAI({ 
        modelName: "gpt-3.5-turbo", 
        temperature: 0,
         openAIApiKey, 
         dangerouslyAllowBrowser: true }),
  });



const model = new OpenAI({ temperature: 0.9, verbose: false, modelName: "gpt-3.5-turbo-1106", streaming : true,
openAIApiKey,});  

// const vectorstore = new MongoDBAtlasVectorSearch(
//     new OpenAIEmbeddings({openAIApiKey}),
//      {
//        collection,
//      }
//    );

const loader = new PDFLoader("C:\JanhviR.pdf");
const docs = await loader.load();
// console.log(docs);
const splitter = new CharacterTextSplitter({
    separator: "\n",
    chunkSize: 100,
    chunkOverlap: 25,
  });

  var page = await splitter.splitDocuments(docs)

  const vectorStore = await MemoryVectorStore.fromDocuments(
    page,
    new OpenAIEmbeddings({openAIApiKey})
  );


   const retriever  = vectorStore.asRetriever(
    {
        // searchType : "mmr",
        searchKwargs: {
            fetchK: 3,
            lambda : 0.5,
        }
    }
  );

  const qachain = ConversationalRetrievalQAChain.fromLLM(
    model,
    retriever,
    
)
async function reply (question){
    const result = await qachain.invoke({question  });
    return result;
}

async function replyStream (question,res){
  const result = await qachain.call({question, "chat_history": memory },
      [{
        handleLLMNewToken(chunks){
          res.write('event: message\n');
                res.write(`data: { "value": "${chunks}" }`);
                res.write('\n\n');
                res.flushHeaders();
        }
      }]);
  return result;
}
export {reply, replyStream};



