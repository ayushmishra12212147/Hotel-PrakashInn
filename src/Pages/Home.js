/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';  // Importing useState and useEffect
import axios from 'axios';
import Roomtile from '../Component/Roomtile';
import Loader from '../Component/Loader';
import Error from '../Component/Error';
import { DatePicker, Space } from 'antd';


import moment from 'moment';


const { RangePicker } = DatePicker;
function Home() {

  // eslint-disable-next-line react-hooks/exhaustive-deps

  const [rooms, setrooms] = useState([]);
  const [loading, setLoading] = useState(true);  // useState to manage loading state
  const [error, setError] = useState(null);
  const [fromdate1, setFromdate] = useState();
  const [todate1, setTodate] = useState();
  const [duplicaterooms,
    setduplicaterooms] = useState([]);
  const [searchkey,setSearchkey]=useState();
  const [type,settype]=useState('all');


  useEffect(() => {
    // Define an async function to fetch data
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/api/rooms/getallrooms');
        console.log(response.data);  // Log the data
        setrooms(response.data);
        setduplicaterooms(response.data)
        setLoading(false);

      } catch (error) {
        setError(true);
        console.log(error);  // Log the error
        setLoading(false);
      }
    };

    fetchData();  // Call the fetch function when the component mounts

  }, []);
  function filterbydate(dates) {
    console.log(moment(dates[0].$d).format('DD-MM-YYYY'))
    setFromdate(moment(dates[0].$d).format('DD-MM-YYYY'))
    setTodate(moment(dates[1].$d).format('DD-MM-YYYY'))


    var temp = []
    var avail = false;
    for (const room of duplicaterooms) {
      if (room.currentbookings.length > 0) {
        for (const booking of room.currentbookings) {
          if (!moment(moment(dates[0].$d).format('DD-MM-YYYY')).isBetween(booking.fromdate1, booking.todate1) &&
            (!moment(moment(dates[1].$d).format('DD-MM-YYYY')).isBetween(booking.fromdate1, booking.todate1))
          ) {


            if (moment(dates[0].$d).format('DD-MM-YYYY') !== booking.fromdate1 &&
              moment(dates[0].$d).format('DD-MM-YYYY') !== booking.todate1 &&
              moment(dates[1].$d).format('DD-MM-YYYY') !== booking.fromdate1 &&
              moment(dates[1].$d).format('DD-MM-YYYY') !== booking.todate1

            ) {
              avail = true;
            }

          }

        }

      }

      if (avail == true || room.currentbookings.length == 0) {
        temp.push(room)

      }
      setrooms(temp)




    }

  }

  function filterbysearch(){
    var temp =duplicaterooms.filter(rooms=>rooms.name.toLowerCase().includes(searchkey.toLowerCase()))
    setrooms(temp)
  }
  function filterbytype(e){
    settype(e)
    if(e!=='all'){
      var temp =duplicaterooms.filter(rooms=>rooms.type.toLowerCase()==(e.toLowerCase()))
    setrooms(temp)
    }
    else{
      setrooms(duplicaterooms)
    }
  }
  return (
    <div className='container'>


      <div className="row mt-5 bs" style={{height:"60px"}}>
        <div className="col-md-3">
          <RangePicker format='DD-MM-YYYY' onChange={filterbydate} />
        </div>
     
      <div className="col-md-5">
        <input type="text" className='form-control' placeholder='Search Rooms'
        value={searchkey}
        onChange={(e)=>{setSearchkey(e.target.value)}} onKeyUp={filterbysearch}
        />
          
      </div>
      <div className="col-md-3 " > 
      <select  className='form-control' value={type} onChange={(e)=>{filterbytype(e.target.value)}}>
        <option value="all">All</option>
        <option value="Delux">Delux</option>
        <option value="Non-Delux">Non-Delux</option>
      </select>
      </div>
      </div>






      <div className="row justify-content-center mt-5">
        {
          (loading) ? (<Loader />) :
           (
              rooms.map(room => {
                return <div className="col-md-9 mt-3">
                  <Roomtile room={room} fromdate1={fromdate1}
                    todate1={todate1} />
                </div>

              })


            ) 
        }


      </div>

    </div>
  )
}

export default Home