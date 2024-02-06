import "dotenv/config.js"
import { reply } from './demo.js'
import express, {json} from 'express'
const app = express()     //created an express application
const port = 3000         //port number 

app.use(json());
//these are pathsor routs  .... it can be multiple 
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/fs', async (req, res) => {
   try{
    let data = await fs.readFile('./README.md', 'utf8') 
    res.send(data)
   }
   catch(e){
    
   }
  })

  app.get('/reply', async (req, res) => {
    try{
        let question = req.query.question
        if(question===undefined){
            throw Error('No question asked')
        }
        let data = await reply(question)
        res.send(data)
    }
    catch(e){
     res.status(404).send(e)
    }
   })
  


app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})


