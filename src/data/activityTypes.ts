import { ActivityType, Activity } from '../types';
import {
  Sparkles,
  Presentation,
  HelpCircle,
  CheckSquare,
  ListOrdered,
  Sun,
  GraduationCap,
  Clock,
  Award,
  Mic,
  MessageCircle,
  MessageSquare,
  Users,
  UserCheck,
  Volume2,
  Megaphone,
  BookOpen,
  FileText,
  PenTool,
  Pencil,
  BookText,
  Headphones,
  Music,
  Laptop,
  MonitorPlay,
  Tablet,
  Bot,
  Globe,
  Gamepad2,
  Dice5,
  Trophy,
  Flame,
  Zap,
  Puzzle,
  Crown,
  Video,
  Film,
  Play,
  Palette,
  Brush,
  Scissors,
  Wand2,
  Shapes,
  ClipboardCheck,
  CheckCircle2,
  Ticket,
  Star,
  Layers,
  Brain,
  PartyPopper,
  Radio,
  FileCheck,
  QrCode,
  Lightbulb,
  Lock,
  Drama,
  Network,
  Split,
  LucideIcon
} from 'lucide-react';

export const ICON_MAP: Record<string, LucideIcon> = {
  Sparkles,
  Presentation,
  HelpCircle,
  CheckSquare,
  ListOrdered,
  Sun,
  GraduationCap,
  Clock,
  Award,
  Mic,
  MessageCircle,
  MessageSquare,
  Users,
  UserCheck,
  Volume2,
  Megaphone,
  BookOpen,
  FileText,
  PenTool,
  Pencil,
  BookText,
  Headphones,
  Music,
  Laptop,
  MonitorPlay,
  Tablet,
  Bot,
  Globe,
  Gamepad2,
  Dice5,
  Trophy,
  Flame,
  Zap,
  Puzzle,
  Crown,
  Video,
  Film,
  Play,
  Palette,
  Brush,
  Scissors,
  Wand2,
  Shapes,
  ClipboardCheck,
  CheckCircle2,
  Ticket,
  Star,
  Layers,
  Brain,
  PartyPopper,
  Radio,
  FileCheck,
  QrCode,
  Lightbulb,
  Lock,
  Drama,
  Network,
  Split,
  Brainstorming: Lightbulb,
  PlickersQuiz: QrCode,
  LearningStations: Layers,
  EscapeRoom: Lock,
  RolePlay: Drama,
  KahootQuiz: Gamepad2,
  MindMap: Network,
  PeerAssessment: UserCheck,
  SpeedDating: Split,
  Dictogloss: Headphones,
  Lapbook: BookOpen,
  SelfAssessment: ClipboardCheck,
  Dictation: Pencil,
  OralVocabQuestion: HelpCircle,
  OralStructuresQuestion: HelpCircle,
  OralVocab: HelpCircle,
  OralStructures: HelpCircle,
};

export type IconCategory = {
  id: string;
  name: string;
  icons: string[];
};

