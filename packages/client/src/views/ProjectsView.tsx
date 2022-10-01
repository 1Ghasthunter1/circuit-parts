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
import CreateProjectModal from "~/components/projects/CreateProjectModal";

const ProjectsView = () => {
  const projectsQuery = useQuery<Project[]>("projects", fetchProjects);
  const [showModal, setShowModal] = useState<boolean>(false);
  const userRole = userState.user?.role;

  const topRightStuff = (
    <>
      {(userRole === "admin" || userRole === "owner") && (
        <>
          <Button
            style="primary"
            iconName="folder-plus"
            color="green"
            onClick={() => setShowModal(true)}
          >
            New Project
          </Button>

          <CreateProjectModal
            modalVisibility={showModal}
            setModalVisibility={setShowModal}
            queriesToInvalidate={[projectsQuery]}
          />
        </>
      )}
    </>
  );

  const topLeftStuff = (
    <div className="flex-auto">
      <h1 className="text-2xl font-semibold text-gray-900">Projects</h1>
    </div>
  );

  const { data, isLoading } = projectsQuery;

  return (
    <TopLeftRightAndMiddle
      topLeftContent={topLeftStuff}
      topRightContent={topRightStuff}
    >
      {isLoading ? (
        <ProjectsSkeleton rowCount={4} />
      ) : (
        <ProjectList projects={data} />
      )}
    </TopLeftRightAndMiddle>
  );
};

export default ProjectsView;
