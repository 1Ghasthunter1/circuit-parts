//General import format: modules/types, services, components
import { useState } from "react";
import { useQuery } from "react-query";
import { Project } from "../types/projectTypes";

import { fetchProjects } from "../services/projectsServices";

import Button from "../elements/Button";
import ProjectList from "../components/projects/ProjectsList";
import CreateModal from "../components/modals/CreateModal";
import CreateProjectForm from "../components/projects/createProject/CreateProjectForm";
import TopLeftRightAndMiddle from "../layouts/TopLeftRightAndMiddle";

const DashboardView = () => {
  const { data } = useQuery<Project[]>("projects", fetchProjects);
  const [showModal, setShowModal] = useState<boolean>(false);

  const topRightStuff = (
    <>
      <Button
        iconName="folder-plus"
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

  const topLeftStuff = <h1 className="text-4xl font-bold ">All Projects</h1>;

  return (
    <TopLeftRightAndMiddle
      topLeftContent={topLeftStuff}
      topRightContent={topRightStuff}
    >
      <ProjectList projects={data} />
    </TopLeftRightAndMiddle>
  );
};

export default DashboardView;
