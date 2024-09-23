'use client';

import type { BoxProps } from '@mui/material/Box';
import type { IProjectProps } from 'src/types/project';

import remarkGfm from 'remark-gfm';
import ReactMarkdown from 'react-markdown';
import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress'; // Import IconButton
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { fDate } from 'src/utils/format-time';

import { CONFIG } from 'src/config-global';

import { Markdown } from 'src/components/markdown';

import { ProjectTags } from '../project-tags';
import { ProjectTime } from '../project-time';

// ----------------------------------------------------------------------
type ProjectProps = BoxProps & {
  project: IProjectProps;
};

const loadMarkdownFile = async (id: string) => {
  try {
    const filePath = `/projects/${id}/${id}.md`;
    const response = await fetch(filePath);
    if (!response.ok) throw new Error('File not found');
    const text = await response.text();
    return text;
  } catch (error) {
    console.error('Error loading markdown file:', error);
    return null;
  }
};

export function ProjectView({ project }: ProjectProps) {
  const [mdContent, setMdContent] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    if (!project.content) {
      loadMarkdownFile(project.id).then((content) => setMdContent(content));
    }
  }, [project.content, project.id]);

  return (
    <>
      <Divider />

      <Container sx={{ overflow: 'hidden' }}>
        <IconButton onClick={() => router.push(paths.projects)} aria-label="back" sx={{ mt: 2 }}>
          <ArrowBackIcon />
        </IconButton>
        <Grid container spacing={3} justifyContent={{ md: 'center' }}>
          <Grid xs={12} md={8}>
            <Typography variant="h2" component="h1" sx={{ pt: 2 }}>
              {project?.title}
            </Typography>

            <Box gap={1.5} display="flex" sx={{ my: 5 }}>
              <Avatar src={project.author.avatarUrl} sx={{ width: 90, height: 90, mt: 1 }} />
              <Box flexGrow={1}>
                <Typography variant="subtitle1" sx={{ mb: 0.5 }}>
                  {project?.author.name}
                </Typography>
                <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                  Team: {project?.team === '1' ? 'Solo' : `${project?.team} members`}
                </Typography>
                <Typography variant="caption" sx={{ mt: 0.5 }}>
                  Status: {project?.status}
                </Typography>
                <ProjectTime createdAt={fDate(project?.createdAt)} duration={project?.duration} />
              </Box>

              <Box display="flex" alignItems="center" sx={{ maxWidth: 400 }}>
                <Stack direction="column">
                  <Stack direction="row" spacing={1}>
                    {project?.github && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Box
                          component="img"
                          alt="GitHub"
                          src={`${CONFIG.assetsDir}/assets/icons/platforms/ic-github.svg`}
                          sx={{ width: 24, height: 24 }}
                        />
                      </a>
                    )}
                    {project?.youtube && (
                      <a href={project.youtube} target="_blank" rel="noopener noreferrer">
                        <Box
                          component="img"
                          alt="youtube"
                          src={`${CONFIG.assetsDir}/assets/icons/platforms/ic-youtube.svg`}
                          sx={{ width: 24, height: 24 }}
                        />
                      </a>
                    )}
                  </Stack>

                  {!!project?.tags.length && <ProjectTags tags={project?.tags} />}
                </Stack>
              </Box>
            </Box>

            <Divider />
            <Typography variant="h5" sx={{ mt: 5, mb: 5 }}>
              {project.description}
            </Typography>
            <Divider />

            {project.content ? (
              <Markdown content={project.content} />
            ) : mdContent ? (
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{mdContent}</ReactMarkdown>
            ) : (
              <Container sx={{ alignContent: 'center', pt: 4 }}>
                <CircularProgress />
              </Container>
            )}

            <Divider sx={{ mt: 10 }} />
          </Grid>
        </Grid>
      </Container>

      <Divider />
    </>
  );
}
