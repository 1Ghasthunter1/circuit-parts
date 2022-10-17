import { useState } from "react";
// import ReactDOM from "react-dom";
// import Modal from "react-modal";

import Button from "../../elements/Button";
import { UnpopulatedProject, Project } from "../../types/projectTypes";
import { UseQueryResult } from "react-query";
import CreatePartModal from "../parts/CreatePartModal";
import { Parent } from "~/types/universalTypes";
import CreateAssemblyModal from "../assemblies/CreateAssemblyModal";

// Modal.setAppElement("#root");

interface props {
  project: UnpopulatedProject | Project;
  parent: Parent;
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
      <CreatePartModal
        modalVisibility={partModalVis}
        setModalVisibility={setPartModalVis}
        project={project}
        queriesToInvalidate={queriesToInvalidate}
        parent={parent}
      />
      <CreateAssemblyModal
        modalVisibility={assyModalVis}
        setModalVisibility={setAssyModalVis}
        project={project}
        queriesToInvalidate={queriesToInvalidate}
        parent={parent}
      />
    </div>
  );
};

export default NewComponentButtons;
