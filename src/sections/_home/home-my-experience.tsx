import { m } from 'framer-motion';

import { Box, Grid, Link, Stack, useTheme, Container, Typography } from '@mui/material';

import { Iconify } from 'src/components/iconify';
import { varFade, MotionViewport } from 'src/components/animate';

export function HomeMyExperience() {
  const theme = useTheme();

  const skills = [
    {
      category: 'Web Development & Frameworks',
      items: [
        'Django',
        'React',
        'RESTful API',
        'C3 Platform',
        'CI/CD',
        'Redux',
        'Next.js',
        'pytest',
      ],
      icon: 'eva:code-outline',
    },
    {
      category: 'Programming Languages',
      items: ['Python', 'JavaScript', 'TypeScript', 'Java', 'C++', 'C', 'Solidity'],
      icon: 'mdi:language-cpp',
    },
    {
      category: 'Data Science & Machine Learning',
      items: ['NumPy', 'Pandas', 'PyTorch', 'scikit-learn', 'Azure Machine Learning'],
      icon: 'mdi:robot-outline',
    },
    {
      category: 'Natural Language Processing',
      items: ['Claude Code', 'OpenAI API', 'LangChain', 'Pinecone', 'NLTK', 'spaCy'],
      icon: 'ic:outline-api',
    },
    {
      category: 'Cloud & Databases',
      items: ['PostgreSQL', 'Amazon RDS', 'Amazon S3', 'Amazon EMR', 'Heroku', 'Docker', 'Redis'],
      icon: 'carbon:cloud',
    },
    {
      category: 'Big Data & Distributed Systems',
      items: ['Grafana', 'OpenSearch', 'Spark', 'Hadoop', 'Redis'],
      icon: 'mdi:server-network',
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
              Forward Deployed Engineer at C3 AI
            </Typography>
          </m.div>
          <m.div variants={varFade().inUp}>
            <Typography variant="body1" sx={{ mt: 3 }}>
              I am a Forward Deployed Engineer at C3 AI building enterprise AI applications for
              large-scale customer deployments. I earned my MS in Computer Science with a machine
              learning specialization from Georgia Tech and my undergraduate degree from Vanderbilt
              in Computer Science and Applied Mathematics.
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
                  My work spans enterprise AI delivery, full-stack product development, data
                  integration, and testing. I enjoy owning projects end to end, from shaping the
                  solution and building customer-facing features to deployment and iteration in
                  production that delivers real value for customers.
                </Typography>
              </m.div>
              <m.div variants={varFade().inUp}>
                <Typography variant="h4"> Recent Work</Typography>
              </m.div>
              <m.div variants={varFade().inUp}>
                <Typography variant="body1">
                  At{' '}
                  <Link
                    href="https://c3.ai/"
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
                    C3 AI
                  </Link>
                  , I build and deliver enterprise AI applications on the C3 AI Platform by
                  designing solutions, developing customer-facing features, integrating data, and
                  managing production deployments.
                </Typography>
              </m.div>
              <m.div variants={varFade().inUp}>
                <Typography variant="body1">
                  Before C3 AI, I was the founding engineer at Tacit, where I led development of an
                  AI-powered qualitative research platform. That mix of startup product work and
                  enterprise delivery has made me effective both in fast iteration and in shipping
                  reliable systems for production customers.
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
                    href="/assets/sean-mchale-resume.pdf"
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
