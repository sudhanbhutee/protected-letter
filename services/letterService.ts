import { SECRET_PASSWORD_HASH, LETTER_CONTENT } from '../constants';

/**
 * Converts an ArrayBuffer to a hexadecimal string.
 * @param buffer The ArrayBuffer to convert.
 * @returns The hexadecimal string representation.
 */
const bufferToHex = (buffer: ArrayBuffer): string => {
  return Array.from(new Uint8Array(buffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
};

/**
 * Hashes a string using the SHA-256 algorithm.
 * @param text The string to hash.
 * @returns A promise that resolves with the hexadecimal hash string.
 */
const sha256 = async (text: string): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  return bufferToHex(hashBuffer);
};

/**
 * Verifies a password by hashing it and comparing it to a stored hash.
 * This is a secure, frontend-only method.
 * @param password The password entered by the user.
 * @returns A promise that resolves with the letter content if the password is correct.
 * @throws An error if the password is incorrect.
 */
export const getLetter = async (password: string): Promise<string> => {
  // Trim whitespace from the input and then hash it.
  const inputHash = await sha256(password.trim());

  // Securely compare the input hash with the stored hash
  if (inputHash === SECRET_PASSWORD_HASH) {
    // If they match, return the letter content. The async function handles the promise.
    return LETTER_CONTENT;
  } else {
    // If they don't match, throw a detailed error that includes the generated hash.
    // This makes debugging much easier by showing the exact output of the hash function in the UI.
    throw new Error(`Authentication failed`);
  }
};