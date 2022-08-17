import HeaderButtonTableLayout from "../layouts/HeaderButtonTableLayout";
import ProjectList from "../components/dashboard/ProjectsList";
import { useQuery } from "react-query";
import { fetchProjects } from "../services/projectsServices";
import { Project } from "../types/projectTypes";
import CreateProjectModal from "../components/dashboard/createProject/CreateProjectModal";

const DashboardView = () => {
  const { data } = useQuery<Project[]>("projects", fetchProjects);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  return (
    <HeaderButtonTableLayout
      tableName="Projects"
      buttonContent={<CreateProjectModal />}
    >
      <ProjectList projects={data} />
    </HeaderButtonTableLayout>
  );
};

export default DashboardView;
