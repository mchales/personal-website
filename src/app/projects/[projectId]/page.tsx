import { projectData } from 'src/data/projects/_projects';

import { ProjectView } from 'src/sections/_projects/view/project-view';

export const metadata = {
  title: 'Project',
  description: 'Project Sean McHale has worked on',
  keywords: 'projects, development, coding',
};

export default function Page({ params }: { params: { projectId: string } }) {
  const selectedProject = projectData.find((project) => project.id === params.projectId);

  // Check if the selectedProject is undefined and handle accordingly
  if (!selectedProject) {
    return <div>Project not found</div>; // or some other fallback UI
  }

  return <ProjectView project={selectedProject} />;
}
