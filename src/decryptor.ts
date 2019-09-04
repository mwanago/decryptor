import { padding } from 'aes-js';
import { initializationVector, key } from './constants';
import getModeOfOperation from './getModeOfOperation';
import Modes from './modes.enum';
import * as fs from 'fs';
import * as util from 'util'

const writeFile = util.promisify(fs.writeFile);

class Decryptor {
  public file: Express.Multer.File;

  constructor(file: Express.Multer.File) {
    this.file = file;
  }

  public async decrypt(mode: Modes) {
    const buffer = await (this.file as any)
      .arrayBuffer();

    const bytes = new Uint8Array(buffer);
    const encodedBytes = getModeOfOperation(mode, key, initializationVector)!.decrypt(bytes);
    const stripped = padding.pkcs7.strip(encodedBytes);

    writeFile('./newFile.txt', stripped)
      .then(() => {
        console.log('File created successfully');
      })
  }
}

export default Decryptor;
