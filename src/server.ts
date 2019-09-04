import * as express from 'express';
import * as multer from 'multer';

const app = express();
const upload = multer();

app.post('/', upload.single('file'), (request, response) => {
  const file = request.file;
  const mode = request.body.mode;

  console.log(mode, Boolean(file));
  response.end();
});

app.listen(5000, () => {
  console.log('Server running');
});
