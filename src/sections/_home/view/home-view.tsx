'use client';

import { BackToTop } from 'src/components/animate/back-to-top';
import { ScrollProgress, useScrollProgress } from 'src/components/animate/scroll-progress';

import { HomeHero } from '../home-hero';
import { HomeGPTAssistant } from '../home-gpt-assistant';
import { HomeAboutWebsite } from '../home-about-website';
import { HomeMyExperience } from '../home-my-experience';

// ----------------------------------------------------------------------

export function HomeView() {
  const pageProgress = useScrollProgress();

  return (
    <>
      <ScrollProgress
        variant="linear"
        progress={pageProgress.scrollYProgress}
        sx={{ position: 'fixed' }}
      />

      <BackToTop />

      <HomeHero />

      <HomeGPTAssistant />

      <HomeMyExperience />

      <HomeAboutWebsite />
    </>
  );
}