export const ICON_CATEGORIES: IconCategory[] = [
  {
    id: 'routines',
    name: 'Routines & Classroom',
    icons: ['Sun', 'Clock', 'GraduationCap', 'Instructions', 'Explanation', 'Sparkles', 'PartyPopper', 'LearningStations']
  },
  {
    id: 'speaking',
    name: 'Speaking & Oral',
    icons: ['OralVocabQuestion', 'OralStructuresQuestion', 'OralQuestion', 'Speaking', 'PairSpeaking', 'GroupSpeaking', 'Presentation', 'RolePlay', 'SpeedDating', 'Mic', 'Megaphone']
  },
  {
    id: 'reading',
    name: 'Reading & Vocabulary',
    icons: ['Reading', 'VocabPres', 'StructuresPres', 'OralVocabQuestion', 'OralStructuresQuestion', 'Flashcards', 'BookOpen', 'Brainstorming', 'MindMap']
  },
  {
    id: 'writing',
    name: 'Writing & Notebook',
    icons: ['Dictation', 'Worksheet', 'WorksheetCorrection', 'NotebookCopy', 'VocabCopy', 'StructuresCopy', 'Pencil', 'Dictogloss', 'Lapbook']
  },
  {
    id: 'listening',
    name: 'Listening & Audio',
    icons: ['Listening', 'Dictation', 'Song', 'Radio', 'Dictogloss']
  },
  {
    id: 'digital',
    name: 'Digital & Apps',
    icons: ['PlickersQuiz', 'KahootQuiz', 'GeniallyVocab', 'GeniallyStruct', 'GoogleForm', 'Quizlet', 'Laptop', 'Tablet', 'Bot', 'Globe']
  },
  {
    id: 'games',
    name: 'Games & Challenges',
    icons: ['WordwallGame', 'PlickersQuiz', 'KahootQuiz', 'EscapeRoom', 'Challenge', 'Game', 'Brain', 'Crown', 'Trophy']
  },
  {
    id: 'creativity',
    name: 'Creativity & Projects',
    icons: ['Brainstorming', 'MindMap', 'RolePlay', 'Lapbook', 'LearningStations', 'CanvaProject', 'Project', 'Brush', 'Scissors', 'Shapes']
  },
  {
    id: 'assessment',
    name: 'Assessment & Review',
    icons: ['SelfAssessment', 'PeerAssessment', 'PlickersQuiz', 'FinalTask', 'Review', 'ExitTicket', 'Award', 'WorksheetCorrection', 'EscapeRoom']
  }
];

