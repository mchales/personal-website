import { m } from 'framer-motion';

import {
  Box,
  Grid,
  Link,
  Stack,
  useTheme,
  Container,
  Typography,
} from '@mui/material';

import { Iconify } from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';

export function HomeMyExperience() {
  const theme = useTheme();

  const skills = [
    {
      category: 'Web Development & Frameworks',
      items: ['Django', 'React', 'RESTful API', 'Redux', 'Next.js', 'TypeScript'],
      icon: 'eva:code-outline',
    },
    {
      category: 'Programming Languages',
      items: ['Python', 'C++', 'Java', 'JavaScript', 'C', 'Solidity', 'Rust'],
      icon: 'mdi:language-cpp',
    },
    {
      category: 'Data Science & Machine Learning',
      items: ['Pandas', 'NumPy', 'PyTorch', 'Azure Machine Learning'],
      icon: 'mdi:robot-outline',
    },
    {
      category: 'Cloud & Databases',
      items: ['PostgreSQL', 'Amazon RDS', 'Amazon S3', 'Amazon EMR', 'Heroku', 'Redis'],
      icon: 'carbon:cloud',
    },
    {
      category: 'Big Data & Distributed Systems',
      items: ['Spark', 'Hadoop', 'Celery', 'Redis'],
      icon: 'mdi:server-network',
    },
    {
      category: 'AI & APIs',
      items: ['OpenAI API', 'LangChain', 'Pinecone'],
      icon: 'ic:outline-api',
    },
    {
      category: 'Data Scraping & Visualization',
      items: ['Scrapy', 'Plotly', 'BeautifulSoup', 'Tableau'],
      icon: 'mdi:chart-line',
    },
  ];

  return (
    <Box component="section" sx={{ pb: { xs: 5, md: 10 } }}>
      <Container component={MotionViewport}>
        <Box
          sx={{
            mx: 'auto',
            maxWidth: 800,
            textAlign: 'center',
            mb: { xs: 5, md: 10 },
          }}
        >
          <m.div variants={varFade().inUp}>
            <Typography variant="h2" sx={{ my: 3 }}>
              Sean McHale Overview
            </Typography>
          </m.div>
          <m.div variants={varFade().inUp}>
            <Typography variant="h5" color="text.secondary">
              MSCS Student at Georgia Institute of Technology
            </Typography>
          </m.div>
          <m.div variants={varFade().inUp}>
            <Typography variant="body1" sx={{ mt: 3 }}>
              I am currently a MSCS student at Georgia Institute of Technology graduating in
              December 2024. I did my undergraduate at Vanderbilt University in Computer Science and
              Applied Mathematics.
            </Typography>
          </m.div>
        </Box>

        <Grid container spacing={5}>
          <Grid item xs={12} md={6}>
            <Stack spacing={3}>
              <m.div variants={varFade().inUp}>
                <Typography variant="h4"> Experience</Typography>
              </m.div>
              <m.div variants={varFade().inUp}>
                <Typography variant="body1">
                  Most of my projects are in the realm of web development, data science, and machine
                  learning. I am always looking for new projects to work on and new technologies to
                  learn.
                </Typography>
              </m.div>
              <m.div variants={varFade().inUp}>
                <Typography variant="h4"> Recent Work</Typography>
              </m.div>
              <m.div variants={varFade().inUp}>
                <Typography variant="body1">
                  In my most recent role as the Founding Engineer at{' '}
                  <Link
                    href="https://www.linkedin.com/company/tacitsolutions/"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      textDecoration: 'none',
                      color: theme.palette.primary.main,
                      fontWeight: 'bold',
                      transition: 'none',
                      '&:hover': {
                        color: theme.palette.primary.dark,
                        transition: 'none',
                      },
                    }}
                  >
                    Tacit
                  </Link>
                  , an AI startup, I led the development of an MVP for a qualitative data collection
                  platform. This platform facilitated one-on-one, scalable conversations between
                  participants and an AI assistant. Think of a survey, but instead of simple
                  responses, participants engage in conversations with an AI assistant where deeper
                  insights and details are shared. Key ideas are tracked and reintroduced to other
                  users for validation. All conversation and idea data is processed and displayed
                  for easy exploration.
                </Typography>
              </m.div>
              <m.div variants={varFade().inUp}>
                <Typography variant="body1">
                  Although the project was eventually suspended, the experience gave me invaluable
                  lessons in building AI-driven products from the ground up, AGILE development, and
                  managing real-time updates on a live product.
                </Typography>
              </m.div>
              <m.div variants={varFade().inUp}>
                <Typography variant="h4"> Contact</Typography>
              </m.div>

              <m.div variants={varFade().inUp}>
                <Typography variant="body1">
                  If you are interested in hiring me, contact me at:{' '}
                  <Link
                    href="mailto:seanryanmchale@gmail.com"
                    sx={{
                      textDecoration: 'none',
                      color: theme.palette.primary.main,
                      fontWeight: 'bold',
                      transition: 'none',
                      '&:hover': {
                        color: theme.palette.primary.dark,
                        transition: 'none',
                      },
                    }}
                  >
                    seanryanmchale@gmail.com
                  </Link>
                </Typography>
              </m.div>
              <m.div variants={varFade().inUp}>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  You can also download my resume here:{' '}
                  <Link
                    href="/assets/resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    sx={{
                      textDecoration: 'none',
                      color: theme.palette.primary.main,
                      fontWeight: 'bold',
                      transition: 'none',
                      '&:hover': {
                        color: theme.palette.primary.dark,
                        transition: 'none',
                      },
                    }}
                  >
                    Download Resume
                  </Link>
                </Typography>
              </m.div>
            </Stack>
          </Grid>

          <Grid item xs={12} md={6}>
            <Stack spacing={3}>
              <m.div variants={varFade().inUp}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Typography variant="h4">Skills & Technologies</Typography>
                  <Typography variant="caption" sx={{ pt: 1 }}>
                    (Ordered by Experience)
                  </Typography>
                </Stack>
              </m.div>
              {skills.map((skill, index) => (
                <m.div key={index} variants={varFade().inUp}>
                  <Box sx={{ mb: 1 }}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Iconify icon={skill.icon} sx={{ fontSize: 30, color: 'primary.main' }} />
                      <Typography variant="h6">{skill.category}</Typography>
                    </Stack>
                    <Typography variant="body2" sx={{ ml: 4, mt: 1 }}>
                      {skill.items.join(', ')}
                    </Typography>
                  </Box>
                </m.div>
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
