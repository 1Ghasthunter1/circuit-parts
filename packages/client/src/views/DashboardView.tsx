import HeaderButtonTableLayout from "../layouts/HeaderButtonTableLayout";
import ProjectList from "../components/dashboard/ProjectsList";
import { useQuery } from "react-query";
import { fetchProjects } from "../services/projectsServices";
import { Project } from "../types/projectTypes";
import CreateModal from "../components/modals/CreateModal";
import CreateProjectForm from "../components/parts/createPartModal/CreatePartForm";
import { useState } from "react";

const DashboardView = () => {
  const { data } = useQuery<Project[]>("projects", fetchProjects);
  const [showModal, setShowModal] = useState<boolean>(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  return (
    <HeaderButtonTableLayout
      tableName="Projects"
      buttonContent={
        <CreateModal
          showModal={showModal}
          setShowModal={setShowModal}
          form={<CreateProjectForm closeModal={() => setShowModal(false)} />}
        />
      }
    >
      <ProjectList projects={data} />
    </HeaderButtonTableLayout>
  );
};

export default DashboardView;
