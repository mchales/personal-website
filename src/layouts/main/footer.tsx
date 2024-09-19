import type { BoxProps } from '@mui/material/Box';
import type { Breakpoint } from '@mui/material/styles';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { CONFIG } from 'src/config-global';

// ----------------------------------------------------------------------

export type FooterProps = BoxProps & {
  layoutQuery: Breakpoint;
};

export function Footer({ layoutQuery, sx, ...other }: FooterProps) {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        borderTop: `solid 1px ${theme.vars.palette.divider}`,
        textAlign: 'center',
        ...sx,
      }}
      {...other}
    >
      <Container sx={{ py: 5, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="caption" sx={{ pb: 1 }}>
          Designed by Sean McHale
        </Typography>
        <Stack spacing={3} alignItems="center">
          <Box gap={2.5} display="flex" justifyContent="center">
            {['linkedin', 'github', 'gmail'].map((platform) => (
              <Box key={platform}>
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
              </Box>
            ))}
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
