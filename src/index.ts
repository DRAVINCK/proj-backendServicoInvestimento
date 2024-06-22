//index.ts
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors"

import icecreamRoutes from './routes/icecreamRoutes'
import servicoinvestRoutes from './routes/servicoinvestRoutes'

import swaggerUi from 'swagger-ui-express';
import { connect } from "./services/database"

dotenv.config();

const app: Express = express();

const port = process.env.PORT
const databaseUrl = process.env.DATABASE_URL || ""

connect(databaseUrl)

	
// aceitar requisições desse endereço
const corsOptions = { 
  origin : ['http://localhost:3000'], 
} 
 
app.use(cors(corsOptions)) 
app.use(express.json());
app.use(express.static("public"));
app.use(
  "/swagger", /* endereço do swagger */
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: "/swagger.json",
    },
  })
);

app.use('/api/icecream', icecreamRoutes)
app.use('/api/servicoinvest', servicoinvestRoutes)

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});