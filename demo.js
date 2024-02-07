import {ConversationalRetrievalQAChain} from "langchain/chains";
import { ConversationSummaryMemory } from "langchain/memory";
import { MongoDBAtlasVectorSearch } from "@langchain/community/vectorstores/mongodb_atlas";
import { OpenAIEmbeddings } from "@langchain/openai";
import { MongoClient } from "mongodb";
// import {OpenAI} from "openai";
import { OpenAI} from "@langchain/openai";

const openAIApiKey = process.env.OPENAI_API_KEY;

const client = new MongoClient(process.env.MONGO_DB || "");

const collection = client.db("vectoreStore").collection("winterbot");


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

const vectorstore = new MongoDBAtlasVectorSearch(
    new OpenAIEmbeddings({openAIApiKey}),
     {
       collection,
     }
   );

   const retriever  = vectorstore.asRetriever(
    {
        searchType : "mmr",
        searchKwargs: {
            fetchK: 3,
            lambda : 0.5,
        }
    }
  );

  const qachain = ConversationalRetrievalQAChain.fromLLM(
    model,
    retriever,
    {
        memory
    },
)
async function reply (question){
    const result = await qachain.invoke({question  });
    return result;
}

export {reply};