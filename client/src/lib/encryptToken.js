import CryptoJS from 'crypto-js';

// Function to encrypt the token
export const encryptToken = (token) => {
  const secretKey = 'vikaskumaryadav'; // Use a strong secret key
  const encryptedToken = CryptoJS.AES.encrypt(token, secretKey).toString(); // Encrypt the token
  return encryptedToken;
};