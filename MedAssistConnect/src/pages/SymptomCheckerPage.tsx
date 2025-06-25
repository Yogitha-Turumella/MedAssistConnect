import React, { useState } from 'react';
import { Search, AlertCircle, CheckCircle, Stethoscope, Brain } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Symptom {
  id: string;
  name: string;
}

interface PredictionResult {
  disease: string;
  confidence: number;
  description: string;
  recommendations: string[];
  suggestedDoctors: string[];
}

const availableSymptoms: Symptom[] = [
  { id: 'fever', name: 'Fever' },
  { id: 'headache', name: 'Headache' },
  { id: 'cough', name: 'Cough' },
  { id: 'sore_throat', name: 'Sore Throat' },
  { id: 'runny_nose', name: 'Runny Nose' },
  { id: 'body_ache', name: 'Body Ache' },
  { id: 'fatigue', name: 'Fatigue' },
  { id: 'nausea', name: 'Nausea' },
  { id: 'vomiting', name: 'Vomiting' },
  { id: 'diarrhea', name: 'Diarrhea' },
  { id: 'chest_pain', name: 'Chest Pain' },
  { id: 'shortness_breath', name: 'Shortness of Breath' },
  { id: 'dizziness', name: 'Dizziness' },
  { id: 'rash', name: 'Skin Rash' },
  { id: 'joint_pain', name: 'Joint Pain' },
];

// Mock AI prediction function
const predictDisease = (symptoms: string[]): PredictionResult => {
  const predictions: { [key: string]: PredictionResult } = {
    'fever,headache,cough,sore_throat': {
      disease: 'Common Cold/Flu',
      confidence: 85,
      description: 'Based on your symptoms, you likely have a common cold or flu. This is typically caused by viral infection.',
      recommendations: [
        'Get plenty of rest',
        'Stay hydrated with fluids',
        'Consider over-the-counter pain relievers',
        'Gargle with warm salt water for sore throat'
      ],
      suggestedDoctors: ['General Practitioner', 'Internal Medicine']
    },
    'chest_pain,shortness_breath': {
      disease: 'Possible Cardiac Issue',
      confidence: 75,
      description: 'Chest pain with shortness of breath could indicate a cardiac issue. Immediate medical attention is recommended.',
      recommendations: [
        'Seek immediate medical attention',
        'Do not ignore chest pain',
        'Call emergency services if severe',
        'Avoid physical exertion'
      ],
      suggestedDoctors: ['Cardiologist', 'Emergency Medicine']
    },
    'nausea,vomiting,diarrhea': {
      disease: 'Gastroenteritis',
      confidence: 80,
      description: 'Your symptoms suggest gastroenteritis, commonly known as stomach flu, likely caused by viral or bacterial infection.',
      recommendations: [
        'Stay hydrated with clear fluids',
        'Follow BRAT diet (Bananas, Rice, Applesauce, Toast)',
        'Rest and avoid solid foods temporarily',
        'Consider probiotics after symptoms improve'
      ],
      suggestedDoctors: ['General Practitioner', 'Gastroenterologist']
    }
  };

  const symptomKey = symptoms.sort().join(',');
  
  // Check for exact matches first
  if (predictions[symptomKey]) {
    return predictions[symptomKey];
  }
  
  // Check for partial matches
  for (const [key, prediction] of Object.entries(predictions)) {
    const keySymptoms = key.split(',');
    const matchCount = keySymptoms.filter(symptom => symptoms.includes(symptom)).length;
    
    if (matchCount >= 2) {
      return {
        ...prediction,
        confidence: Math.max(60, prediction.confidence - (keySymptoms.length - matchCount) * 10)
      };
    }
  }
  
  // Default prediction
  return {
    disease: 'General Health Concern',
    confidence: 65,
    description: 'Based on your symptoms, we recommend consulting with a healthcare professional for proper diagnosis.',
    recommendations: [
      'Monitor your symptoms closely',
      'Rest and stay hydrated',
      'Consult a doctor if symptoms persist',
      'Keep a symptom diary'
    ],
    suggestedDoctors: ['General Practitioner', 'Internal Medicine']
  };
};

