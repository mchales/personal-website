import type { BoxProps } from '@mui/material/Box';
import type { IProjectProps } from 'src/types/project';
import type { Theme, SxProps } from '@mui/material/styles';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography'; // Import Chip

import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { fDate } from 'src/utils/format-time';

import { Image } from 'src/components/image';

import { ProjectTime } from './project-time';

// ----------------------------------------------------------------------

type Props = BoxProps & {
  posts: IProjectProps[];
  selectedTags: string[];
  onTagClick: (tag: string) => void;
  searchQuery: string;
};

export function ProjectPosts({
  posts,
  selectedTags,
  onTagClick,
  searchQuery,
  sx,
  ...other
}: Props) {
  return (
    <Box
      sx={{
        columnGap: 4,

        ...sx,
      }}
      {...other}
    >
      {posts.map((post, index) => (
        <PostItem
          key={post.id}
          post={post}
          selectedTags={selectedTags}
          onTagClick={onTagClick}
          searchQuery={searchQuery}
          sx={{ breakInside: 'avoid', mb: 4 }}
        />
      ))}
    </Box>
  );
}

// ----------------------------------------------------------------------

type PostItemProps = {
  sx?: SxProps<Theme>;
  post: IProjectProps;
  selectedTags: string[];
  onTagClick: (tag: string) => void;
  searchQuery: string;
};

export function PostItem({
  post,
  selectedTags,
  onTagClick,
  searchQuery,
  sx,
}: PostItemProps & { searchQuery: string }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const highlightText = (text: string) => {
    if (!searchQuery) return text;
    if (searchQuery.length < 3) return text;

    const parts = text.split(new RegExp(`(${searchQuery})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === searchQuery.toLowerCase() ? (
        <span key={index} style={{ backgroundColor: '#d3d3d3' }}>
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <Stack
      direction="row"
      sx={{
        borderRadius: 2,
        overflow: 'hidden',
        position: 'relative',
        bgcolor: 'background.neutral',
        ...(!post?.coverUrl && {
          bgcolor: 'primary.lighter',
        }),
        ...sx,
      }}
    >
      <Stack
        spacing={1}
        sx={{
          p: 3,
          bgcolor: 'background.neutral',
          ...(!post?.coverUrl && {
            bgcolor: 'primary.lighter',
          }),
        }}
      >
        <ProjectTime createdAt={fDate(post.createdAt)} duration={post.duration} sx={{}} />

        <Link
          component={RouterLink}
          href={`${paths.projects}/${post.id}`}
          color="inherit"
          variant="h5"
          sx={{}}
        >
          {highlightText(post.title)}
        </Link>

        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
          }}
        >
          {highlightText(post.description)} {/* Highlight description */}
        </Typography>

        {post.tags && post.tags.length > 0 && (
          <Box gap={1} display="flex" flexWrap="wrap" sx={{ mt: 3 }}>
            {post.tags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                variant={selectedTags.includes(tag) ? 'filled' : 'soft'}
                size="small"
                onClick={() => onTagClick(tag)}
              />
            ))}
          </Box>
        )}
      </Stack>
      {post?.coverUrl && !isMobile && (
        <Stack sx={{ p: 2 }}>
          <Image
            src={post.coverUrl}
            alt={post.title}
            ratio="4/3"
            sx={{ borderRadius: 1.5, width: '250px' }}
          />
        </Stack>
      )}
    </Stack>
  );
}
