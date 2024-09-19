import { Project1Home } from '../project-1/projects-1-home';
import { ScrollProgress, useScrollProgress } from 'src/components/animate/scroll-progress';

export function Projects1View() {
  const pageProgress = useScrollProgress();

  return (
    <>
      <ScrollProgress
        variant="linear"
        progress={pageProgress.scrollYProgress}
        sx={{ position: 'fixed' }}
      />

      <Project1Home />
    </>
  );
}
