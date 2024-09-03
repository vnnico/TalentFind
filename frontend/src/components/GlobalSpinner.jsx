import { Spinner } from "@nextui-org/react";

const GlobalSpinner = () => {
  return (
    <div className="flex flex-col item-center justify-content m-auto min-h-screen">
      <Spinner label="Loading..." color="secondary" className="m-auto" />
    </div>
  );
};

export default GlobalSpinner;
