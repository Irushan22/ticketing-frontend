import React from "react";
import Button from "react-bootstrap/Button";

function TicketButton({ btnText, variantValue, handleEvent }) {
  const handleOnClick = () => {
    handleEvent();
  };

  return (
    <Button variant={variantValue} onClick={handleOnClick}>
      {btnText}
    </Button>
  );
}

export default TicketButton;
