import CryptoJS from 'crypto-js';

// Function to decrypt the token
export const decryptToken = (encryptedToken) => {
  const secretKey = 'vikaskumaryadav';
  const bytes = CryptoJS.AES.decrypt(encryptedToken, secretKey); // Decrypt the token
  const decryptedToken = bytes.toString(CryptoJS.enc.Utf8); // Convert bytes to string
  return decryptedToken;
};
