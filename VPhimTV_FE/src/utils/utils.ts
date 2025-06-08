import CryptoJS from 'crypto-js';
import dayjs from 'dayjs';

export function isValidUrl(str: string): boolean {
  try {
    new URL(str);
    return true;
  } catch (_) {
    return false;
  }
}

export function capitalize(text: string): string {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function UniqueId() {
  const timestamp = Date.now().toString(16);
  const randomPart = Math.random().toString(16).slice(2, 16);
  return (timestamp + randomPart).slice(0, 24);
}

export const encryptObj = (dataObj: any) =>
  CryptoJS.AES.encrypt(JSON.stringify(dataObj), import.meta.env.VITE_APP_NAME).toString();

export const decryptObj = (encryptedObj: string) => {
  const bytes = CryptoJS.AES.decrypt(encryptedObj, import.meta.env.VITE_APP_NAME);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};

export function timeAgo(updatedAt: Date | string) {
  return dayjs(updatedAt).fromNow();
}
