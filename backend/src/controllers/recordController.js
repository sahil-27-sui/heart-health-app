import { HealthRecord } from '../models/HealthRecord.js';
import { analyzeRisk } from '../utils/riskEngine.js';

const requiredFields = ['age','gender','heartRate','systolic','diastolic','cholesterol','smoking','activityLevel','bmi','diabetes','familyHistory'];

export const createRecord = async (req, res) => {
  for (const field of requiredFields) {
    if (req.body[field] === undefined || req.body[field] === null || req.body[field] === '') {
      return res.status(400).json({ message: `Missing field: ${field}` });
    }
  }

  const analysis = analyzeRisk(req.body);
  const record = await HealthRecord.create({
    userId: req.session.userId,
    ...req.body,
    ...analysis,
  });

  res.status(201).json(record);
};

export const listRecords = async (req, res) => {
  const records = await HealthRecord.find({ userId: req.session.userId }).sort({ createdAt: -1 });
  res.json(records);
};
