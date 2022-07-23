import React from "react";
import { WarningTwoTone } from "@ant-design/icons";

const StripeSuccess = () => {
  return (
    <div
      className="d-flex justify-content-center fw-bold"
      style={{ height: "90vh" }}
    >
      <div className="d-flex align-items-center">
        <WarningTwoTone style={{ fontSize: "50px" }} />
      </div>
    </div>
  );
};

export default StripeSuccess;
