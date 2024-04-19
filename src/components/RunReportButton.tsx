import React from "react";
import MaterialUIButton from "@mui/material/Button";

interface RunReportButtonProps {
  disabled: boolean;
  onClick: () => void;
}

const RunReportButton: React.FC<RunReportButtonProps> = ({
  disabled,
  onClick,
}) => (
  <MaterialUIButton variant="contained" disabled={disabled} onClick={onClick}>
    Run Report
  </MaterialUIButton>
);

export default RunReportButton;
