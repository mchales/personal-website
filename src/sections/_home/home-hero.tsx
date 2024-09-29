import type { BoxProps } from '@mui/material/Box';

import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { CONFIG } from 'src/config-global';

import { varFade, MotionViewport } from 'src/components/animate';

import { HomeImageCarousel } from 'src/sections/_home/home-image-carousel';

// ----------------------------------------------------------------------

function AnimatedDiv({ children }: { children: React.ReactNode }) {
  const variants = varFade({ distance: 24 }).inUp;
  return <m.div variants={variants}>{children}</m.div>;
}

export function HomeHero({ sx, ...other }: BoxProps) {
  const theme = useTheme();

  const renderContent = (
    <Stack
      component={MotionViewport}
      spacing={5}
      alignItems={{ xs: 'center', md: 'flex-start' }}
      sx={{
        width: 700,
        textAlign: { xs: 'center', md: 'left' },
      }}
    >
      <AnimatedDiv>
        <Typography variant="h1">
          Hello my name is <br /> Sean McHale
        </Typography>
      </AnimatedDiv>

      <AnimatedDiv>
        <Typography sx={{ width: { xs: 300, md: 700 } }}>
          I am an engineer with experience in full-stack development, machine learning, and data
          analytics. Outside of work and academics, I enjoy playing{' '}
          <Tooltip title="Feel free to friend me and we can play" arrow>
            <Link
              href="https://www.chess.com/member/greenskiearth"
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
              chess
            </Link>
          </Tooltip>
          , being outdoors, and traveling.
        </Typography>
      </AnimatedDiv>

      <Stack spacing={3}>
        <Box gap={2.5} display="flex">
          {['linkedin', 'github', 'gmail'].map((platform) => (
            <AnimatedDiv key={platform}>
              {platform === 'linkedin' && (
                <a
                  href="https://linkedin.com/in/mchales/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Box
                    component="img"
                    alt={platform}
                    src={`${CONFIG.assetsDir}/assets/icons/platforms/ic-${platform}.svg`}
                    sx={{ width: 24, height: 24 }}
                  />
                </a>
              )}
              {platform === 'github' && (
                <a href="https://github.com/mchales" target="_blank" rel="noopener noreferrer">
                  <Box
                    component="img"
                    alt={platform}
                    src={`${CONFIG.assetsDir}/assets/icons/platforms/ic-${platform}.svg`}
                    sx={{ width: 24, height: 24 }}
                  />
                </a>
              )}
              {platform === 'gmail' && (
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    window.open('mailto:seanryanmchale@gmail.com', '_blank');
                  }}
                >
                  <Box
                    component="img"
                    alt={platform}
                    src={`${CONFIG.assetsDir}/assets/icons/platforms/ic-${platform}.svg`}
                    sx={{ width: 24, height: 24 }}
                  />
                </a>
              )}
            </AnimatedDiv>
          ))}
        </Box>
      </Stack>
    </Stack>
  );

  const imageCarousel = (
    <Box
      component={MotionViewport}
      sx={{
        flex: '1 1 auto',
        flexShrink: 1,
        position: 'relative',
        display: { xs: 'none', md: 'block' },
        maxWidth: 350,
      }}
    >
      <HomeImageCarousel />
    </Box>
  );

  return (
    <Box
      component="section"
      sx={{
        py: 10,

        overflow: 'hidden',
        position: 'relative',
        [theme.breakpoints.up('md')]: {
          py: 15,
          height: '100vh',
          maxHeight: 1440,

          display: 'flex',
          alignItems: 'center',
        },
        ...sx,
      }}
      {...other}
    >
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'center',
          [theme.breakpoints.up('md')]: {
            columnGap: 10,
            alignItems: 'center',
            justifyContent: 'unset',
          },
        }}
      >
        {renderContent}
        {imageCarousel}
      </Container>
    </Box>
  );
}
