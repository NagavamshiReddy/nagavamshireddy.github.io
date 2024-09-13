import dotenv from "dotenv";
dotenv.config();
import express, { Express, Request, Response } from "express";
import bodyParser from 'body-parser';
// import routes from './routes/routes';
import path from "path";
import cors from "cors";
// import swaggerUi from "swagger-ui-express";
// import swaggerOutput from './helper_modules/api-docs/swagger_output.json';
const app: Express = express();
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 3000;
// app.use(routes);
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOutput));
app.listen(port, () => {
 console.log(`Example app listening on port ${port}`)
});
app.use(express.static(path.join(__dirname, '../../build')));
app.get('/health_check', function(req: Request, res: Response)
{
 return res.send({"message":"healthcheck"});
});
