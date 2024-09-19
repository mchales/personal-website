import { CONFIG } from 'src/config-global';

const content = `
<p>Pellentesque posuere. Phasellus a est. Suspendisse pulvinar, augue ac venenatis condimentum, sem libero volutpat nibh, nec pellentesque velit pede quis nunc.</p>

<p>Pellentesque posuere. Phasellus a est. Suspendisse pulvinar, augue ac venenatis condimentum, sem libero volutpat nibh, nec pellentesque velit pede quis nunc. Phasellus viverra nulla ut metus varius laoreet. Praesent egestas tristique nibh. Donec posuere vulputate arcu. Quisque rutrum.</p>

<p>Donec posuere vulputate arcu. Quisque rutrum. Curabitur vestibulum aliquam leo. Nam commodo suscipit quam. Vestibulum ullamcorper mauris at ligula.</p>

<p>Pellentesque posuere. Phasellus a est. Suspendisse pulvinar, augue ac venenatis condimentum, sem libero volutpat nibh, nec pellentesque velit pede quis nunc. Phasellus viverra nulla ut metus varius laoreet. Praesent egestas tristique nibh.</p>


<h4>Curabitur suscipit suscipit tellus</h4>

<p>Donec posuere vulputate arcu. Quisque rutrum. Curabitur vestibulum aliquam leo. Nam commodo suscipit quam. Vestibulum ullamcorper mauris at ligula.</p>

<h4>Nullam accumsan lorem in</h4>

<p>Donec posuere vulputate arcu. Quisque rutrum. Curabitur vestibulum aliquam leo. Nam commodo suscipit quam. Vestibulum ullamcorper mauris at ligula.</p>

<p>Donec posuere vulputate arcu. Quisque rutrum. Curabitur vestibulum aliquam leo.</p>

<p>Donec posuere vulputate arcu. Quisque rutrum. Curabitur vestibulum aliquam leo. Nam commodo suscipit quam. Vestibulum ullamcorper mauris at ligula.</p>

<p>Pellentesque posuere. Phasellus a est. Suspendisse pulvinar, augue ac venenatis condimentum, sem libero volutpat nibh, nec pellentesque velit pede quis nunc. Phasellus viverra nulla ut metus varius laoreet. Praesent egestas tristique nibh.</p>

<p>Donec posuere vulputate arcu. Quisque rutrum. Curabitur vestibulum aliquam leo. Nam commodo suscipit quam. Vestibulum ullamcorper mauris at ligula.</p>
`;

export const projectData = [
  {
    id: '1',
    category: '',
    duration: '6 min read',
    title: 'Vehicle Routing Problem with Drones',
    favorited: false,
    description:
      'This project includes an algorithm and visual for the Vehicle Routing Problem with Drones (VRPD) using a dataset from the 2021 Amazon Last Mile Routing Research Challenge. The VRPD is a variant of the Vehicle Routing Problem (VRP) that includes the use of drones to deliver packages.',
    tags: ['Python', 'Big Data', 'Pandas', 'Plotly'],
    createdAt: '2024-04-22T11:00:00.000Z',
    coverUrl: '/assets/projects/1/project-home.webp',
    heroUrl: 'assets/images/career/career-1.webp',
    content: content,
    github: 'https://github.com/mchales/vrpd-amazon-dataset',
    youtube: 'https://youtu.be/bUmFSrAQWBc',
    team: '4',
    author: {
      name: 'Sean McHale',
      role: '',
      avatarUrl: `${CONFIG.assetsDir}/assets/images/home/home-pic-1.png`,
      quotes: 'Member since Mar 15, 2021',
      about:
        'Integer tincidunt. Nullam dictum felis eu pede mollis pretium. Maecenas ullamcorper, dui et placerat feugiat, eros pede varius nisi, condimentum viverra felis nunc et lorem.',
    },
  },
  {
    id: '2',
    category: 'Marketing',
    duration: '8 min read',
    title: 'The Future of Marketing Strategy 2',
    favorited: true,
    description:
      'This article discusses the latest trends and strategies in marketing for 2026. Explore how companies are adapting to new challenges.',
    tags: ['Spark'],
    createdAt: '2024-08-12T16:00:00.000Z',
    coverUrl: '',
    heroUrl: 'assets/images/career/career-1.webp',
    content: content,
    github: 'sdf',
    youtube: '',
    team: 'sdf',
    author: {
      name: 'Author Name 2',
      role: 'Marketing Specialist',
      avatarUrl: `${CONFIG.assetsDir}/assets/images/career/career-1.webp`,
      quotes: 'Member since Mar 15, 2021',
      about:
        'Integer tincidunt. Nullam dictum felis eu pede mollis pretium. Maecenas ullamcorper, dui et placerat feugiat, eros pede varius nisi, condimentum viverra felis nunc et lorem.',
    },
  },
  {
    id: '3',
    category: 'Marketing',
    duration: '8 min read',
    title: 'The Future of Marketing Strategy 3',
    favorited: false,
    description:
      'This article discusses the latest trends and strategies in marketing for 2027. Explore how companies are adapting to new challenges.',
    tags: [`OpenAI API`, `PyTorch`, `Pandas`],
    createdAt: '2024-08-12T16:00:00.000Z',
    coverUrl: '/assets/images/travel/travel-large-2.webp',
    heroUrl: 'assets/images/career/career-1.webp',
    content: content,
    github: 'dsf',
    youtube: '',
    team: 'sdf',
    author: {
      name: 'Author Name 3',
      role: 'Marketing Specialist',
      avatarUrl: '/assets/images/career/career-1.webp',
      quotes: 'Member since Mar 15, 2021',
      about:
        'Integer tincidunt. Nullam dictum felis eu pede mollis pretium. Maecenas ullamcorper, dui et placerat feugiat, eros pede varius nisi, condimentum viverra felis nunc et lorem.',
    },
  },
];
