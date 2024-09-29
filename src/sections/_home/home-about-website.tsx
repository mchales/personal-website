import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { varFade, MotionViewport } from 'src/components/animate';

// ----------------------------------------------------------------------

function AnimatedDiv({ children }: { children: React.ReactNode }) {
  const variants = varFade({ distance: 24 }).inUp;
  return <m.div variants={variants}>{children}</m.div>;
}

export function HomeAboutWebsite() {
  const theme = useTheme();
  return (
    <Box
      component="section"
      bgcolor={theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800]}
      sx={{
        pb: { xs: 5, md: 10 },
      }}
    >
      <Container component={MotionViewport}>
        <Box
          sx={{
            mx: 'auto',
            maxWidth: 800,
            textAlign: 'center',
            mb: { xs: 5, md: 10 },
          }}
        >
          <AnimatedDiv>
            <Typography variant="h2" sx={{ my: 3 }}>
              About the Website
            </Typography>
          </AnimatedDiv>

          <AnimatedDiv>
            <Typography>
              This website is built using React, Next.js, and TypeScript. Check out my{' '}
              <Link
                href="/projects/personal-website/"
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
                project post
              </Link>{' '}
              to learn more about this website and to see the source code. I&apos;m currently
              working on finishing project pages and building out a blog page.
            </Typography>
          </AnimatedDiv>
        </Box>
      </Container>
    </Box>
  );
}
