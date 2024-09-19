import type { BoxProps } from '@mui/material/Box';
import type { Theme, SxProps } from '@mui/material/styles';

import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

// ----------------------------------------------------------------------

type PostTimeProps = BoxProps & {
  duration?: string;
  sx?: SxProps<Theme>;
  createdAt: string | null;
};

export function ProjectTime({ createdAt, duration, sx, ...other }: PostTimeProps) {
  return (
    <Box
      flexWrap="wrap"
      display="flex"
      alignItems="center"
      sx={{ typography: 'caption', ...sx }}
      {...other}
    >
      <Typography variant="caption" sx={{ color: 'grey.700' }}>
        {createdAt}
        {' • '}
        {duration}
      </Typography>
    </Box>
  );
}
