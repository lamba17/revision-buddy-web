import type { RevisionContent, MCQQuestion, WeakTopic, HistoryItem } from '../types'

export const EXAM_DATA = {
  'JEE Mains': {
    color: '#378ADD',
    bgColor: '#EBF4FF',
    studentCount: '13L+ students',
    subjects: {
      Physics: ['Kinematics', 'Laws of Motion', 'Work Energy Power', 'Rotational Motion', 'Thermodynamics', 'Waves', 'Electrostatics', 'Current Electricity', 'Optics', 'Modern Physics'],
      Chemistry: ['Mole Concept', 'Atomic Structure', 'Chemical Bonding', 'Thermodynamics', 'Equilibrium', 'Electrochemistry', 'Chemical Kinetics', 'Coordination Compounds', 'Organic Chemistry', 'Polymers'],
      Maths: ['Limits', 'Differentiation', 'Integration', 'Differential Equations', 'Matrices', 'Probability', 'Vectors', 'Conic Sections', 'Complex Numbers', 'Permutations'],
    },
  },
  'JEE Advanced': {
    color: '#7F77DD',
    bgColor: '#F0EFFF',
    studentCount: '1.5L+ students',
    subjects: {
      Physics: ['Kinematics', 'Laws of Motion', 'Rotational Motion', 'Thermodynamics', 'Electrostatics', 'Electromagnetic Induction', 'Optics', 'Modern Physics', 'Waves', 'Nuclear Physics'],
      Chemistry: ['Mole Concept', 'Chemical Bonding', 'Thermodynamics', 'Equilibrium', 'Electrochemistry', 'Coordination Compounds', 'Aldehydes & Ketones', 'Carboxylic Acids', 'Amines', 'Biomolecules'],
      Maths: ['Integration', 'Differential Equations', 'Matrices', 'Probability', 'Vectors', '3D Geometry', 'Complex Numbers', 'Conic Sections', 'Limits', 'Functions'],
    },
  },
  NEET: {
    color: '#1D9E75',
    bgColor: '#E8F7F2',
    studentCount: '20L+ students',
    subjects: {
      Physics: ['Kinematics', 'Laws of Motion', 'Thermodynamics', 'Waves', 'Electrostatics', 'Current Electricity', 'Optics', 'Modern Physics', 'Gravitation', 'Oscillations'],
      Chemistry: ['Mole Concept', 'Atomic Structure', 'Chemical Bonding', 'Equilibrium', 'Electrochemistry', 'Biomolecules', 'Polymers', 'Organic Chemistry', 'Thermodynamics', 'Surface Chemistry'],
      Biology: ['Cell Biology', 'Cell Division', 'Genetics and Heredity', 'Molecular Basis of Inheritance', 'Evolution', 'Human Physiology: Digestion', 'Respiration', 'Neural Control', 'Photosynthesis', 'Ecology'],
    },
  },
} as const

export const SUBJECT_COLORS: Record<string, string> = {
  Physics: '#378ADD',
  Chemistry: '#1D9E75',
  Maths: '#7F77DD',
  Biology: '#E85D24',
}

export const MOCK_REVISION: RevisionContent = {
  chapterName: 'Laws of Thermodynamics',
  subject: 'Physics',
  examType: 'JEE Mains',
  mode: 'quick',
  keyConcepts: [
    'First Law: ΔU = Q − W (energy conservation for any thermodynamic process)',
    'Isothermal process: temperature constant, ΔU = 0 for ideal gas, so Q = W',
    'Adiabatic process: Q = 0, no heat exchange, ΔU = −W',
    'Cyclic process: system returns to initial state, ΔU = 0, so Q = W',
    'Carnot efficiency = 1 − T₂/T₁, maximum possible efficiency between two temperatures',
  ],
  formulas: [
    { formula: 'ΔU = Q − W', meaning: 'ΔU = internal energy change, Q = heat added to system, W = work done BY system' },
    { formula: 'W = PΔV', meaning: 'Work done at constant pressure; P = pressure, ΔV = change in volume' },
    { formula: 'η = 1 − T₂/T₁', meaning: 'Carnot engine efficiency; T₁ = hot reservoir, T₂ = cold reservoir (use Kelvin)' },
    { formula: 'ΔS = Q/T', meaning: 'Entropy change for reversible process; S = entropy, T = absolute temperature' },
    { formula: 'Cp − Cv = R', meaning: 'For one mole of ideal gas; R = 8.314 J/mol·K' },
  ],
  examTips: [
    'JEE always tests: identify process type from a PV graph (vertical = isochoric, horizontal = isobaric, hyperbola = isothermal), then apply the right formula.',
    'For cyclic process questions: ΔU = 0 is the key. Net heat absorbed = net work done = enclosed area on PV diagram.',
    'Sign trap: W is work done BY the system (positive during expansion). Some textbooks use W ON system — always check the convention given.',
  ],
  memoryTricks: [
    'TIPS for spontaneity: Temperature↑ favours TΔS, ΔH negative favours spontaneity, Pressure, ΔS positive favours spontaneity.',
    '"Adiabatic" = no heat through the wall. Diabatic = through, A = not. So A-diabatic = no heat.',
  ],
  commonMistakes: [
    'Using Celsius instead of Kelvin in η = 1 − T₂/T₁. Always convert to Kelvin first.',
    'Forgetting ΔU = 0 for isothermal process and writing ΔU = Q instead of Q = W.',
    'Sign error on W: confusing expansion (positive W by gas) with compression (negative W by gas).',
  ],
}

