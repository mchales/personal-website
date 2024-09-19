'use client';

import React, { useState } from 'react';

import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';

import { _tags } from 'src/data/projects/assets';
import { projectData } from 'src/data/projects/_projects';

import { ProjectPosts } from '../projects-posts';
import { ProjectsTitle } from '../projects-title';
import { ProjectsSidebar } from '../projects-sidebar';
import { ProjectsSearchMobile } from '../projects-search-mobile';

const sortedProjects = projectData.sort(
  (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
);

export function ProjectsView() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState(''); // Add state for search query

  // Handle tag selection
  const handleTagClick = (tag: string) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag) ? prevTags.filter((t) => t !== tag) : [...prevTags, tag]
    );
  };

  // Filter posts based on selected tags and search query
  const filteredPosts = sortedProjects.filter((project) => {
    const matchesTags = selectedTags.length
      ? selectedTags.every((tag) => project.tags?.includes(tag))
      : true;

    const searchRegex = new RegExp(searchQuery, 'gi');
    const matchesSearch = searchRegex.test(project.title) || searchRegex.test(project.description);

    return matchesTags && matchesSearch;
  });

  return (
    <>
      <ProjectsTitle />
      <ProjectsSearchMobile />

      <Container sx={{ pt: { md: 5 }, pb: { md: 15 } }}>
        <Grid disableEqualOverflow container spacing={{ md: 8 }}>
          <Grid xs={12} md={3}>
            <ProjectsSidebar
              tags={_tags}
              selectedTags={selectedTags}
              onTagClick={handleTagClick}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery} // Pass search query state to sidebar
            />
          </Grid>

          <Grid xs={12} md={9}>
            <ProjectPosts
              posts={filteredPosts}
              selectedTags={selectedTags}
              onTagClick={handleTagClick}
              searchQuery={searchQuery} // Pass search query to highlight the matches
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
