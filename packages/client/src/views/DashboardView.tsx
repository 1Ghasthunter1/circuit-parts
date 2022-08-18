import HeaderButtonTableLayout from "../layouts/HeaderButtonTableLayout";
import ProjectList from "../components/project/ProjectsList";
import { useQuery } from "react-query";
import { fetchProjects } from "../services/projectsServices";
import { Project } from "../types/projectTypes";
import CreateModal from "../components/modals/CreateModal";
import CreateProjectForm from "../components/project/createProject/CreateProjectForm";
import { useState } from "react";
import Button from "../elements/Button";
const DashboardView = () => {
  const { data } = useQuery<Project[]>("projects", fetchProjects);
  const [showModal, setShowModal] = useState<boolean>(false);

  const ButtonStuff = (
    <>
      <Button
        iconName="puzzle-piece"
        txtColor="text-white"
        bgColor="bg-green-600"
        hoverColor="hover:bg-green-700"
        style="ml-2"
        onClick={(_e) => setShowModal(true)}
      >
        New Project
      </Button>

      <CreateModal
        title="New Project"
        showModal={showModal}
        setShowModal={setShowModal}
        form={<CreateProjectForm closeModal={() => setShowModal(false)} />}
      />
    </>
  );

  return (
    <HeaderButtonTableLayout tableName="Projects" buttonContent={ButtonStuff}>
      <ProjectList projects={data} />
    </HeaderButtonTableLayout>
  );
};

export default DashboardView;
