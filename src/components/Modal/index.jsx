import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

function TicketModal({ open, closebtnEvent, singleTicket, allTickets }) {
  const [title, setTitle] = useState("");
  const [project, setProject] = useState("");
  const [reason, setReason] = useState("");
  const [priority, setPriority] = useState(0);

  useEffect(() => {
    if (singleTicket) {
      setTitle(singleTicket?.title);
      setProject(singleTicket?.project);
      setPriority(singleTicket?.priority);
      setReason(singleTicket?.reason);
    }
  }, [singleTicket]);

  const handleClosePopup = () => {
    closebtnEvent();
  };

  const saveNewTicket = async () => {
    try {
      const data = {
        title,
        project,
        reason,
        priority,
      };
      const response = await axios.post(`http://localhost:3000/ticket`, data);
    } catch (error) {
      console.error(error);
    }
  };

  const updateTicket = async (id) => {
    try {
      const data = {
        title,
        project,
        reason,
        priority,
      };
      const response = await axios.patch(
        `http://localhost:3000/ticket/${id}`,
        data
      );
      if (response) {
        closebtnEvent();
        await allTickets();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSave = async () => {
    if (singleTicket?.id) {
      updateTicket(singleTicket?.id);
    } else {
      saveNewTicket();
    }
  };

  return (
    <Modal show={open} onHide={handleClosePopup}>
      <Modal.Header closeButton>
        <Modal.Title>Add New</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="title"
              autoFocus
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
            <Form.Label>Project</Form.Label>
            <Form.Control
              type="text"
              placeholder="project"
              autoFocus
              onChange={(e) => setProject(e.target.value)}
              value={project}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Reason</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              onChange={(e) => setReason(e.target.value)}
              value={reason}
            />
          </Form.Group>
          <Form.Select
            aria-label="selectexample1"
            onChange={(e) => setPriority(e.target.value)}
            value={priority}
          >
            <option value=""></option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </Form.Select>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClosePopup}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default TicketModal;
