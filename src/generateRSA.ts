import { generateKeyPair } from 'crypto';
import * as fs from 'fs';
import * as path from 'path';
import * as util from 'util';
import getPasswordHash from './getPasswordHash';

const writeFile = util.promisify(fs.writeFile);

export default function generateRSA() {
  return new Promise((resolve, reject) => {
    generateKeyPair(
      'rsa',
      {
        modulusLength: 4096,
        publicKeyEncoding: {
          type: 'spki',
          format: 'pem',
        },
        privateKeyEncoding: {
          type: 'pkcs8',
          format: 'pem',
          cipher: 'aes-256-cbc',
          passphrase: getPasswordHash(),
        },
      },
      async (err, publicKey, privateKey) => {
        if (err) {
          return reject(err);
        }
        await Promise.all([
          writeFile(path.resolve(__dirname, '../publicKeys/public.pem'), publicKey),
          writeFile(path.resolve(__dirname, '../privateKeys/private.pem'), privateKey),
        ]);
        resolve();
      },
    );
  });

}
