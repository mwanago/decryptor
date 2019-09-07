import { createHmac } from 'crypto';

export default function getPasswordHash() {
  return createHmac('sha256', process.env.SHA_SECRET)
    .update(process.env.PASSWORD)
    .digest('hex');
}