export const COLOR_PRESETS = [
  { id: 'amber', label: 'Ámbar Cálido', class: 'bg-amber-100 text-amber-800 border-amber-300' },
  { id: 'blue', label: 'Azul Océano', class: 'bg-blue-100 text-blue-800 border-blue-300' },
  { id: 'indigo', label: 'Índigo Real', class: 'bg-indigo-100 text-indigo-800 border-indigo-300' },
  { id: 'purple', label: 'Púrpura Vibrante', class: 'bg-purple-100 text-purple-800 border-purple-300' },
  { id: 'pink', label: 'Rosa Dulce', class: 'bg-pink-100 text-pink-800 border-pink-300' },
  { id: 'rose', label: 'Rojo Coral', class: 'bg-rose-100 text-rose-800 border-rose-300' },
  { id: 'orange', label: 'Naranja Vivo', class: 'bg-orange-100 text-orange-800 border-orange-300' },
  { id: 'emerald', label: 'Verde Esmeralda', class: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
  { id: 'teal', label: 'Turquesa', class: 'bg-teal-100 text-teal-800 border-teal-300' },
  { id: 'sky', label: 'Cielo Claro', class: 'bg-sky-100 text-sky-800 border-sky-300' },
];

export const PREDEFINED_ACTIVITY_TYPES: ActivityType[] = [
  {
    id: 'type-warmup',
    name: 'Warm-up / Routine',
    icon: 'Sun',
    color: 'bg-amber-100 text-amber-800 border-amber-300',
    description: 'Daily calendar, weather, greeting routine or starter',
    category: 'routines'
  },
  {
    id: 'type-challenge',
    name: 'Challenge',
    icon: 'Challenge',
    color: 'bg-rose-100 text-rose-800 border-rose-300',
    description: 'Class challenge or gamified mission',
    category: 'games'
  },
  {
    id: 'type-worksheet',
    name: 'Worksheet',
    icon: 'Worksheet',
    color: 'bg-sky-100 text-sky-800 border-sky-300',
    description: 'Individual or pair worksheet activity',
    category: 'writing'
  },
  {
    id: 'type-worksheet-corr',
    name: 'Worksheet correction',
    icon: 'WorksheetCorrection',
    color: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    description: 'Check answers, green tick correction and review',
    category: 'assessment'
  },
  {
    id: 'type-explanation',
    name: 'Explanation',
    icon: 'Explanation',
    color: 'bg-blue-100 text-blue-800 border-blue-300',
    description: 'Teacher explanation & guided instruction on whiteboard',
    category: 'routines'
  },
  {
    id: 'type-instructions',
    name: 'Instructions',
    icon: 'Instructions',
    color: 'bg-indigo-100 text-indigo-800 border-indigo-300',
    description: 'Steps, guidelines and criteria for the lesson task',
    category: 'routines'
  },
  {
    id: 'type-vocab-pres',
    name: 'Vocabulary presentation',
    icon: 'VocabPres',
    color: 'bg-purple-100 text-purple-800 border-purple-300',
    description: 'Introduce new target words and visual flashcards',
    category: 'reading'
  },
  {
    id: 'type-struct-pres',
    name: 'Structures presentation',
    icon: 'StructuresPres',
    color: 'bg-teal-100 text-teal-800 border-teal-300',
    description: 'Grammar patterns and model sentences presentation',
    category: 'reading'
  },
  {
    id: 'type-genially-vocab',
    name: 'Genially vocabulary',
    icon: 'GeniallyVocab',
    color: 'bg-purple-100 text-purple-800 border-purple-300',
    description: 'Interactive digital Genially vocabulary activity',
    category: 'digital'
  },
  {
    id: 'type-genially-struct',
    name: 'Genially structures',
    icon: 'GeniallyStruct',
    color: 'bg-indigo-100 text-indigo-800 border-indigo-300',
    description: 'Interactive digital Genially grammar structure practice',
    category: 'digital'
  },
  {
    id: 'type-yt-video',
    name: 'YouTube video',
    icon: 'YouTubeVideo',
    color: 'bg-rose-100 text-rose-800 border-rose-300',
    description: 'Educational video clip or animated story',
    category: 'media'
  },
  {
    id: 'type-song',
    name: 'Song',
    icon: 'Song',
    color: 'bg-pink-100 text-pink-800 border-pink-300',
    description: 'Song, chant or rhythmic TPR listening activity',
    category: 'listening'
  },
  {
    id: 'type-oral-q',
    name: 'Oral question',
    icon: 'OralQuestion',
    color: 'bg-amber-100 text-amber-800 border-amber-300',
    description: 'Teacher-led oral questions and quick recall',
    category: 'speaking'
  },
  {
    id: 'type-speaking',
    name: 'Speaking',
    icon: 'Speaking',
    color: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    description: 'Whole class speaking and oral practice',
    category: 'speaking'
  },
  {
    id: 'type-pair-speaking',
    name: 'Pair speaking',
    icon: 'PairSpeaking',
    color: 'bg-teal-100 text-teal-800 border-teal-300',
    description: 'Dialogue or oral roleplay in pairs',
    category: 'speaking'
  },
  {
    id: 'type-group-speaking',
    name: 'Group speaking',
    icon: 'GroupSpeaking',
    color: 'bg-blue-100 text-blue-800 border-blue-300',
    description: 'Group discussion, team debate or collaborative talk',
    category: 'speaking'
  },
  {
    id: 'type-wordwall',
    name: 'Wordwall game',
    icon: 'WordwallGame',
    color: 'bg-purple-100 text-purple-800 border-purple-300',
    description: 'Interactive digital arcade game on the PDI',
    category: 'games'
  },
  {
    id: 'type-gform',
    name: 'Google Form',
    icon: 'GoogleForm',
    color: 'bg-indigo-100 text-indigo-800 border-indigo-300',
    description: 'Digital self-checking quiz or survey',
    category: 'digital'
  },
  {
    id: 'type-quizlet',
    name: 'Quizlet',
    icon: 'Quizlet',
    color: 'bg-sky-100 text-sky-800 border-sky-300',
    description: 'Quizlet flashcard review or Quizlet Live match',
    category: 'games'
  },
  {
    id: 'type-canva',
    name: 'Canva project',
    icon: 'CanvaProject',
    color: 'bg-orange-100 text-orange-800 border-orange-300',
    description: 'Visual poster, flyer or multimedia design in Canva',
    category: 'creativity'
  },
  {
    id: 'type-final-task',
    name: 'Final task',
    icon: 'FinalTask',
    color: 'bg-amber-100 text-amber-800 border-amber-300',
    description: 'Unit culminating task or major challenge',
    category: 'assessment'
  },
  {
    id: 'type-project',
    name: 'Project',
    icon: 'Project',
    color: 'bg-sky-100 text-sky-800 border-sky-300',
    description: 'Creative arts & crafts, poster or lapbook project',
    category: 'creativity'
  },
  {
    id: 'type-presentation',
    name: 'Presentation',
    icon: 'Presentation',
    color: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    description: 'Student oral presentation in front of the class',
    category: 'speaking'
  },
  {
    id: 'type-notebook-copy',
    name: 'Notebook copy',
    icon: 'NotebookCopy',
    color: 'bg-indigo-100 text-indigo-800 border-indigo-300',
    description: 'Copy notes, rules or exercises into the notebook',
    category: 'writing'
  },
  {
    id: 'type-vocab-copy',
    name: 'Vocabulary copy',
    icon: 'VocabCopy',
    color: 'bg-purple-100 text-purple-800 border-purple-300',
    description: 'Write target vocabulary and illustrations in notebook',
    category: 'writing'
  },
  {
    id: 'type-struct-copy',
    name: 'Structures copy',
    icon: 'StructuresCopy',
    color: 'bg-teal-100 text-teal-800 border-teal-300',
    description: 'Write model grammar structures in notebook',
    category: 'writing'
  },
  {
    id: 'type-reading',
    name: 'Reading',
    icon: 'Reading',
    color: 'bg-blue-100 text-blue-800 border-blue-300',
    description: 'Classbook, story or text reading comprehension',
    category: 'reading'
  },
  {
    id: 'type-listening',
    name: 'Listening',
    icon: 'Listening',
    color: 'bg-sky-100 text-sky-800 border-sky-300',
    description: 'Audio track listening comprehension task',
    category: 'listening'
  },
  {
    id: 'type-flashcards',
    name: 'Flashcards',
    icon: 'Flashcards',
    color: 'bg-orange-100 text-orange-800 border-orange-300',
    description: 'Visual flashcard drilling and memory guessing',
    category: 'reading'
  },
  {
    id: 'type-game',
    name: 'Game',
    icon: 'Game',
    color: 'bg-purple-100 text-purple-800 border-purple-300',
    description: 'Board game, movement game or class competition',
    category: 'games'
  },
  {
    id: 'type-review',
    name: 'Review',
    icon: 'Review',
    color: 'bg-teal-100 text-teal-800 border-teal-300',
    description: 'Revision of unit vocabulary, grammar and skills',
    category: 'assessment'
  },
  {
    id: 'type-exit-ticket',
    name: 'Exit ticket',
    icon: 'ExitTicket',
    color: 'bg-rose-100 text-rose-800 border-rose-300',
    description: 'Quick end-of-lesson self-reflection ticket',
    category: 'assessment'
  },
  {
    id: 'type-brainstorming',
    name: 'Brainstorming',
    icon: 'Brainstorming',
    color: 'bg-amber-100 text-amber-800 border-amber-300',
    description: 'Lluvia de ideas, activación de conocimientos previos',
    category: 'creativity'
  },
  {
    id: 'type-plickers',
    name: 'Plickers quiz',
    icon: 'PlickersQuiz',
    color: 'bg-sky-100 text-sky-800 border-sky-300',
    description: 'Cuestionario interactivo con tarjetas de códigos QR',
    category: 'assessment'
  },
  {
    id: 'type-learning-stations',
    name: 'Estaciones de aprendizaje',
    icon: 'LearningStations',
    color: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    description: 'Rotación por estaciones / rincones de trabajo en equipos',
    category: 'routines'
  },
  {
    id: 'type-escape-room',
    name: 'Escape room / Breakout',
    icon: 'EscapeRoom',
    color: 'bg-rose-100 text-rose-800 border-rose-300',
    description: 'Misión con retos, candados y pistas cooperativas',
    category: 'games'
  },
  {
    id: 'type-role-play',
    name: 'Role-play / Drama',
    icon: 'RolePlay',
    color: 'bg-purple-100 text-purple-800 border-purple-300',
    description: 'Dramatización, teatro y diálogos de situaciones reales',
    category: 'speaking'
  },
  {
    id: 'type-kahoot',
    name: 'Kahoot / Quiz',
    icon: 'KahootQuiz',
    color: 'bg-indigo-100 text-indigo-800 border-indigo-300',
    description: 'Concurso de preguntas y respuestas gamificado',
    category: 'games'
  },
  {
    id: 'type-mind-map',
    name: 'Mind map / Esquema',
    icon: 'MindMap',
    color: 'bg-teal-100 text-teal-800 border-teal-300',
    description: 'Organizador gráfico, mapa conceptual o lluvia estructurada',
    category: 'creativity'
  },
  {
    id: 'type-peer-assessment',
    name: 'Peer assessment',
    icon: 'PeerAssessment',
    color: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    description: 'Coevaluación entre parejas y feedback positivo',
    category: 'assessment'
  },
  {
    id: 'type-speed-dating',
    name: 'Speed dating speaking',
    icon: 'SpeedDating',
    color: 'bg-pink-100 text-pink-800 border-pink-300',
    description: 'Rotación rápida de parejas para practicar conversación oral',
    category: 'speaking'
  },
  {
    id: 'type-dictogloss',
    name: 'Dictogloss / Dictado',
    icon: 'Dictogloss',
    color: 'bg-sky-100 text-sky-800 border-sky-300',
    description: 'Escucha activa, toma de notas y reconstrucción en parejas',
    category: 'listening'
  },
  {
    id: 'type-lapbook',
    name: 'Lapbook / Manualidad',
    icon: 'Lapbook',
    color: 'bg-orange-100 text-orange-800 border-orange-300',
    description: 'Libro desplegable interactivo con solapas y pestañas',
    category: 'creativity'
  },
  {
    id: 'type-self-assessment',
    name: 'Autoevaluación',
    icon: 'SelfAssessment',
    color: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    description: 'Autoevaluación del alumno, lista de cotejo y reflexión',
    category: 'assessment'
  },
  {
    id: 'type-dictation',
    name: 'Dictado',
    icon: 'Dictation',
    color: 'bg-sky-100 text-sky-800 border-sky-300',
    description: 'Dictado de palabras, oraciones o vocabulario en el cuaderno',
    category: 'writing'
  },
  {
    id: 'type-oral-vocab-q',
    name: 'Preguntas orales (Vocabulario)',
    icon: 'OralVocabQuestion',
    color: 'bg-amber-100 text-amber-800 border-amber-300',
    description: 'Preguntar de forma oral el vocabulario a los alumnos con flashcards y tarjetas',
    category: 'speaking'
  },
  {
    id: 'type-oral-structures-q',
    name: 'Preguntas orales (Estructuras)',
    icon: 'OralStructuresQuestion',
    color: 'bg-teal-100 text-teal-800 border-teal-300',
    description: 'Preguntar de forma oral estructuras gramaticales y patrones de oraciones a los alumnos',
    category: 'speaking'
  },
];

export const DEFAULT_INITIAL_ACTIVITIES: Activity[] = [
  { id: 'act-1', name: 'Warm-up / Routine', icon: 'Sun', color: 'bg-amber-100 text-amber-800 border-amber-300', typeId: 'type-warmup', description: 'Daily calendar & weather routine' },
  { id: 'act-2', name: 'Vocabulary presentation', icon: 'VocabPres', color: 'bg-purple-100 text-purple-800 border-purple-300', typeId: 'type-vocab-pres', description: 'Flashcards & new words' },
  { id: 'act-3', name: 'Game / Practice', icon: 'WordwallGame', color: 'bg-teal-100 text-teal-800 border-teal-300', typeId: 'type-wordwall', description: 'Interactive digital or classroom game' },
];
