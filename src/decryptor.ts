import { padding } from 'aes-js';
import * as filenameReservedRegex from 'filename-reserved-regex';
import * as fs from 'fs';
import * as util from 'util';
import { initializationVector, key } from './constants';
import getModeOfOperation from './getModeOfOperation';
import Modes from './modes.enum';

const writeFile = util.promisify(fs.writeFile);

class Decryptor {
  public file: Express.Multer.File;

  constructor(file: Express.Multer.File) {
    this.file = file;
  }

  public async decrypt(mode: Modes) {
    const bytes = new Uint8Array(this.file.buffer);
    const encodedBytes = getModeOfOperation(mode, key, initializationVector)!.decrypt(bytes);
    const stripped = padding.pkcs7.strip(encodedBytes);
    const name = this.file.filename;

    if (filenameReservedRegex().test(name)) {
      writeFile(`../output/${name}`, stripped)
        .then(() => {
          console.log('File created successfully');
        });
    }
  }
}

export default Decryptor;
