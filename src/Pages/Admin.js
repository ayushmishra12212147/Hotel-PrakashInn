import React, { useState, useEffect } from 'react'
import { Tabs } from 'antd';
import { TabsProps } from 'antd';
import axios from 'axios';
import Loader from '../Component/Loader';
import Error from '../Component/Error';

const { TabPane } = Tabs;
// if(!JSON.parse(localStorage.getItem("currentUser")).isadmin){
//     window.location.href='/home'
// }



function Admin() {








    return (
        <div className='mt-3 ml-3 mr-3 bs'>
            <h2>Admin Pannel</h2>

            <Tabs defaultActiveKey='1' >
                <TabPane tab='Bookings' key='1'>
                    <Bookings />

                </TabPane>
                <TabPane tab='Add Rooms' key='2'>
                    <AddRoom/>


                </TabPane>
                <TabPane tab='User' key='3'>
                    <User/>


                </TabPane>





            </Tabs>
        </div>
    )
}

export default Admin




export function Bookings() {
    const [rooms, setrooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        // Define an async function to fetch data
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.get('http://localhost:5000/api/booking/book');
                console.log(response.data);  // Log the data
                setrooms(response.data);
                setLoading(false);

            } catch (error) {
                setError(true);
                console.log(error);  // Log the error
                setLoading(false);
            }
        }
        fetchData();
    }, []
    )

    return (
        <div className="row">
            <div className="col-md-10">
                {(loading) && (<Loader />)}
                <table className='table table-bordered table-dark'>
                    <thead className='bs thead-dark'>
                        <tr><th>
                            Booking Id</th>

                            <th>Room</th>
                            <th>From</th>
                            <th>To</th>
                            <th>Status</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            rooms.length && (
                                rooms.map((data) => {
                                    return (
                                        <>
                                        <tr>
                                        <td>{data._id}</td>
                                                <td >{data.room}</td>
                                                <td >{data.fromdate}</td>
                                                <td >{data.todate}</td>
                                                <td>{data.status}</td>

                                        </tr>
                                             

                                            </>
                                            
                                            )
                        }))
                    }
                    
                
                
    

                                        </tbody >
</table>






            </div>
        </div>
    )
}



export function User(){
    const [user, setuser] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        // Define an async function to fetch data
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.post('http://localhost:5000/api/user/getall');
                console.log(response.data);  // Log the data
                setuser(response.data);
                setLoading(false);

            } catch (error) {
                setError(true);
                console.log(error);  // Log the error
                setLoading(false);
            }
        }
        fetchData();
    }, []
    )

    return (
        <div className="row">
            <div className="col-md-10">
                {(loading) && (<Loader />)}
                <table className='table table-bordered table-dark'>
                    {
                        console.log(user)
                    }
                    <thead className='bs thead-dark'>
                        <tr><th>
                             Id</th>

                            <th>Name</th>
                            <th>Email</th>
                           

                        </tr>
                    </thead>
                    <tbody>
                        {
                            user.length && (
                                user.map((data) => {
                                    return (
                                        <>
                                        <tr>
                                                <td >{data._id}</td>
                                                <td >{data.name}</td>
                                                <td >{data.email}</td>
                                                <td>{data.status}</td>

                                        </tr>
                                             

                                            </>
                                            
                                            )
                        }))
                    }
                    
                                        </tbody >
</table>
            </div>
        </div>
    )

}




export function AddRoom(){
    const [name2 ,setName2]=useState();
const [rpd ,setrpd]=useState();
const [maxcount ,max]=useState();
const [dis ,setdis]=useState();
const [facilities ,setfacilities]=useState();
const [type ,settype]=useState();
const [img1 ,setimg1]=useState();
const [img2 ,setimg2]=useState();
const [img3 ,setimg3]=useState();


async function addroom(){
    const room = {
        name:name2 ,
        ratePerNight:rpd ,
        maxcount:maxcount ,
        discription:dis ,
        facilities:facilities ,
        type:type ,
        imgurl:[img1,img2,img3] ,
       

    }
    console.log(room)
    try {
        const response = await axios.post('http://localhost:5000/api/rooms/add', room).data
        console.log(response)
        
    } catch (error) {
        console.error(error);
        
    }
}
    return(
        <div className="row">
            <div className="col-md-5">
                <input type="text" className='form-control' onChange={(e)=>{setName2(e.target.value)}} placeholder='Name'/>
                <input type="text" className='form-control' onChange={(e)=>{setrpd(e.target.value)}} placeholder='rent Per Day'/>
                <input type="text" className='form-control' onChange={(e)=>{max(e.target.value)}} placeholder='max Count'/>
                <input type="text" className='form-control' onChange={(e)=>{setdis(e.target.value)}} placeholder='discription'/>
                <input type="text" className='form-control' onChange={(e)=>{setfacilities(e.target.value)}} placeholder='facilities'/>

            </div> 
            <div className="col-md className='form-control'-5">
                <input type="text" className='form-control'  onChange={(e)=>{settype(e.target.value)}} placeholder='type'/>
                <input type="text" className='form-control'  onChange={(e)=>{setimg1(e.target.value)}} placeholder='Image url1'/>
                <input type="text" className='form-control'  onChange={(e)=>{setimg2(e.target.value)}} placeholder='Image url2'/>
                <input type="text" className='form-control'  onChange={(e)=>{setimg3(e.target.value)}} placeholder='Image url3'/>
                <div className="text-right">
                    <button className='btn btn-primary' onClick={addroom}>Add Room</button>
                </div>
                
            </div>

        </div>
    )
}