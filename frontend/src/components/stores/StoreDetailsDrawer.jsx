



import React from 'react'
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useState } from 'react';
import { getAxiosCall } from '../../apiHelper/axiosCall';
import { useEffect } from 'react';


function StoreDetailsDrawer({openDrawer,closeDrawer,filmId}) {
    const [filmDetails,setFilmDetails]=useState(null)
     const [value, setValue] = useState('details');
     const handleChange = (event, newValue) => {
setValue(newValue)
  };

  const getFilmDetails=async()=>{
    const data=await getAxiosCall(`/films/${filmId}`)
    if(data.success){
        console.log(data?.responseData?.filmdetails)
setFilmDetails(data?.responseData?.filmdetails)
    }
    else{
        console.log("error fetching data")
    }
  } 

useEffect(()=>{
    // getFilmDetails()
// console.log("the film id is", filmId)
},[])

  return (

   <SwipeableDrawer
            anchor="right"
            open={openDrawer}
            onClose={closeDrawer}       
          >
           <div style={{width:'500px'}} >
            <Tabs className='' value={value} onChange={handleChange}  centered>
        <Tab value="details" label="Details" />
        <Tab value="actors" label="Actors" />
      </Tabs>
      </div>

<div className='w-full' >
   {value=="details" && filmDetails &&  <div style={{fontSize:'16px',padding:'10px'}} className='w-full flex-col items-start gap-10'>
<p > <span> Title </span> : {filmDetails?.title } </p>
<p > <span> Release Year </span> : {filmDetails?.release_year } </p>
<p > <span> Rental rate </span> : {filmDetails?.rental_rate }  </p>
<p > <span> Film Length </span> : {filmDetails?.length } </p>
<p > <span>Rating </span> : {filmDetails?.rating } </p>
     </div> }
     {value=="actors" && filmDetails &&  <div style={{fontSize:'16px',padding:'10px'}} className='w-full flex-col items-start gap-10'>
{filmDetails?.film_actor && filmDetails?.film_actor.map((ele,index)=>(<p key={index}> {ele?.actor?.first_name} {ele?.actor?.last_name} </p>)) }
     </div> }
</div>

      
       </SwipeableDrawer>
  )
}

export default StoreDetailsDrawer