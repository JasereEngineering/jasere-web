import { CSSProperties } from "react";
import PacmanLoader from "react-spinners/PacmanLoader";

const Loader = () => {
  const override: CSSProperties = {
    borderColor: "#FFFFFF",
    background: "transparent",
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <PacmanLoader cssOverride={override} size={30} color="#FFFFFF" />
    </div>
  );
};

export default Loader;
