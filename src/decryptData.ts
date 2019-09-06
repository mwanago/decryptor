import { privateDecrypt } from 'crypto';
import * as fs from 'fs';
import * as path from 'path';
import * as util from 'util';

const readFile = util.promisify(fs.readFile);

export default async function decryptData(encryptedData: Express.Multer.File) {
  const privateKey = await readFile(path.resolve(__dirname, '../privateKeys/private.pem'));

  const decrypted = privateDecrypt(
    {
      key: privateKey.toString(),
      passphrase: process.env.PASSWORD,
    },
    encryptedData.buffer,
  );
  const result = decrypted.toString('utf8');
  return JSON.parse(result);
}