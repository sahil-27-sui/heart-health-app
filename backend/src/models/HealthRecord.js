import mongoose from 'mongoose';

const healthRecordSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    heartRate: { type: Number, required: true },
    systolic: { type: Number, required: true },
    diastolic: { type: Number, required: true },
    cholesterol: { type: Number, required: true },
    smoking: { type: Boolean, required: true },
    activityLevel: { type: String, enum: ['Low', 'Moderate', 'High'], required: true },
    bmi: { type: Number, required: true },
    diabetes: { type: Boolean, required: true },
    familyHistory: { type: Boolean, required: true },
    stressLevel: { type: String, enum: ['Low', 'Moderate', 'High'], default: 'Moderate' },
    dietQuality: { type: String, enum: ['Poor', 'Average', 'Good'], default: 'Average' },
    alcoholConsumption: { type: String, enum: ['None', 'Low', 'Moderate', 'High'], default: 'Low' },
    riskLevel: { type: String, enum: ['Low Risk', 'Medium Risk', 'High Risk'], required: true },
    score: { type: Number, required: true },
    riskFactors: [{ type: String }],
    recommendations: [{ type: String }],
    explanation: { type: String, required: true },
  },
  { timestamps: true }
);

export const HealthRecord = mongoose.model('HealthRecord', healthRecordSchema);
