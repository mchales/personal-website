'use client';

import type { BoxProps } from '@mui/material/Box';
import type { IProjectProps } from 'src/types/project';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { fDate } from 'src/utils/format-time';

import { CONFIG } from 'src/config-global';

import { Markdown } from 'src/components/markdown';

import { ProjectTags } from '../project-tags';
import { ProjectTime } from '../project-time';

// ----------------------------------------------------------------------
type ProjectProps = BoxProps & {
  project: IProjectProps;
};

export function ProjectView({ project }: ProjectProps) {
  return (
    <>
      <Divider />

      <Container sx={{ overflow: 'hidden' }}>
        <Grid container spacing={3} justifyContent={{ md: 'center' }}>
          <Grid xs={12} md={8}>
            <Typography variant="h2" component="h1" sx={{ pt: 2 }}>
              {project?.title}
            </Typography>

            <Box gap={1.5} display="flex" sx={{ my: 5 }}>
              <Avatar src={project.author.avatarUrl} sx={{ width: 70, height: 70 }} />
              <Box flexGrow={1}>
                <Typography variant="subtitle1" sx={{ mb: 0.5 }}>
                  {project?.author.name}
                </Typography>
                <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                  Team: {project?.team === '1' ? 'Solo' : `${project?.team} members`}
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

            <Markdown content={project.content} />

            <Divider sx={{ mt: 10 }} />
          </Grid>
        </Grid>
      </Container>

      <Divider />
    </>
  );
}
