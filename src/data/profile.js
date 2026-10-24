export const contact = {
  email: 'adielmsoares@gmail.com',
  linkedin: 'https://www.linkedin.com/in/adiel-soares-122579145',
  instagram: 'https://www.instagram.com/adielmsoares',
  instagramHandle: '@adielmsoares',
  whatsapp: '5561991127447',
  whatsappDisplay: '+55 61 99112-7447',
};

/** Link do WhatsApp com mensagem inicial opcional. */
export function whatsappUrl(message) {
  return `https://wa.me/${contact.whatsapp}${message ? `?text=${encodeURIComponent(message)}` : ''}`;
}

export const specialties = [
  'Product Design',
  'Design Systems',
  'UX Research',
  'Interface Engineering',
  'React',
];

export const expertise = [
  {
    id: 'productDesign',
    number: '01',
    skills: ['UX Research', 'Discovery', 'Product Strategy', 'User Flows', 'Information Architecture', 'Usability Testing'],
  },
  {
    id: 'uxui',
    number: '02',
    skills: ['Interface Design', 'Prototyping', 'Design Tokens', 'Component Libraries', 'Responsive Design', 'Accessibility'],
  },
  {
    id: 'frontend',
    number: '03',
    skills: ['React', 'JavaScript', 'TypeScript', 'Next.js', 'HTML', 'CSS/SASS', 'REST APIs'],
  },
];

export const portfolioAreas = [
  {
    id: 'strategy',
    letter: 'A',
    number: '01',
    anchor: 'strategy',
    competencies: ['Discovery', 'UX Research', 'Information Architecture', 'User Flows', 'Product Strategy', 'Usability Testing'],
  },
  {
    id: 'designSystems',
    letter: 'B',
    number: '02',
    anchor: 'design-systems',
    competencies: ['UI Design', 'Component Libraries', 'Design Tokens', 'Accessibility', 'Interaction Design', 'Prototyping'],
  },
  {
    id: 'frontend',
    letter: 'C',
    number: '03',
    anchor: 'frontend',
    competencies: ['React', 'TypeScript', 'JavaScript', 'Next.js', 'HTML', 'CSS/SASS', 'REST APIs', 'Component Architecture'],
  },
  {
    id: 'enterprise',
    letter: 'D',
    number: '04',
    anchor: 'enterprise',
    competencies: ['Information Architecture', 'UX/UI', 'Design Systems', 'Accessibility', 'Responsive Design', 'Frontend'],
  },
];

// context: contexto dos projetos atendidos; a empresa listada é sempre a empregadora.
export const experience = [
  { id: 'g4fSenior', company: 'G4F', context: 'public', start: [2025, 4], end: null },
  { id: 'g4fUi', company: 'G4F', context: 'public', start: [2022, 3], end: [2025, 3] },
  { id: 'capgemini', company: 'Capgemini', context: 'public', start: [2021, 7], end: [2022, 2] },
  { id: 'ibti', company: 'IBTI', companyFull: 'Instituto Brasília de Tecnologia e Inovação', context: 'private', start: [2020, 3], end: [2020, 12] },
  { id: 'aparece', company: 'Aparece Brasil', context: 'private', start: [2017], end: [2018] },
];

export const progression = [
  { id: 'systems', year: '2017' },
  { id: 'frontend', year: '2020' },
  { id: 'hybrid', year: '2021' },
  { id: 'ui', year: '2022' },
  { id: 'product', year: '2025' },
];

export const skillGroups = [
  { id: 'product', items: ['Research', 'Discovery', 'Information Architecture', 'Prototyping', 'User Flows', 'Usability'] },
  { id: 'interface', items: ['UI Design', 'Design Tokens', 'Component Design', 'Responsive Design', 'WCAG'] },
  { id: 'frontend', items: ['React', 'JavaScript', 'TypeScript', 'Next.js', 'HTML', 'CSS', 'SASS'] },
  {
    id: 'ai',
    items: ['AI-assisted Design', 'AI Coding Assistants', 'Prompt Engineering', 'LLM APIs', 'Conversational UX', 'AI UX Patterns'],
  },
  { id: 'complementary', items: ['Node.js', 'REST APIs', 'WordPress', 'SQL/NoSQL'] },
];

export const education = [
  { id: 'softwareEngineering', school: 'IESB' },
  { id: 'mba', school: 'Descomplica' },
  { id: 'ads', school: 'Grupo Projeção' },
  { id: 'mobile', school: 'Descomplica' },
];
