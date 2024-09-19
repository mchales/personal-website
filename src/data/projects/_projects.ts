import { CONFIG } from 'src/config-global';

import * as TAGS from './assets';
import { description as vrpdDescription } from './content/vrpd';
import { description as tacitDescription } from './content/tacit';
import { description as llmSummaryDescription } from './content/llm-summary';
import { description as llmCodingEvalDescription } from './content/llm-coding-eval';
import { description as personalWebsiteDescription } from './content/personal-website'; // This will automatically import all constants from the index file

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
    content: '',
    github: 'https://github.com/mchales/vrpd-amazon-dataset',
    youtube: 'https://youtu.be/bUmFSrAQWBc',

    author: {
      name: 'Sean McHale',
      avatarUrl: `${CONFIG.assetsDir}/assets/images/home/home-pic-1.png`,
    },
  },
  {
    id: 'personal-wesbite',
    duration: '4 min read',
    title: 'Developing a Personal Website',
    description: personalWebsiteDescription,
    status: 'Ongoing',
    team: '1',
    tags: [TAGS.TAG_REACT, TAGS.TAG_NEXT_JS, TAGS.TAG_TYPESCRIPT, TAGS.TAG_OPENAI_API],
    createdAt: '2024-09-20T11:00:00.000Z',
    coverUrl: '',
    content: 'To be added...',
    github: 'https://github.com/mchales/personal-website',
    youtube: '',

    author: {
      name: 'Sean McHale',
      avatarUrl: `${CONFIG.assetsDir}/assets/images/home/home-pic-1.png`,
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
    coverUrl: '/projects/llm-coding-eval/pass20.webp',
    content: 'To be added...',
    github: 'https://github.com/mchales/llm-coding-eval',
    youtube: '',

    author: {
      name: 'Sean McHale',
      avatarUrl: `${CONFIG.assetsDir}/assets/images/home/home-pic-1.png`,
    },
  },
  {
    id: 'llm-summary',
    duration: '5 min read',
    title: 'LLM Smart Summarization',
    description: llmSummaryDescription,
    status: 'Complete',
    team: '6',
    tags: [TAGS.TAG_PYTHON, TAGS.TAG_LANGCHAIN, TAGS.TAG_OPENAI_API],
    createdAt: '2023-11-30T11:00:00.000Z',
    coverUrl: '/projects/llm-summary/map-reduce.webp',
    content: 'To be added...',
    github: 'https://github.com/aahn33/llm-summary',
    youtube: '',

    author: {
      name: 'Sean McHale',
      avatarUrl: `${CONFIG.assetsDir}/assets/images/home/home-pic-1.png`,
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
      TAGS.TAG_AMAZON_S3,
      TAGS.TAG_REDIS,
      TAGS.TAG_CELERY,
      TAGS.TAG_RESTFUL_API,
      TAGS.TAG_REDUX,
      TAGS.TAG_PINECONE,
      TAGS.TAG_OPENAI_API,
    ],
    createdAt: '2024-08-20T11:00:00.000Z',
    coverUrl: '/projects/tacit/tacit.webp',
    content: 'To be added...',
    github: '',
    youtube: '',

    author: {
      name: 'Sean McHale',
      avatarUrl: `${CONFIG.assetsDir}/assets/images/home/home-pic-1.png`,
    },
  },
];
