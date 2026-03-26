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
  'Class 10 Boards': {
    color: '#F59E0B',
    bgColor: '#FFFBEB',
    studentCount: '20L+ students',
    subjects: {
      Science: [
        'Chemical Reactions and Equations', 'Acids Bases and Salts', 'Metals and Non-metals',
        'Carbon and its Compounds', 'Life Processes', 'Control and Coordination',
        'Heredity and Evolution', 'Light: Reflection and Refraction',
        'Human Eye and Colourful World', 'Electricity', 'Magnetic Effects of Current',
        'Sources of Energy', 'Our Environment',
      ],
      Mathematics: [
        'Real Numbers', 'Polynomials', 'Pair of Linear Equations',
        'Quadratic Equations', 'Arithmetic Progressions', 'Triangles',
        'Coordinate Geometry', 'Introduction to Trigonometry',
        'Some Applications of Trigonometry', 'Circles',
        'Areas Related to Circles', 'Surface Areas and Volumes', 'Statistics', 'Probability',
      ],
      'Social Science': [
        'Resources and Development', 'Forest and Wildlife Resources', 'Water Resources',
        'Agriculture', 'Nationalism in India', 'Age of Industrialisation',
        'Print Culture and Modern World', 'Power Sharing', 'Federalism',
        'Democracy and Diversity', 'Money and Credit', 'Globalisation and Indian Economy',
        'Consumer Rights', 'Development',
      ],
      English: [
        'Reading Comprehension', 'Letter Writing', 'Essay Writing',
        'Grammar: Tenses', 'Grammar: Voice and Narration', 'Grammar: Clauses',
        'First Flight: Poetry', 'First Flight: Prose', 'Footprints Without Feet',
      ],
    },
  },
  'Class 12 Boards': {
    color: '#EC4899',
    bgColor: '#FDF2F8',
    studentCount: '15L+ students',
    subjects: {
      Physics: [
        'Electric Charges and Fields', 'Electrostatic Potential and Capacitance',
        'Current Electricity', 'Moving Charges and Magnetism',
        'Magnetism and Matter', 'Electromagnetic Induction',
        'Alternating Current', 'Electromagnetic Waves',
        'Ray Optics and Optical Instruments', 'Wave Optics',
        'Dual Nature of Radiation and Matter', 'Atoms', 'Nuclei',
        'Semiconductor Electronics',
      ],
      Chemistry: [
        'Solutions', 'Electrochemistry', 'Chemical Kinetics', 'Surface Chemistry',
        'General Principles of Isolation of Elements', 'p-Block Elements',
        'd and f Block Elements', 'Coordination Compounds',
        'Haloalkanes and Haloarenes', 'Alcohols Phenols and Ethers',
        'Aldehydes Ketones and Carboxylic Acids', 'Amines',
        'Biomolecules', 'Polymers', 'Chemistry in Everyday Life',
      ],
      Mathematics: [
        'Relations and Functions', 'Inverse Trigonometric Functions',
        'Matrices', 'Determinants', 'Continuity and Differentiability',
        'Application of Derivatives', 'Integrals',
        'Application of Integrals', 'Differential Equations',
        'Vector Algebra', 'Three Dimensional Geometry',
        'Linear Programming', 'Probability',
      ],
      Biology: [
        'Reproduction in Organisms', 'Sexual Reproduction in Flowering Plants',
        'Human Reproduction', 'Reproductive Health',
        'Principles of Inheritance and Variation',
        'Molecular Basis of Inheritance', 'Evolution',
        'Human Health and Disease', 'Microbes in Human Welfare',
        'Biotechnology: Principles and Processes',
        'Biotechnology and its Applications',
        'Organisms and Populations', 'Ecosystem',
        'Biodiversity and Conservation', 'Environmental Issues',
      ],
      'Accountancy': [
        'Accounting for Partnership Firms', 'Reconstitution of Partnership',
        'Dissolution of Partnership Firm', 'Accounting for Share Capital',
        'Issue and Redemption of Debentures', 'Financial Statements of Companies',
        'Analysis of Financial Statements', 'Cash Flow Statement',
      ],
      'Business Studies': [
        'Nature and Significance of Management', 'Principles of Management',
        'Business Environment', 'Planning', 'Organising',
        'Staffing', 'Directing', 'Controlling',
        'Financial Management', 'Financial Markets',
        'Marketing Management', 'Consumer Protection',
      ],
      'Economics': [
        'Introduction to Microeconomics', 'Theory of Consumer Behaviour',
        'Production and Costs', 'Theory of Firm Under Perfect Competition',
        'Market Equilibrium', 'Non-competitive Markets',
        'National Income Accounting', 'Money and Banking',
        'Determination of Income and Employment',
        'Government Budget and Economy', 'Balance of Payments',
      ],
    },
  },
  'CAT': {
    color: '#DC2626',
    bgColor: '#FEF2F2',
    studentCount: '3L+ students',
    subjects: {
      'Quantitative Aptitude': [
        'Number System', 'LCM and HCF', 'Percentages',
        'Profit Loss and Discount', 'Simple and Compound Interest',
        'Ratio Proportion and Variation', 'Time Speed and Distance',
        'Time and Work', 'Averages and Mixtures', 'Algebra: Linear Equations',
        'Algebra: Quadratic Equations', 'Functions and Graphs',
        'Geometry: Lines and Angles', 'Geometry: Triangles',
        'Geometry: Circles', 'Mensuration', 'Coordinate Geometry',
        'Trigonometry', 'Permutation and Combination', 'Probability',
        'Set Theory', 'Logarithms and Surds', 'Sequences and Series',
      ],
      'Verbal Ability and Reading Comprehension': [
        'Reading Comprehension: Main Idea', 'Reading Comprehension: Inference',
        'Reading Comprehension: Tone and Attitude', 'Para Jumbles',
        'Para Summary', 'Odd Sentence Out', 'Sentence Completion',
        'Critical Reasoning', 'Vocabulary in Context',
        'Grammar: Subject-Verb Agreement', 'Grammar: Tenses',
        'Grammar: Pronouns and Modifiers', 'Idioms and Phrases',
      ],
      'Data Interpretation and Logical Reasoning': [
        'Tables', 'Bar Charts', 'Line Graphs', 'Pie Charts',
        'Caselets', 'Data Sufficiency',
        'Seating Arrangement: Linear', 'Seating Arrangement: Circular',
        'Blood Relations', 'Direction Sense',
        'Syllogisms', 'Coding and Decoding',
        'Clocks and Calendars', 'Binary Logic',
        'Team Selection and Distribution', 'Games and Tournaments',
        'Venn Diagrams', 'Cubes and Dice',
      ],
    },
  },
} as const

export const SUBJECT_COLORS: Record<string, string> = {
  Physics: '#378ADD',
  Chemistry: '#1D9E75',
  Maths: '#7F77DD',
  Mathematics: '#7F77DD',
  Biology: '#E85D24',
  Science: '#F59E0B',
  'Social Science': '#8B5CF6',
  English: '#06B6D4',
  Accountancy: '#EC4899',
  'Business Studies': '#F97316',
  Economics: '#14B8A6',
  'Quantitative Aptitude': '#DC2626',
  'Verbal Ability and RC': '#7C3AED',
  DILR: '#0EA5E9',
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