export const SymptomCheckerPage: React.FC = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const filteredSymptoms = availableSymptoms.filter(symptom =>
    symptom.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleSymptom = (symptomId: string) => {
    setSelectedSymptoms(prev =>
      prev.includes(symptomId)
        ? prev.filter(id => id !== symptomId)
        : [...prev, symptomId]
    );
  };

  const handleAnalyze = async () => {
    if (selectedSymptoms.length === 0) return;
    
    setIsLoading(true);
    // Simulate API call delay
    setTimeout(() => {
      const result = predictDisease(selectedSymptoms);
      setPrediction(result);
      setIsLoading(false);
    }, 2000);
  };

  const resetForm = () => {
    setSelectedSymptoms([]);
    setPrediction(null);
    setSearchTerm('');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Brain className="h-16 w-16 text-sky-500" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">AI Symptom Checker</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our AI-powered system analyzes your symptoms to provide preliminary health insights. 
            Always consult with a healthcare professional for proper diagnosis.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          {!prediction ? (
            <>
              {/* Search Bar */}
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search symptoms..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                />
              </div>

              {/* Selected Symptoms */}
              {selectedSymptoms.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Selected Symptoms:</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedSymptoms.map(symptomId => {
                      const symptom = availableSymptoms.find(s => s.id === symptomId);
                      return (
                        <span
                          key={symptomId}
                          className="bg-sky-100 text-sky-800 px-3 py-1 rounded-full text-sm font-medium flex items-center"
                        >
                          {symptom?.name}
                          <button
                            onClick={() => toggleSymptom(symptomId)}
                            className="ml-2 text-sky-600 hover:text-sky-800"
                          >
                            ×
                          </button>
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Symptoms Grid */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Your Symptoms:</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {filteredSymptoms.map(symptom => (
                    <button
                      key={symptom.id}
                      onClick={() => toggleSymptom(symptom.id)}
                      className={`p-3 rounded-lg border-2 text-sm font-medium transition-all duration-200 ${
                        selectedSymptoms.includes(symptom.id)
                          ? 'border-sky-500 bg-sky-50 text-sky-700'
                          : 'border-gray-200 bg-white text-gray-700 hover:border-sky-300 hover:bg-sky-25'
                      }`}
                    >
                      {symptom.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Analyze Button */}
              <div className="text-center">
                <button
                  onClick={handleAnalyze}
                  disabled={selectedSymptoms.length === 0 || isLoading}
                  className="bg-sky-500 hover:bg-sky-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg"
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                      Analyzing...
                    </div>
                  ) : (
                    'Analyze Symptoms'
                  )}
                </button>
              </div>
            </>
          ) : (
            /* Results */
            <div>
              <div className="text-center mb-8">
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Analysis Complete</h2>
              </div>

              <div className="bg-gradient-to-br from-sky-50 to-emerald-50 rounded-lg p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">{prediction.disease}</h3>
                  <div className="flex items-center">
                    <div className="text-sm text-gray-600">Confidence:</div>
                    <div className="ml-2 font-bold text-sky-600">{prediction.confidence}%</div>
                  </div>
                </div>
                <p className="text-gray-700">{prediction.description}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-amber-50 rounded-lg p-6">
                  <h4 className="font-bold text-gray-900 mb-3 flex items-center">
                    <AlertCircle className="h-5 w-5 text-amber-500 mr-2" />
                    Recommendations
                  </h4>
                  <ul className="space-y-2">
                    {prediction.recommendations.map((rec, index) => (
                      <li key={index} className="text-gray-700 flex items-start">
                        <span className="text-amber-500 mr-2">•</span>
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-green-50 rounded-lg p-6">
                  <h4 className="font-bold text-gray-900 mb-3 flex items-center">
                    <Stethoscope className="h-5 w-5 text-green-500 mr-2" />
                    Suggested Specialists
                  </h4>
                  <ul className="space-y-2">
                    {prediction.suggestedDoctors.map((doctor, index) => (
                      <li key={index} className="text-gray-700 flex items-start">
                        <span className="text-green-500 mr-2">•</span>
                        {doctor}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/doctors"
                  className="bg-sky-500 hover:bg-sky-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 text-center"
                >
                  Find a Doctor
                </Link>
                <Link
                  to="/appointments"
                  className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 text-center"
                >
                  Book Appointment
                </Link>
                <button
                  onClick={resetForm}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
                >
                  Check Again
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Disclaimer */}
        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start">
            <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 mr-3 flex-shrink-0" />
            <div className="text-sm text-yellow-800">
              <strong>Important Disclaimer:</strong> This symptom checker is for informational purposes only and should not replace professional medical advice. Always consult with a qualified healthcare provider for proper diagnosis and treatment.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};