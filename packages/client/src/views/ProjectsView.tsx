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
import { userState } from "~/state/state";
import ProjectsSkeleton from "~/components/skeletons/ProjectsSkeleton";
const DashboardView = () => {
  const { data, isLoading } = useQuery<Project[]>("projects", fetchProjects);
  const [showModal, setShowModal] = useState<boolean>(false);
  const userRole = userState.user?.role;

  const topRightStuff = (
    <>
      {(userRole === "admin" || userRole === "owner") && (
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
      )}
    </>
  );

  const topLeftStuff = <div className="text-4xl font-bold ">All Projects</div>;

  return (
    <TopLeftRightAndMiddle
      topLeftContent={topLeftStuff}
      topRightContent={topRightStuff}
    >
      {isLoading ? <ProjectsSkeleton rowCount={4} /> : <ProjectList projects={data} />}
    </TopLeftRightAndMiddle>
  );
};

export default DashboardView;
