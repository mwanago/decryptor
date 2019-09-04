import * as express from 'express';

const app = express();

app.post('/', (request, response) => {
  response.send('Hello world!');
});

app.listen(5000, () => {
  console.log('Server running');
});
