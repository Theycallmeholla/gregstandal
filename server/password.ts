import { randomBytes, scryptSync, timingSafeEqual } from "crypto";

type PasswordHash = {
  alg: "scrypt";
  saltB64: string;
  hashB64: string;
};

function encode(hash: PasswordHash) {
  return `${hash.alg}:${hash.saltB64}:${hash.hashB64}`;
}

function decode(stored: string): PasswordHash | null {
  const [alg, saltB64, hashB64] = stored.split(":");
  if (alg !== "scrypt" || !saltB64 || !hashB64) return null;
  return { alg: "scrypt", saltB64, hashB64 };
}

export function hashPassword(password: string) {
  const salt = randomBytes(16);
  const derived = scryptSync(password, salt, 64);
  return encode({ alg: "scrypt", saltB64: salt.toString("base64"), hashB64: Buffer.from(derived).toString("base64") });
}

export function verifyPassword(password: string, stored: string) {
  const decoded = decode(stored);
  if (!decoded) return false;
  const salt = Buffer.from(decoded.saltB64, "base64");
  const hash = Buffer.from(decoded.hashB64, "base64");
  const derived = scryptSync(password, salt, hash.length);
  return timingSafeEqual(hash, Buffer.from(derived));
}

