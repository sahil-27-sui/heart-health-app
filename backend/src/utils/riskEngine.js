export const analyzeRisk = (input) => {
  let score = 0;
  const factors = [];
  const recommendations = new Set();

  if (input.systolic > 130 || input.diastolic > 80) {
    score += 2;
    factors.push('Elevated blood pressure');
    recommendations.add('Monitor blood pressure regularly and reduce sodium intake.');
  }

  if (input.cholesterol > 200) {
    score += 2;
    factors.push('High cholesterol');
    recommendations.add('Adopt a heart-healthy diet with less saturated fat.');
  }

  if (input.bmi > 25) {
    score += 1;
    factors.push('BMI above healthy range');
    recommendations.add('Work toward a balanced calorie plan and routine exercise.');
  }

  if (input.smoking) {
    score += 2;
    factors.push('Smoking');
    recommendations.add('Stop smoking to significantly lower cardiovascular risk.');
  }

  if (input.activityLevel === 'Low') {
    score += 2;
    factors.push('Low activity level');
    recommendations.add('Increase activity to at least 150 minutes of exercise per week.');
  }

  if (input.diabetes) {
    score += 2;
    factors.push('Diabetes');
    recommendations.add('Keep blood glucose under control with regular follow-up.');
  }

  if (input.familyHistory) {
    score += 1;
    factors.push('Family history of heart disease');
    recommendations.add('Schedule preventive screenings due to family history.');
  }

  // Simple AI-like rule based extras
  if (input.stressLevel === 'High') {
    score += 1;
    factors.push('High stress level');
    recommendations.add('Use stress-management techniques like breathing and sleep hygiene.');
  }

  if (input.dietQuality === 'Poor') {
    score += 1;
    factors.push('Poor diet quality');
    recommendations.add('Add more fruits, vegetables, and whole grains daily.');
  }

  if (input.alcoholConsumption === 'High') {
    score += 1;
    factors.push('High alcohol consumption');
    recommendations.add('Limit alcohol intake according to clinical guidelines.');
  }

  let riskLevel = 'Low Risk';
  if (score >= 4 && score <= 7) riskLevel = 'Medium Risk';
  if (score >= 8) riskLevel = 'High Risk';

  const explanation =
    riskLevel === 'Low Risk'
      ? 'Your current inputs suggest relatively lower short-term cardiovascular risk.'
      : riskLevel === 'Medium Risk'
      ? 'Your inputs show multiple concerns that could increase cardiovascular risk over time.'
      : 'Your inputs indicate several significant risk markers that should be medically reviewed soon.';

  if (factors.length === 0) {
    recommendations.add('Maintain your current healthy lifestyle and periodic checkups.');
  }

  return {
    riskLevel,
    score,
    riskFactors: factors,
    recommendations: Array.from(recommendations),
    explanation,
  };
};
