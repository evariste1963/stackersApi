import CryptoJS from 'crypto-js';
import { config } from 'dotenv';

config();

function getEncryptionKey() {
  const key = process.env.ENCRYPTION_KEY;
  if (!key) {
    throw new Error('ENCRYPTION_KEY not set in environment');
  }
  return key;
}

export function encrypt(text) {
  if (!text) return null;
  return CryptoJS.AES.encrypt(text, getEncryptionKey()).toString();
}

export function decrypt(encryptedText) {
  if (!encryptedText) return null;
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedText, getEncryptionKey());
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.error('Decryption error:', error.message);
    return null;
  }
}

export function isEncrypted(text) {
  if (!text) return false;
  try {
    const bytes = CryptoJS.AES.decrypt(text, getEncryptionKey());
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    return decrypted.length > 0;
  } catch {
    return false;
  }
}