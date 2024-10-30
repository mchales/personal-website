import { CONFIG } from 'src/config-global';

import * as TAGS from './assets';
import { description as vrpdDescription } from './content/vrpd';
import { description as tacitDescription } from './content/tacit';
import { description as llmNerDescription } from './content/llm-ner';
import { description as hideDappDescription } from './content/hide-dapp';
import { description as gensimLDADescription } from './content/gensim-lda';
import { description as llmSummaryDescription } from './content/llm-summary';
import { description as lechatNoirDescription } from './content/lechat-noir';
import { description as personalWebsiteDescription } from './content/personal-website';
import { description as nlpPolarizationDescription } from './content/nlp-polarization';
import { description as emergencyResponseDescription } from './content/emergency-response';
import { description as promptCompetitionDescription } from './content/prompt-competition';
import { description as djangoAuthStarterDescription } from './content/django-auth-starter';
import { description as videoTranslateCaptionDescription } from './content/video-translate-caption';
import { description as chineseConversationLlmDescription } from './content/chinese-conversation-llm';
import {
  content as llmCodingEvalContent,
  description as llmCodingEvalDescription,
} from './content/llm-coding-eval';

export const projectData = [
  {
    id: 'vrpd',
    duration: '6 min read',
    title: 'Vehicle Routing Problem with Drones',
    description: vrpdDescription,
    status: 'Complete',
    team: '4',
    tags: [TAGS.TAG_PYTHON, TAGS.TAG_BIG_DATA, TAGS.TAG_PANDAS, TAGS.TAG_PLOTLY],
    createdAt: '2024-04-22T11:00:00.000Z',
    coverUrl: '/projects/vrpd/project-home.webp',
    content: 'To be added...',
    github: 'https://github.com/mchales/vrpd-amazon-dataset',
    youtube: 'https://youtu.be/bUmFSrAQWBc',

    author: {
      name: 'Sean McHale',
      avatarUrl: `${CONFIG.assetsDir}/assets/images/home/home-pic-1.webp`,
    },
  },
  {
    id: 'personal-website',
    duration: '2 min read',
    title: 'Personal Website',
    description: personalWebsiteDescription,
    status: 'Ongoing',
    team: '1',
    tags: [TAGS.TAG_REACT, TAGS.TAG_NEXT_JS, TAGS.TAG_TYPESCRIPT, TAGS.TAG_OPENAI_API],
    createdAt: '',
    coverUrl: '',
    content: '',
    github: 'https://github.com/mchales/personal-website',
    youtube: '',

    author: {
      name: 'Sean McHale',
      avatarUrl: `${CONFIG.assetsDir}/assets/images/home/home-pic-1.webp`,
    },
  },
  {
    id: 'llm-coding-eval',
    duration: '4 min read',
    title: 'Improving LLM Code Generation with Intentional Mistakes',
    description: llmCodingEvalDescription,
    status: 'Complete',
    team: '2',
    tags: [TAGS.TAG_OPENAI_API, TAGS.TAG_PYTHON, TAGS.TAG_DOCKER],
    createdAt: '2024-04-24T11:00:00.000Z',
    // coverUrl: '/projects/llm-coding-eval/pass20.webp',
    coverUrl: '',
    content: llmCodingEvalContent,
    github: 'https://github.com/mchales/llm-coding-eval',
    youtube: '',

    author: {
      name: 'Sean McHale',
      avatarUrl: `${CONFIG.assetsDir}/assets/images/home/home-pic-1.webp`,
    },
  },
  {
    id: 'llm-summary',
    duration: '4 min read',
    title: 'LLM Smart Summarization',
    description: llmSummaryDescription,
    status: 'Complete',
    team: '6',
    tags: [TAGS.TAG_PYTHON, TAGS.TAG_LANGCHAIN, TAGS.TAG_OPENAI_API],
    createdAt: '2023-11-30T11:00:00.000Z',
    coverUrl: '/projects/llm-summary/map-reduce.webp',
    content: '',
    github: 'https://github.com/aahn33/llm-summary',
    youtube: '',

    author: {
      name: 'Sean McHale',
      avatarUrl: `${CONFIG.assetsDir}/assets/images/home/home-pic-1.webp`,
    },
  },
  {
    id: 'tacit',
    duration: '10 min read',
    title: 'Tacit',
    description: tacitDescription,
    status: 'Suspended',
    team: '4',
    tags: [
      TAGS.TAG_PYTHON,
      TAGS.TAG_DJANGO,
      TAGS.TAG_REACT,
      TAGS.TAG_POSTGRESQL,
      TAGS.TAG_HEROKU,
      TAGS.TAG_AMAZON_RDS,
      TAGS.TAG_REDIS,
      TAGS.TAG_CELERY,
      TAGS.TAG_RESTFUL_API,
      TAGS.TAG_CICD,
      TAGS.TAG_REDUX,
      TAGS.TAG_PINECONE,
      TAGS.TAG_OPENAI_API,
      TAGS.TAG_JAVASCRIPT,
    ],
    createdAt: '2024-08-23T11:00:00.000Z',
    coverUrl: '/projects/tacit/tacit.webp',
    content: '',
    github: '',
    youtube: '',

    author: {
      name: 'Sean McHale',
      avatarUrl: `${CONFIG.assetsDir}/assets/images/home/home-pic-1.webp`,
    },
  },
  {
    id: 'emergency-response',
    duration: '5 min read',
    title: 'Emergency Response Big Data Analytics',
    description: emergencyResponseDescription,
    status: 'Complete',
    team: '2',
    tags: [
      TAGS.TAG_SPARK,
      TAGS.TAG_BIG_DATA,
      TAGS.TAG_AMAZON_EMR,
      TAGS.TAG_AMAZON_S3,
      TAGS.TAG_PLOTLY,
      TAGS.TAG_PANDAS,
    ],
    createdAt: '2023-05-02T11:00:00.000Z',
    coverUrl: '/projects/emergency-response/congestion.webp',
    content: 'To be added...',
    github: '',
    youtube: 'https://youtu.be/YSTUL6uQnYQ',

    author: {
      name: 'Sean McHale',
      avatarUrl: `${CONFIG.assetsDir}/assets/images/home/home-pic-1.webp`,
    },
  },
  {
    id: 'lechat-noir',
    duration: '3 min read',
    title: 'Lechat Noir with Reach Blockchain Programming Language',
    description: lechatNoirDescription,
    status: 'Complete',
    team: '4',
    tags: [TAGS.TAG_SOLIDITY, TAGS.TAG_REACT, TAGS.TAG_DOCKER, TAGS.TAG_JAVASCRIPT],
    createdAt: '2021-06-15T11:00:00.000Z',
    coverUrl: '/projects/lechat-noir/board.webp',
    content: 'To be added...',
    github: 'https://github.com/lunstb/lechat',
    youtube: 'https://youtu.be/o6zR4OVRjGA',

    author: {
      name: 'Sean McHale',
      avatarUrl: `${CONFIG.assetsDir}/assets/images/home/home-pic-1.webp`,
    },
  },
  {
    id: 'hide-dapp',
    duration: '5 min read',
    title: 'Blockchain-Based Patient Identity System',
    description: hideDappDescription,
    status: 'Complete',
    team: '2',
    tags: [TAGS.TAG_SOLIDITY, TAGS.TAG_REACT, TAGS.TAG_JAVASCRIPT],
    createdAt: '2023-06-15T11:00:00.000Z',
    coverUrl: '/projects/hide-dapp/presenting.webp',
    content: 'To be added...',
    github: 'https://github.com/DZhangLab/HIDe-dApp',
    youtube: '',

    author: {
      name: 'Sean McHale',
      avatarUrl: `${CONFIG.assetsDir}/assets/images/home/home-pic-1.webp`,
    },
  },
  {
    id: 'llm-ner',
    duration: '3 min read',
    title: 'Named Entity Recognition with LLMs',
    description: llmNerDescription,
    status: 'Complete',
    team: '2',
    tags: [TAGS.TAG_SCRAPY, TAGS.TAG_PYTHON, TAGS.TAG_OPENAI_API],
    createdAt: '2023-04-25T11:00:00.000Z',
    coverUrl: '/projects/llm-ner/scrape-job.webp',
    content: '',
    github: 'https://github.com/mchales/forum-web-scraper',
    youtube: '',

    author: {
      name: 'Sean McHale',
      avatarUrl: `${CONFIG.assetsDir}/assets/images/home/home-pic-1.webp`,
    },
  },
  {
    id: 'chinese-conversation-llm',
    duration: '3 min read',
    title: 'Conversation-based LLM App for Practical Chinese Language Learning',
    description: chineseConversationLlmDescription,
    status: 'Ongoing',
    team: '1',
    tags: [
      TAGS.TAG_PYTHON,
      TAGS.TAG_DJANGO,
      TAGS.TAG_TYPESCRIPT,
      TAGS.TAG_REACT,
      TAGS.TAG_POSTGRESQL,
      TAGS.TAG_RESTFUL_API,
      TAGS.TAG_REDUX,
      TAGS.TAG_OPENAI_API,
      TAGS.TAG_NEXT_JS,
    ],
    createdAt: '',
    coverUrl: '/projects/chinese-conversation-llm/prototype.webp',
    content: '',
    github: '',
    youtube: '',

    author: {
      name: 'Sean McHale',
      avatarUrl: `${CONFIG.assetsDir}/assets/images/home/home-pic-1.webp`,
    },
  },

  {
    id: 'prompt-competition',
    duration: '1 min read',
    title: 'Prompt Engineering Competition Web App',
    description: promptCompetitionDescription,
    status: 'Ongoing',
    team: '1',
    tags: [
      TAGS.TAG_PYTHON,
      TAGS.TAG_DJANGO,
      TAGS.TAG_POSTGRESQL,
      TAGS.TAG_RESTFUL_API,
      TAGS.TAG_OPENAI_API,
    ],
    createdAt: '',
    coverUrl: '',
    content: '',
    github: '',
    youtube: '',

    author: {
      name: 'Sean McHale',
      avatarUrl: `${CONFIG.assetsDir}/assets/images/home/home-pic-1.webp`,
    },
  },
  {
    id: 'video-translate-caption',
    duration: '5 min read',
    title: 'Chinese Video Translation and Captioning',
    description: videoTranslateCaptionDescription,
    status: 'Complete',
    team: '1',
    tags: [TAGS.TAG_PYTHON],
    createdAt: '2023-08-21T11:00:00.000Z',
    coverUrl: '/projects/video-translate-caption/screenshot.webp',
    content: 'To be added...',
    github: 'https://github.com/mchales/video-translate-caption',
    youtube: '',

    author: {
      name: 'Sean McHale',
      avatarUrl: `${CONFIG.assetsDir}/assets/images/home/home-pic-1.webp`,
    },
  },
  {
    id: 'django-auth-starter',
    duration: '2 min read',
    title: 'Django Project Structure with Authentication',
    description: djangoAuthStarterDescription,
    status: 'Complete',
    team: '1',
    tags: [TAGS.TAG_PYTHON, TAGS.TAG_DJANGO, TAGS.TAG_RESTFUL_API],
    createdAt: '2024-08-20T11:00:00.000Z',
    coverUrl: '',
    content: '',
    github: 'https://github.com/mchales/django-auth-starter',
    youtube: '',

    author: {
      name: 'Sean McHale',
      avatarUrl: `${CONFIG.assetsDir}/assets/images/home/home-pic-1.webp`,
    },
  },
  {
    id: 'gensim-lda',
    duration: '6 min read',
    title: 'Topic Modeling with Gensim LDA',
    description: gensimLDADescription,
    status: 'Complete',
    team: '1',
    tags: [TAGS.TAG_PYTHON, TAGS.TAG_SPACY],
    createdAt: '2023-03-20T11:00:00.000Z',
    coverUrl: '/projects/gensim-lda/topics.jpg',
    content: '',
    github: '',
    youtube: '',

    author: {
      name: 'Sean McHale',
      avatarUrl: `${CONFIG.assetsDir}/assets/images/home/home-pic-1.webp`,
    },
  },
  {
    id: 'nlp-polarization',
    duration: '5 min read',
    title: 'NLP Analysis on Subreddit Polarization',
    description: nlpPolarizationDescription,
    status: 'Complete',
    team: '4',
    tags: [
      TAGS.TAG_PYTHON,
      TAGS.TAG_FINE_TUNING,
      TAGS.TAG_BIG_DATA,
      TAGS.TAG_LANGCHAIN,
      TAGS.TAG_NTLK,
      TAGS.TAG_SCIKIT_LEARN,
    ],
    createdAt: '2024-04-30T11:00:00.000Z',
    coverUrl: '/projects/nlp-polarization/network.jpg',
    content: '',
    github: '',
    youtube: '',

    author: {
      name: 'Sean McHale',
      avatarUrl: `${CONFIG.assetsDir}/assets/images/home/home-pic-1.webp`,
    },
  },
];
