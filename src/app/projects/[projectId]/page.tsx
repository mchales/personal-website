import { projectData } from 'src/data/projects/_projects';

import { ProjectView } from 'src/sections/_projects/view/project-view';

export default function Page({ params }: { params: { projectId: string } }) {
  const selectedProject = projectData.find((project) => project.id === params.projectId);

  // Check if the selectedProject is undefined and handle accordingly
  if (!selectedProject) {
    return <div>Project not found</div>; // or some other fallback UI
  }

  return <ProjectView project={selectedProject} />;
}
