import React, { useState, useEffect } from 'react';  // Importing useState and useEffect
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Loader from '../Component/Loader';
import Error from '../Component/Error';
import moment from 'moment';
import Success from '../Component/Success';


function BookingPage({ match }) {


  const user = JSON.parse(localStorage.getItem('currentUser'))
    useEffect(() => {
        if (!user) {
            window.location.href = "/login"
        }
    })
  const { roomid,fromdate,todate } = useParams(); // Access roomid from the URL
  const d1=(moment(todate ,'DD-MM-YYYY'))
  const d2=(moment(fromdate , 'DD-MM-YYYY'))
  const totaldays=moment.duration(d1.diff(d2)).asDays()+1;
  

  const [room, setrooms] = useState([]);
  const [loading, setLoading] = useState(true);  // useState to manage loading state
  const [error, setError] = useState(false);
  const [totalamount, setTotal]=useState(0);

  useEffect(() => {


    
    // Define an async function to fetch data
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.post('http://localhost:5000/api/rooms/getroombyid', { roomid: roomid });
        console.log(response);
        setrooms(response.data);
        setLoading(false);
        setTotal(response.data.price*totaldays);
      } catch (error) {
        setError(true);
        console.log(error);  // Log the error
        setLoading(false);
      }
    };

    fetchData();  // Call the fetch function when the component mounts

  }, []);

async function bookroom(){
  
  const details ={
    room,
    userid:user.data._id,
    fromdate,
    todate,
    totalamount:totaldays* room.pricePerNight,
    totaldays,

  }
  try{
    setLoading(true)
    const response = await axios.post('http://localhost:5000/api/booking/bookroom',details)
    alert('Room Booked Successfully, You can check that on yor Bookings')
    window.location.href='/home';

    setLoading(false);

  }catch (error){

  }
}

  return (
    <div className='m-5'>
      {
        (loading) ? (<Loader/>) : room ?  (
          <div className="row justify-content-center mt-5 bs">
            <div className="col-md-5">
              <h1 style={{textAlign:"center"}}>{room.name}</h1>
              <img src={room.images[0]} className='bigimg' />
            </div>
            <div className="col-md-5" style={{textAlign:"center",marginLeft:"70px"}}>


              <h1>Booking Details</h1>
              <b>
              <hr  />
              </b>
              
              <div style={{textAlign:"right"}}>
                <b>
                  <p>Name: {user.data.name}</p>
                  <p>From Date: {fromdate}</p>
                  <p>To Date: {todate}</p>
                  <p>Capacity : {room.capacity}</p>
                </b>
              </div>
              <div style={{textAlign:"right"}}>
                <b>
                  <h1>Amount</h1>
                  <hr />
                  <div>
                  <p>Total days: {totaldays}</p>
                  <p>Rent per day: {room.pricePerNight}</p>
                  <p>Total Amount: {totaldays*room.pricePerNight} /-</p>
                  </div>
                </b>

              </div>

              <div style={{float:"right"}}>
                <button className='btn btn-primary' onClick={bookroom}>Pay Now</button>
              </div>
            </div>
          </div>) : (<Error/>) }





       

    </div>
  )
}

export default BookingPage