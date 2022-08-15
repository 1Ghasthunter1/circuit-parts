import HeaderButtonTableLayout from "../layouts/HeaderButtonTableLayout";
import Button from "../elements/Button";
import ProjectList from "../components/dashboard/ProjectsList";
const DashboardView = () => {
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
      <ProjectList />
    </HeaderButtonTableLayout>
  );
};

export default DashboardView;
