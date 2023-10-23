


import React from "react";

const FormContainer = ({ children }) => {
  return (
    <div className="max-w-400 mx-auto mt-5">
      <div className="card p-5">
        {children}
      </div>
    </div>
  );
};

export default FormContainer;




