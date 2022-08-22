import { useState } from "react";
// import ReactDOM from "react-dom";
// import Modal from "react-modal";

import Button from "../../elements/Button";
import CreateModal from "../../components/modals/CreateModal";
import CreatePartForm from "../parts/CreatePartForm";
import CreateAssemblyForm from "../assemblies/CreateAssemblyForm";
import { UnpopulatedProject, Project } from "../../types/projectTypes";
import { UseQueryResult } from "react-query";
import { UnpopulatedAssembly, Assembly } from "../../types/assemblyTypes";

// Modal.setAppElement("#root");

interface props {
  project: UnpopulatedProject | Project;
  parent?: UnpopulatedProject | Project | UnpopulatedAssembly | Assembly;
  queriesToInvalidate: UseQueryResult[];
}

const NewComponentButtons = ({
  project,
  parent,
  queriesToInvalidate,
}: props) => {
  const [partModalVis, setPartModalVis] = useState<boolean>(false);
  const [assyModalVis, setAssyModalVis] = useState<boolean>(false);
  return (
    <div>
      <Button
        iconName="puzzle-piece"
        txtColor="text-white"
        bgColor="bg-green-600"
        hoverColor="hover:bg-green-700"
        style="ml-2"
        onClick={() => setPartModalVis(true)}
      >
        New Part
      </Button>
      <CreateModal
        title="New Part"
        showModal={partModalVis}
        setShowModal={setPartModalVis}
        form={
          <CreatePartForm
            queriesToInvalidate={queriesToInvalidate}
            project={project}
            defaultParentId={parent?.type === "assembly" ? parent.id : ""}
            closeModal={() => setPartModalVis(false)}
          />
        }
      />

      <Button
        iconName="puzzle-piece"
        txtColor="text-white"
        bgColor="bg-green-600"
        hoverColor="hover:bg-green-700"
        style="ml-2"
        onClick={() => setAssyModalVis(true)}
      >
        New Assembly
      </Button>
      <CreateModal
        title="New Assembly"
        showModal={assyModalVis}
        setShowModal={setAssyModalVis}
        form={
          <CreateAssemblyForm
            queriesToInvalidate={queriesToInvalidate}
            project={project}
            defaultParentId={
              parent?.type
                ? parent.type === "project"
                  ? `PROJECT:${parent.id}`
                  : parent.id
                : ""
            }
            closeModal={() => setAssyModalVis(false)}
          />
        }
      />
    </div>
  );
};

export default NewComponentButtons;
