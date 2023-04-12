import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import TicketButton from "../Button";
import TicketModal from "../Modal";

function TicketTable() {
  const [ticketList, setTicketList] = useState([]);
  const [ticketData, setTicketData] = useState(null);
  const [show, setShow] = useState(false);

  const handlePopupUpdate = (ticketData) => {
    setShow(true);
    setTicketData(ticketData);
  };

  const handleCloseEvent = () => {
    setShow(false);
  };

  useEffect(() => {
    getAllTicketData();
  }, []);

  const getAllTicketData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/ticket");
      setTicketList(response?.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTicket = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3000/ticket/${id}`);
      console.log(response.data);
      getAllTicketData();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>Title</th>
            <th>Project</th>
            <th>Reason</th>
            <th>Priority</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {ticketList?.map((item, index) => (
            <tr key={index}>
              <td>{item?.title}</td>
              <td>{item?.project}</td>
              <td>{item?.reason}</td>
              <td>{item?.priority}</td>
              <td>
                <TicketButton
                  btnText="Edit"
                  variantValue="warning"
                  handleEvent={() => handlePopupUpdate(item)}
                />{" "}
                <TicketButton
                  btnText="Delete"
                  variantValue="danger"
                  handleEvent={() => deleteTicket(item?.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <TicketModal
        open={show}
        closebtnEvent={handleCloseEvent}
        singleTicket={ticketData}
        allTickets={getAllTicketData}
      />
    </>
  );
}

export default TicketTable;
