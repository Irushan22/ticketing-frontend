import React, { useState } from "react";
import { TicketButton, TicketModal, TicketTable } from "../../components";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Dashboard() {
  const [show, setShow] = useState(false);

  const handlePopup = () => {
    setShow(true);
  };

  const handleCloseEvent = () => {
    setShow(false);
  };

  return (
    <>
      <Container>
        <Row className="mt-5">
          <Col>
            {" "}
            <TicketButton
              btnText="Add Ticket"
              variantValue="primary"
              handleEvent={handlePopup}
            />
            <TicketModal open={show} closebtnEvent={handleCloseEvent} />
            <TicketTable />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Dashboard;
