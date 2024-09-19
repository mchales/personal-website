import type { BoxProps } from '@mui/material/Box';
import type { ButtonProps } from '@mui/material/Button';
import type { Theme, SxProps, Breakpoint } from '@mui/material/styles';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { styled, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';
import Button, { buttonClasses } from '@mui/material/Button';

import { usePathname } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';
import { removeLastSlash } from 'src/routes/utils';

import { CONFIG } from 'src/config-global';
import { varAlpha } from 'src/theme/styles';

import { Logo } from 'src/components/logo';
import { Iconify } from 'src/components/iconify';
import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

type AppStoreButtonProps = ButtonProps & {
  title: string;
  caption: string;
};

const AppStoreButton = styled((props: AppStoreButtonProps) => (
  <Button {...props}>
    <div>
      <Box component="span" sx={{ opacity: 0.72, display: 'block', typography: 'caption' }}>
        {props.caption}
      </Box>
      <Box component="span" sx={{ mt: -0.5, typography: 'h6' }}>
        {props.title}
      </Box>
    </div>
  </Button>
))(({ theme }) => ({
  flexShrink: 0,
  padding: '5px 12px',
  color: theme.vars.palette.common.white,
  border: `solid 1px ${varAlpha(theme.vars.palette.common.blackChannel, 0.24)}`,
  background: `linear-gradient(180deg, ${theme.vars.palette.grey[900]}, ${theme.vars.palette.common.black})`,
  [`& .${buttonClasses.startIcon}`]: {
    marginLeft: 0,
  },
}));

type BlockProps = {
  sx?: SxProps<Theme>;
  layoutQuery: Breakpoint;
  children: React.ReactNode;
};

function SectionBlock({ children, layoutQuery, sx }: BlockProps) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        gap: 2,
        display: 'flex',
        textAlign: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        [theme.breakpoints.up(layoutQuery)]: {
          textAlign: 'left',
          alignItems: 'flex-start',
        },
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}

// ----------------------------------------------------------------------

export type FooterProps = BoxProps & {
  layoutQuery: Breakpoint;
};

export function Footer({ layoutQuery, sx, ...other }: FooterProps) {
  const theme = useTheme();

  const pathname = usePathname();

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
