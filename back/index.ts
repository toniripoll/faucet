import express from "express";
import cors from 'cors'
import routes from './routes'

// importar las variables de entorno
require('dotenv').config()

const app = express();

app.use(cors())
app.use(express.json())

app.use('/api', routes)


app.listen(3333, () => {
  console.log("Server is running on port 3333");
});


