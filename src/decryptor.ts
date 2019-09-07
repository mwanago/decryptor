import { padding } from 'aes-js';
import * as filenameReservedRegex from 'filename-reserved-regex';
import * as fs from 'fs';
import * as path from 'path';
import * as util from 'util';
import generateRandomFile from './generateRandomFile';
import getModeOfOperation from './getModeOfOperation';
import Modes from './modes.enum';

const writeFile = util.promisify(fs.writeFile);

class Decryptor {
  public file: Express.Multer.File;

  constructor(file: Express.Multer.File) {
    this.file = file;
  }

  public async decrypt(mode: Modes, filename: string, key: number[], initializationVector: number[]) {
    const bytes = new Uint8Array(this.file.buffer);
    const encodedBytes = getModeOfOperation(mode, key, initializationVector)!.decrypt(bytes);
    const stripped = padding.pkcs7.strip(encodedBytes);

    if (!filenameReservedRegex().test(filename)) {
      return writeFile(path.resolve(__dirname, `../output/${filename}`), stripped)
        .then(() => {
          console.log('File created successfully');
        });
    }
    return Promise.reject(400);
  }
}

export default Decryptor;
