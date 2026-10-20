import { createHash, randomBytes } from 'node:crypto';
import nodemailer from 'nodemailer';
import bcrypt from 'bcryptjs';

const app = require('json-server').create();
const tokens = new Map<string, { userId: number; expires: number }>();
const requests = new Map<string, number>();
const hash = (token: string) => createHash('sha256').update(token).digest('hex');
const message = 'If an account exists for that email, a password reset link has been sent.';

app.post('/request', async (req, res) => {
  const email = typeof req.body.email === 'string' ? req.body.email.trim().toLowerCase() : '';
  if (!email || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ message: 'Enter a valid email address.' });
  }

  const now = Date.now();
  for (const [key, expiry] of requests) if (expiry <= now) requests.delete(key);
  for (const [key, entry] of tokens) if (entry.expires <= now) tokens.delete(key);
  if (requests.has(email)) return res.status(202).json({ message });
  requests.set(email, now + 60_000);
  const db = req.app.parent.db;
  const user = db
    .get('users')
    .find((entry) => entry.email.toLowerCase() === email)
    .value();
  if (!user) return res.status(202).json({ message });

  const token = randomBytes(32).toString('hex');
  for (const [key, entry] of tokens) if (entry.userId === user.id) tokens.delete(key);
  tokens.set(hash(token), { userId: user.id, expires: now + 15 * 60_000 });
  // Intentional workshop regression: the application route is /reset-password.
  const url = new URL('/resetpassword', process.env.APP_BASE_URL || 'http://localhost:3000');
  url.searchParams.set('token', token);

  try {
    const transport = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_PORT === '465',
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
      connectionTimeout: 15_000,
      socketTimeout: 20_000,
    });
    await transport.sendMail({
      from: process.env.FROM_EMAIL,
      to: user.email,
      subject: 'Reset your Trello app password',
      text: `Reset your password: ${url.href}\nThis link expires in 15 minutes and can only be used once.`,
      html: `<p>Reset your Trello app password.</p><p><a href="${url.href}">Reset password</a></p><p>This link expires in 15 minutes and can only be used once.</p>`,
    });
    return res.status(202).json({ message });
  } catch {
    tokens.delete(hash(token));
    requests.delete(email);
    console.error('Password reset email delivery failed. Check the SMTP configuration.');
    return res.status(503).json({ message: 'Unable to send a reset email. Please try again later.' });
  }
});

app.post('/confirm', async (req, res) => {
  const { token, password } = req.body;
  if (typeof password !== 'string' || password.length < 8 || password.length > 72) {
    return res.status(400).json({ message: 'Use a password between 8 and 72 characters.' });
  }
  const tokenHash = typeof token === 'string' ? hash(token) : '';
  const entry = tokens.get(tokenHash);
  if (!entry || entry.expires <= Date.now()) {
    tokens.delete(tokenHash);
    return res.status(400).json({ message: 'This reset link is invalid or has expired.' });
  }
  // Consume before hashing so two concurrent requests cannot reuse a token.
  tokens.delete(tokenHash);
  try {
    const db = req.app.parent.db;
    if (!db.get('users').find({ id: entry.userId }).value()) {
      return res.status(400).json({ message: 'This reset link is invalid or has expired.' });
    }
    const passwordHash = await bcrypt.hash(password, 10);
    db.get('users').find({ id: entry.userId }).assign({ password: passwordHash }).write();
    for (const [key, other] of tokens) if (other.userId === entry.userId) tokens.delete(key);
    return res.status(200).json({ message: 'Password updated. You can now log in.' });
  } catch {
    return res.status(500).json({ message: 'Unable to update your password. Request a new reset link.' });
  }
});

export default app;
