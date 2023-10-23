// import { Spinner } from "react-bootstrap";

import React from "react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="w-6 h-6 border-2 border-black rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;
