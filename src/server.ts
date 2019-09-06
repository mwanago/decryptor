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

interface Files {
  file: Express.Multer.File[];
  encryptedData: Express.Multer.File[];
}

app.post('/', upload.fields([
  { name: 'file', maxCount: 1 },
  { name: 'encryptedData', maxCount: 1 },
]),      async (request, response) => {
  const files: Files = (request.files as any);
  const {
    file: fileArray,
    encryptedData: encryptedDataArray,
  } = files;
  const file = fileArray[0];
  const encryptedData = encryptedDataArray[0];

  console.log({ encryptedData });

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
