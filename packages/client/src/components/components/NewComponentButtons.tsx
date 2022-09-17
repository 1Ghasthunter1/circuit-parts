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
    <div className="space-x-2">
      <Button
        iconName="cube"
        color="green"
        style="primary"
        onClick={() => setPartModalVis(true)}
      >
        New Part
      </Button>
      <Button
        iconName="cubes"
        style="primary"
        color="green"
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
    </div>
  );
};

export default NewComponentButtons;
