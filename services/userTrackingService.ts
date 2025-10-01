import FingerprintJS from '@fingerprintjs/fingerprintjs';

// Function to get a unique browser fingerprint
export const getBrowserFingerprint = async (): Promise<string> => {
  const fp = await FingerprintJS.load();
  const result = await fp.get();
  return result.visitorId;
};

// Function to fetch the user's IP address
export const getUserIP = async (): Promise<string> => {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
  } catch (error) {
    console.error('Error fetching IP address:', error);
    return 'unknown';
  }
};

// Function to check if a note or photo is seen
export const isContentSeen = (contentId: string, userId: string): boolean => {
  const seenData = JSON.parse(localStorage.getItem('seenContent') || '{}');
  return seenData[userId]?.includes(contentId) || false;
};

// Function to mark a note or photo as seen
export const markContentAsSeen = (contentId: string, userId: string): void => {
  const seenData = JSON.parse(localStorage.getItem('seenContent') || '{}');
  if (!seenData[userId]) {
    seenData[userId] = [];
  }
  if (!seenData[userId].includes(contentId)) {
    seenData[userId].push(contentId);
  }
  localStorage.setItem('seenContent', JSON.stringify(seenData));
};

// Function to clear seen content for a specific user
export const clearSeenContent = (userId: string): void => {
  const seenData = JSON.parse(localStorage.getItem('seenContent') || '{}');
  if (seenData[userId]) {
    delete seenData[userId];
    localStorage.setItem('seenContent', JSON.stringify(seenData));
  }
};