export const MOCK_MCQS: MCQQuestion[] = [
  {
    id: 'q1',
    question: 'In an isothermal process for an ideal gas, which statement is correct?',
    options: ['ΔU > 0', 'ΔU = 0', 'Q = 0', 'W = 0'],
    correctIndex: 1,
    explanation: 'For an ideal gas, internal energy depends ONLY on temperature. Isothermal means constant temperature, so ΔU = 0. By First Law: Q = W. Heat is exchanged and work is done.',
    topic: 'First Law',
  },
  {
    id: 'q2',
    question: 'A gas absorbs 200 J of heat and does 50 J of work on surroundings. Change in internal energy is:',
    options: ['250 J', '150 J', '−150 J', '−250 J'],
    correctIndex: 1,
    explanation: 'ΔU = Q − W = 200 − 50 = 150 J. Q = +200 J (heat absorbed by system), W = +50 J (work done BY system during expansion).',
    topic: 'First Law',
  },
  {
    id: 'q3',
    question: 'Which process is shown as a vertical line on a PV diagram?',
    options: ['Isothermal', 'Isobaric', 'Isochoric', 'Adiabatic'],
    correctIndex: 2,
    explanation: 'Isochoric = constant volume. On PV diagram, volume is on x-axis. Constant volume = vertical line. W = PΔV = 0, so all heat changes internal energy: ΔU = Q.',
    topic: 'PV Diagrams',
  },
  {
    id: 'q4',
    question: 'For a cyclic thermodynamic process, which is always true?',
    options: ['ΔU = Q', 'W = 0', 'Q = W', 'ΔS = 0'],
    correctIndex: 2,
    explanation: 'In a cyclic process, system returns to initial state, so ΔU = 0 (state function). From First Law: 0 = Q − W, therefore Q = W. Net heat = net work done.',
    topic: 'Cyclic Process',
  },
  {
    id: 'q5',
    question: 'Efficiency of a Carnot engine between 600 K and 300 K is:',
    options: ['25%', '33%', '50%', '75%'],
    correctIndex: 2,
    explanation: 'η = 1 − T₂/T₁ = 1 − 300/600 = 1 − 0.5 = 0.5 = 50%. Always use absolute temperature (Kelvin). Never use Celsius.',
    topic: 'Carnot Engine',
  },
]

export const MOCK_HISTORY: HistoryItem[] = [
  { id: '1', chapterName: 'Thermodynamics', subject: 'Physics', examType: 'JEE Mains', mode: 'quick', revisedAt: new Date(Date.now() - 3600000).toISOString() },
  { id: '2', chapterName: 'Electrochemistry', subject: 'Chemistry', examType: 'JEE Mains', mode: 'deep', revisedAt: new Date(Date.now() - 86400000).toISOString() },
  { id: '3', chapterName: 'Integration', subject: 'Maths', examType: 'JEE Mains', mode: 'last_night', revisedAt: new Date(Date.now() - 172800000).toISOString() },
  { id: '4', chapterName: 'Kinematics', subject: 'Physics', examType: 'JEE Mains', mode: 'quick', revisedAt: new Date(Date.now() - 259200000).toISOString() },
]

export const MOCK_WEAK_TOPICS: WeakTopic[] = [
  { chapterName: 'Rotational Motion', subject: 'Physics', accuracy: 38, attempts: 3 },
  { chapterName: 'Equilibrium', subject: 'Chemistry', accuracy: 44, attempts: 2 },
  { chapterName: 'Integration', subject: 'Maths', accuracy: 52, attempts: 4 },
  { chapterName: 'Electrostatics', subject: 'Physics', accuracy: 61, attempts: 2 },
  { chapterName: 'Kinematics', subject: 'Physics', accuracy: 76, attempts: 5 },
]

export function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime()
  const h = Math.floor(diff / 3600000)
  if (h < 1) return 'Just now'
  if (h < 24) return `${h}h ago`
  return `${Math.floor(h / 24)}d ago`
}

export function getGreeting(): string {
  const h = new Date().getHours()
  if (h >= 5 && h < 12) return 'Good morning!'
  if (h >= 12 && h < 17) return 'Good afternoon!'
  if (h >= 17 && h < 21) return 'Good evening!'
  return 'Still studying?'
}
