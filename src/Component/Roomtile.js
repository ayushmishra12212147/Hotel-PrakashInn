import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Carousel from 'react-bootstrap/Carousel';
import { Link } from 'react-router-dom';


function Roomtile({ room, fromdate1, todate1 }) {

    const [show, setShow] = useState(false);
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <div className='row bs'>

            <div className="col md-4">
                <img src={room.images[0]} alt={room.name} className='smallimg' />
            </div>
            <div className="col-md-7">
                <h1>{room.name}</h1>
                <p></p>
                <p>Type: {room.type}</p>
                <p>Charges:Rs. {room.pricePerNight}/Night</p>
                <p>Capacity: {room.capacity}</p>
                <p>Facilities </p>
                {room.amenities.map((a, index) => {
                    return <span key={a}> {index + 1}:{a}</span>
                })}

                <div style={{ float: 'right' }}>

                    {
                        ((fromdate1) && (todate1)) &&
                        (
                            <Link to={`/room/${room._id}/${fromdate1}/${todate1}`}>
                    <button className='btn btn-primary m-2'>Book Now</button>
                    </Link>

                        )
                    }
                    
                    <button className='btn btn-primary' onClick={handleShow}>View Details</button>
                </div>
            </div>


            <Modal show={show} onHide={handleClose} size='lg'>
                <Modal.Header>
                    <Modal.Title>{room.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Carousel>
                        {
                            room.images.map((image, index) => {
                                return <Carousel.Item key={index}>
                                    <img src={image} alt="img" className="d-block w-100 bigimg" />
                                </Carousel.Item>
                            })
                        }

                    </Carousel>



                    {room.description}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>

                </Modal.Footer>
            </Modal>




        </div>
    )
}

export default Roomtile