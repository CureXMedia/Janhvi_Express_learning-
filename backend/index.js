import "dotenv/config.js"
import { reply } from './demo.js'
import morgan  from "morgan"
import cors from 'cors'
import express, {json} from 'express'
// import {router} from "./host.js"
import {api} from './api.js';

const app = express();

const port = 3000;

app.use(json());

app.use(cors());

app.use(morgan("common"));

app.use('/api', api())

// app.get('/fs', async (req, res) => {
//   try {
//     let data = await fs.readFile('./README.md', 'utf8');
//     res.send(data);
//   } catch (e) {
    
//   }
// });


app.post('/reply', async (req, res) => {
  try {
    let { question } = req.body;
    if (question === undefined) {
      res.status(404).send({ 'text': 'No question asked' });
      return;
    }
    let data = await reply(question);
    
    res.send(data);
  } catch (e) {
    
    console.log(e);
    res.status(404).send({ 'text': 'No question asked', 'error': e });
  }
});


app.use('/', express.static('../frontend/dist'));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});


// app.use('/', router);

// Starting the Express server and listening for incoming connections on port 3000
app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});







