import { ProjectView } from 'src/sections/_projects/view/project-view';
import { projectData } from 'src/data/projects/_projects';

export default function Page({ params }: { params: { projectId: string } }) {
  const project = projectData.find((project) => project.id === params.projectId);

  // Check if the project is undefined and handle accordingly
  if (!project) {
    return <div>Project not found</div>; // or some other fallback UI
  }

  return <ProjectView project={project} />;
}
