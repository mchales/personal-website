import type { BoxProps } from '@mui/material/Box';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';

// ----------------------------------------------------------------------

type PostTagsProps = BoxProps & {
  tags: string[];
};

export function ProjectTags({ tags, sx, ...other }: PostTagsProps) {
  return (
    <Box display="flex" alignItems="center" flexWrap="wrap" sx={{ mt: 1, ...sx }} {...other}>
      <Typography variant="subtitle2" sx={{ mr: 1 }}>
        Tags:
      </Typography>

      <Box gap={1} display="flex" flexWrap="wrap">
        {tags.map((tag) => (
          <Chip key={tag} size="small" variant="soft" label={tag} onClick={() => {}} />
        ))}
      </Box>
    </Box>
  );
}
