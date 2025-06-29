

import React from 'react'
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {toggleFilterModal, setFilterData } from '../../redux/filterSlice'

function SavedFilterDrawer({openSavedFilter,closeSavedFilter}) {
  const dispatch=useDispatch()

        const savedFilters=useSelector((state)=>state.filter.savedFilters)
const handleApplySavedFilter=(filter)=>{
    closeSavedFilter()
dispatch(toggleFilterModal(true))
dispatch(setFilterData(filter))
}
    return (
  
   <SwipeableDrawer
            anchor="right"
            open={openSavedFilter}
            onClose={closeSavedFilter}   

          >
        
<div style={{width:'400px',padding:'15px'}} className='w-full' >
  <p>Saved Filters</p>

  <div className='w-full'>
{savedFilters.length>0 && savedFilters.map((item,index)=>(<div key={index} className='saved-filter-box'>
{item?.filmCategory && <p>Film Category: {item?.filmCategory} </p> }
{item?.languageFilter && <p>Language : {item?.languageFilter} </p> }
{item?.releaseYear && <p>Release year : {item?.releaseYear}  </p>  }
{item?.actorFirstName && <p>Actor First Name : {item?.actorFirstName} </p> }

{item?.filmLengthFilter?.filterType && (
  <div>
    <p>Filter Type : {item?.filmLengthFilter?.filterType}</p>
    {item?.filmLengthFilter.filterType === "lesser" && (
      <p>Min Value : {item?.filmLengthFilter?.min_value}</p>
    )}
    {item?.filmLengthFilter.filterType === "greater" && (
      <p>Max Value : {item?.filmLengthFilter?.max_value}</p>
    )}
    {item?.filmLengthFilter.filterType === "range" && (
      <>
        <p>Min Value : {item?.filmLengthFilter?.range?.min_value}</p>
        <p>Max Value : {item?.filmLengthFilter?.range?.max_value}</p>
      </>
    )}


  </div>
)}


  <Button onClick={()=>handleApplySavedFilter(item)}    variant="contained">   Apply Filters</Button>
</div> ))   } 
{savedFilters.length==0 && <div className=''>No Filters Found </div>}

  </div>
</div>

      
       </SwipeableDrawer>
  )
}

export default SavedFilterDrawer