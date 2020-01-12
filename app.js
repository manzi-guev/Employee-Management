import express from 'express';
import routes from './routes/route';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

const app = express();
dotenv.config();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(routes);
app.get('/', (req, res) => {
  res.status(200).json({
    status: 200,
    message: 'Welcome to Challenge 3'
  });
});
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
export default app;
