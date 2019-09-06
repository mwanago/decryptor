import * as cors from 'cors';
import 'dotenv/config';
import * as express from 'express';
import * as fs from 'fs';
import * as multer from 'multer';
import * as path from 'path';
import Decryptor from './decryptor';
import generateRSA from './generateRSA';

const generatingPromise = generateRSA();

const app = express();
const upload = multer();

app.use(cors());

app.get('', async (request, response) => {
  await generatingPromise;
  const readStream = fs.createReadStream(path.resolve(__dirname, '../publicKeys/public.pem'));
  readStream.pipe(response);
});

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
