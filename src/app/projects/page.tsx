import { ProjectsView } from 'src/sections/_projects/view/projects-view';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Projects',
  description: 'Projects Sean McHale has worked on',
  keywords: 'projects, development, coding',
};

export default function Page() {
  return <ProjectsView />;
}
