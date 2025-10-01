import { SECRET_PASSWORD_HASH, JOURNAL_ENTRIES } from '../constants';
import type { JournalEntry } from '../types';

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
 * Verifies a password and returns the journal entries.
 * @param password The password entered by the user.
 * @returns A promise that resolves with the journal entries if the password is correct.
 * @throws An error if the password is incorrect.
 */
export const getLetter = async (password: string): Promise<JournalEntry[]> => {
  // Trim whitespace from the input and then hash it.
  const inputHash = await sha256(password.trim());

  // Securely compare the input hash with the stored hash
  if (inputHash === SECRET_PASSWORD_HASH) {
    return JOURNAL_ENTRIES;
  } else {
    throw new Error(`Authentication failed`);
  }
};