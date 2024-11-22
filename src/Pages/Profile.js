import React, { useEffect, useState } from 'react'
import { Tabs } from 'antd';
import { TabsProps } from 'antd';
import axios from 'axios';
import Loader from '../Component/Loader';
import Error from '../Component/Error';

const { TabPane } = Tabs;
function Profile() {

    const user = JSON.parse(localStorage.getItem('currentUser'))
    useEffect(() => {
        if (!user) {
            window.location.href = "/login"
        }
    })

    return (
        <div className='ml-3 mt-3'>
            <Tabs defaultActiveKey='1' >
                <TabPane tab='Profile' key='1'>
                    <h1>My Profile</h1>
                    <h1>Name: {user.data.name}</h1>
                    <h1>Email: {user.data.email}</h1>
                    <h1>Is Amdin: {user.data.isAdmin ? 'Yes' : ('No')}</h1>
                    
                </TabPane>
                <TabPane tab='Bookings' key='2'>
                    <MyBookings />

                </TabPane>





            </Tabs>

        </div>
    )
}

export default Profile;





export function MyBookings() {
    const user = JSON.parse(localStorage.getItem('currentUser'))
    const[bookings,setbookings]=useState([])
    const [loading, setLoading] = useState(false);  // useState to manage loading state
    const [error, setError] = useState(false);
    
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            const rooms = await axios.post('http://localhost:5000/api/booking/getbookingsbyuserid', { userid: user.data._id })
            console.log(rooms.data)
            setbookings(rooms.data)
            setLoading(false)
        }


        fetchData();
    },[])


    async function cancelbooking(bookingid,roomid){
        try {
            console.log(roomid)
            setLoading(true)
            
            const result= await axios.post('http://localhost:5000/api/booking/cancel',{bookingid,roomid})
            setLoading(false)
            alert('Booking Cancelled Successfully')
            // window.location.reload();
            console.log(result)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }

    }
    return (
        <div>
            <div className="row">
                <div className="col-md-7 ">
                    {loading && (<loading/>)}
                    {
                        bookings && (bookings.map((booking,index)=>{
                            return(<div className='bs' key={index} style={{padding:"35px",height:"370px"}}>
                                <h1>Room :{booking.room}</h1>
                                <p>BookingID:{booking._id}</p>
                                <p>Transaction Id:{booking.transactionid}</p>
                                <p><b>Check In</b>:{booking.fromdate}</p>
                                <p><b>Check Out</b>:{booking.todate}</p>
                                <p><b>Total Amount</b>: {booking.totalamount}</p>
                                <p>Status:{booking.status=== 'booked' ?'Confirmed':'Cancelled'}</p>
                                
                                {booking.status!=='Cancelled' &&(
                                <div style={{float:"right"}} className='text-right'>
                                    <button className="btn btn-primary " onClick={()=>{cancelbooking(booking._id,booking._id)}}>Cancel Now</button>
                                </div>
                        )}
                                

                            </div>)
                        }))
                    }

                </div>
            </div>
        </div>
    )
}
