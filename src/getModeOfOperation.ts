import { ModeOfOperation } from 'aes-js';
import Modes from './modes.enum';

export default function getModeOfOperation(mode: Modes, key: number[], initializationVector?: number[]) {
  switch (mode) {
    case 'ctr':
      return new ModeOfOperation.ctr(key);
    case 'cbc':
      return new ModeOfOperation.cbc(key, initializationVector!);
    case 'cfb':
      return new ModeOfOperation.cfb(key, initializationVector!, 1);
    case 'ofb':
      return new ModeOfOperation.ofb(key, initializationVector!);
    case 'ecb':
      return new ModeOfOperation.ecb(key);
  }
}
