import React, { useState } from "react";
import { Button, Modal, Carousel } from "react-bootstrap";

export const Hotel = ({ room }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="row bs">
      <div className="col-md-4">
        <img src={room.imageurl} className="smallimg" />
      </div>
      <div className="col-md-7">
        <h1>{room.name}</h1>
        <b>
          <p>Description : {room.description}</p>
          <p>Price : &#8358;{room.price}</p>
          <p>Location : {room.location}</p>
        </b>

        <div style={{ float: "right" }}>
          <button className="btn" onClick={handleShow}>
            View Detail
          </button>
        </div>
      </div>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{room.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Carousel prevLabel="" nextLabel="">
            <Carousel.Item>
              <img src={room.imageurl} className="smallimg" />
            </Carousel.Item>
          </Carousel>
          <p>Location: {room.location}</p>
          <p>Price: &#8358;{room.price}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
