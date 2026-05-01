import bcrypt from 'bcryptjs';
import { User } from '../models/User.js';

export const signup = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password || password.length < 6) {
    return res.status(400).json({ message: 'Valid email and password (>=6 chars) are required.' });
  }

  const existing = await User.findOne({ email });
  if (existing) {
    return res.status(409).json({ message: 'Email already registered.' });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({ email, passwordHash });
  req.session.userId = user._id;

  return res.status(201).json({ id: user._id, email: user.email });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.status(401).json({ message: 'Invalid credentials.' });

  const match = await bcrypt.compare(password, user.passwordHash);
  if (!match) return res.status(401).json({ message: 'Invalid credentials.' });

  req.session.userId = user._id;
  return res.json({ id: user._id, email: user.email });
};

export const me = async (req, res) => {
  if (!req.session.userId) return res.status(401).json({ message: 'Unauthorized' });
  const user = await User.findById(req.session.userId).select('email profile');
  if (!user) return res.status(401).json({ message: 'Unauthorized' });
  return res.json(user);
};

export const logout = (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('connect.sid');
    res.json({ message: 'Logged out.' });
  });
};
