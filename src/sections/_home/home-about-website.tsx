import type { BoxProps } from '@mui/material/Box';
import type { Theme, SxProps } from '@mui/material/styles';

import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/config-global';
import { varAlpha, stylesMode } from 'src/theme/styles';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
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
              This website is built using React, Next.js, and TypeScript using the{' '}
              <Link
                href="https://mui.com/store/items/zone-landing-page/"
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
                Zone UI Kit
              </Link>{' '}
              source code. I'm currently working on building out a blog page.
            </Typography>
          </AnimatedDiv>
        </Box>
      </Container>
    </Box>
  );
}
