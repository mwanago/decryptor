import * as cryptoRandomString from 'crypto-random-string';
import * as fs from 'fs';
import * as path from 'path';
import * as util from 'util';

const writeFile = util.promisify(fs.writeFile);

export default function generateRandomFile(size: number) {
  const randomString = cryptoRandomString({ length: size });
  const filename = `${cryptoRandomString({ length: 5, characters: 'abcdefghijklmn' })}.txt`;

  return writeFile(path.resolve(__dirname, `../output/${filename}`), randomString)
    .then(() => {
      console.log('File created successfully');
    });
}
