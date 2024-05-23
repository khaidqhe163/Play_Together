import express from 'express';
import { config } from 'dotenv';
import mongoose from 'mongoose';
import routes from './routes/index.js';
import bodyParser from 'body-parser';
import cors from 'cors';
import http from 'http'
import './config/passport.js'
config();



const app = express();
app.use('/public', express.static('public'));
const PORT = process.env.PORT || 3007;

const server = http.Server(app);
async function main() {
  try {
    await mongoose.connect(process.env.MONGO_DB_URL);
    console.log("Connect to MongoDB success");
    const corsOrigin = {
      origin: 'http://localhost:3000', //or whatever port your frontend is using
      credentials: true,
      optionSuccessStatus: 200
    }
    app.use(cors(corsOrigin));


    app.use(bodyParser.json());
    routes(app);


    server.listen(PORT, () => {
      console.log('Dinter running on port ' + PORT);
    })
  } catch (err) {
    console.log(err);
  }
}

main();