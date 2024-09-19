import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

type ProjectSidebarProps = {
  tags?: string[];
};

export function ProjectsSidebar({
  tags,
  selectedTags,
  onTagClick,
  searchQuery,
  setSearchQuery, // Add props for search query
  ...other
}: ProjectSidebarProps & {
  selectedTags: string[];
  onTagClick: (tag: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}) {
  const renderTags = !!tags?.length && (
    <Stack spacing={2}>
      <Typography variant="h5">Tags</Typography>

      <Box gap={1} display="flex" flexWrap="wrap">
        {tags.map((tag) => (
          <Chip
            key={tag}
            label={tag}
            variant={selectedTags.includes(tag) ? 'filled' : 'soft'}
            size="small"
            onClick={() => onTagClick(tag)}
          />
        ))}
      </Box>
    </Stack>
  );

  return (
    <>
      <TextField
        fullWidth
        hiddenLabel
        placeholder="Search..."
        value={searchQuery} // Bind search query to the input
        onChange={(e) => setSearchQuery(e.target.value)} // Update query on input change
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Iconify width={24} icon="carbon:search" sx={{ color: 'text.disabled' }} />
            </InputAdornment>
          ),
        }}
        sx={{ display: { xs: 'none', md: 'inline-flex' } }}
      />

      <Box
        gap={5}
        display="flex"
        flexDirection="column"
        sx={{
          pt: { md: 5 },
          pb: { xs: 10, md: 0 },
        }}
        {...other}
      >
        {renderTags}
      </Box>
    </>
  );
}
