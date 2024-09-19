import { CONFIG } from 'src/config-global';
import { content as vrpdContent, description as vrpdDescription } from './content/vrpd';
import { description as personalWebsiteDescription } from './content/personal-website';

export const projectData = [
  {
    id: 'vrpd',
    duration: '6 min read',
    title: 'Vehicle Routing Problem with Drones',
    description: vrpdDescription,
    status: 'Completed',
    team: '4',
    tags: ['Python', 'Big Data', 'Pandas', 'Plotly'],
    createdAt: '2024-04-22T11:00:00.000Z',
    coverUrl: '/assets/projects/1/project-home.webp',
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
    tags: ['React', 'Next.js', 'TypeScript', 'OpenAI API'],
    createdAt: '2024-09-20T11:00:00.000Z',
    coverUrl: '',
    content: 'To be added...',
    github: 'https://github.com/mchales/vrpd-amazon-dataset',
    youtube: 'https://youtu.be/bUmFSrAQWBc',

    author: {
      name: 'Sean McHale',
      avatarUrl: `${CONFIG.assetsDir}/assets/images/home/home-pic-1.png`,
    },
  },
];
