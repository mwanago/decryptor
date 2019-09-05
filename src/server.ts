import * as cors from 'cors';
import * as express from 'express';
import * as multer from 'multer';
import Decryptor from './decryptor';

const app = express();
const upload = multer();

app.use(cors());

app.post('/', upload.single('file'), async (request, response) => {
  const file = request.file;
  const mode = request.body.mode;

  const decryptor = new Decryptor(file);

  try {
    await decryptor.decrypt(mode);
    response.end();
  } catch (error) {
    if (error === 400) {
      response.status(400).end();
    } else {
      response.status(500).end();
    }
  }
});

app.listen(5000, () => {
  console.log('Server running');
});
