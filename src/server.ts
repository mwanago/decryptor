import * as express from 'express';
import * as multer from 'multer';
import Decryptor from './decryptor';

const app = express();
const upload = multer();

app.post('/', upload.single('file'), (request, response) => {
  const file = request.file;
  const mode = request.body.mode;

  const decryptor = new Decryptor(file);

  decryptor.decrypt(mode);

  response.end();
});

app.listen(5000, () => {
  console.log('Server running');
});
