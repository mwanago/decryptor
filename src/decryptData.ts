import { privateDecrypt } from 'crypto';
import * as fs from 'fs';
import * as path from 'path';
import * as util from 'util';
import getPasswordHash from './getPasswordHash';
import Modes from './modes.enum';

const readFile = util.promisify(fs.readFile);

interface DecryptedData {
  mode: Modes;
  key: number[];
  initializationVector: number[];
  filename: string;
}

export default async function decryptData(encryptedData: Express.Multer.File) {
  const privateKey = await readFile(path.resolve(__dirname, '../privateKeys/private.pem'));

  const decrypted = privateDecrypt(
    {
      key: privateKey.toString(),
      passphrase: getPasswordHash(),
    },
    encryptedData.buffer,
  );
  const result = decrypted.toString('utf8');
  return JSON.parse(result) as DecryptedData;
}
