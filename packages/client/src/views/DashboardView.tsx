import HeaderButtonTableLayout from "../layouts/HeaderButtonTableLayout";
import Button from "../elements/Button";
import ProjectList from "../components/dashboard/ProjectsList";
import { useQuery } from "react-query";
import { fetchProjects } from "../services/projectsServices";
import { Project } from "../types/projectTypes";

const DashboardView = () => {
  const { data } = useQuery<Project[]>("projects", fetchProjects);
  const buttonStuff = (
    <Button
      iconName="puzzle-piece"
      txtColor="text-white"
      bgColor="bg-green-600"
      hoverColor="hover:bg-green-700"
      style="ml-2"
    >
      New Project
    </Button>
  );

  return (
    <HeaderButtonTableLayout tableName="Projects" buttonContent={buttonStuff}>
      <ProjectList projects={data} />
    </HeaderButtonTableLayout>
  );
};

export default DashboardView;
