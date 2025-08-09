// utils/generateShareToken.ts
import crypto from "crypto";

/**
 * Generate a cryptographically secure share token
 * @param lengthChars - target length of token (default 10)
 */
export function generateShareToken(lengthChars = 10): string {
  const bytesNeeded = Math.ceil((lengthChars * 6) / 8); // base64url encoding = 6 bits per char
  const buffer = crypto.randomBytes(bytesNeeded);
  return buffer.toString("base64url").replace(/=*$/, "").slice(0, lengthChars);
}
