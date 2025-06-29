

import Modal from '@mui/material/Modal';
import React, { useState } from 'react'
import Box from '@mui/material/Box';
import { useDispatch, useSelector } from 'react-redux';

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import {Button} from '@mui/material';
import { savedFilterData, setFilterData, toggleFilterModal } from '../../redux/filterSlice';

function MovieFilterModal() {
        const dispatch=useDispatch()
      const filterVisibility=useSelector((state)=>state.filter.isOpenFilter)
      const languagelist=useSelector((state)=>state.filter.languageList)
      const categorylist=useSelector((state)=>state.filter.categoryList)

      const currentFilters=useSelector((state)=>state.filter.filterData)

    //   console.log("the value is",useSelector((state)=>state.filter.categoryList))
const closeFilter=()=>dispatch(toggleFilterModal(false))  


    const savedFilters=useSelector((state)=>state.filter.savedFilters)


const [releaseYear,setReleaseYear]=useState(currentFilters?.releaseYear || '')
const [filmLengthFilter,setFilmLengthFilter]=useState( {
    filterType:currentFilters?.filmLengthFilter?.filterType || null,
    max_value:currentFilters?.filmLengthFilter?.max_value || '',
    min_value:currentFilters?.filmLengthFilter?.min_value ||  '',
    range:{
        max_value:currentFilters?.filmLengthFilter?.range?.max_value || '',
        min_value:currentFilters?.filmLengthFilter?.range?.min_value || ''
    }
})
const [filmCategory,setFilmCategory]=useState(currentFilters?.filmCategory || null)
const [languageFilter,setLanguageFilter]=useState(currentFilters?.languageFilter || null)
const [actorFirstName,setActorFirstName]=useState(currentFilters?.actorFirstName || '')
 

        const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
color:'black',
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  // boxShadow: 24,
  p: 4,
};

const getFilteredData=async()=>{
    const currentFilterData={}
if(filmCategory) currentFilterData.filmCategory=filmCategory
if(languageFilter) currentFilterData.languageFilter=languageFilter
if(actorFirstName) currentFilterData.actorFirstName=actorFirstName
if(releaseYear) currentFilterData.releaseYear=releaseYear
if(filmLengthFilter.filterType) currentFilterData.filmLengthFilter=filmLengthFilter

dispatch(setFilterData(currentFilterData))
dispatch(toggleFilterModal(false))

}


const handleSaveFilter=()=>{
        const currentFilterData={}
if(filmCategory) currentFilterData.filmCategory=filmCategory
if(languageFilter) currentFilterData.languageFilter=languageFilter
if(actorFirstName) currentFilterData.actorFirstName=actorFirstName
if(releaseYear) currentFilterData.releaseYear=releaseYear
if(filmLengthFilter.filterType) currentFilterData.filmLengthFilter=filmLengthFilter

const isDuplicate = savedFilters.some(
  (item) => JSON.stringify(item) === JSON.stringify(currentFilterData)
);
if(isDuplicate) return

   if(Object.keys(currentFilterData).length !== 0){
    dispatch(savedFilterData(currentFilterData))
   }
    // dispatch(savedFilterData(currentFilterData))

}


const handleClearFilter=()=>{
  setReleaseYear('')
  setFilmLengthFilter({
    filterType:null,
    max_value:'',
    min_value:'',
    range:{
      max_value:'',
      min_value:''
    }
  })
  setFilmCategory(null)
  setLanguageFilter(null)
  setActorFirstName('')
  // dispatch(savedFilterData(null))
  // dispatch(toggleFilterModal(false))
}



  return (
      <Modal
        open={filterVisibility}
        onClose={closeFilter}
        // onClose={null}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
<Box sx={style} className="space-y-6" >

{/* ---release year----= */}
<div style={{color:'black',margin:'15px 0'}} className='flex gap-10'>
 <p>Release Year :</p>  <TextField type='number'  id="outlined-basic" label="Release Year" value={releaseYear} onChange={(e)=>setReleaseYear(e.target.value)}  variant="outlined" />
</div>


{/* ---actor first name----= */}
<div style={{color:'black',margin:'15px 0'}} className='flex gap-10'>
 <p>Actor Name :</p>  <TextField type='text'  id="outlined-basic" label="First Name" value={actorFirstName} onChange={(e)=>setActorFirstName(e.target.value)}  variant="outlined" />
</div>


{/* ----film length----- */}
<div style={{margin:'15px 0'}} className=''>
<FormControl className=''>
      <FormLabel sx={{color:'black'}} id="demo-row-radio-buttons-group-label">Film Length</FormLabel>
      <RadioGroup
              row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="controlled-radio-buttons-group"
        value={filmLengthFilter.filterType}
onChange={(e) => setFilmLengthFilter({ 
  ...filmLengthFilter, 
  filterType: e.target.value 
})}      >
        <FormControlLabel value="lesser" control={<Radio />} label="Less than" />
        <FormControlLabel value="greater" control={<Radio />} label="Greater Than" />
        <FormControlLabel value="range" control={<Radio />} label="In Range" />
      </RadioGroup>
    </FormControl>
</div>
 <div className='w-full flex justify-center items-center gap-6'>
   {filmLengthFilter?.filterType=="lesser" &&   <TextField type='number'  id="outlined-basic" label="Min Range" value={filmLengthFilter?.min_value} onChange={(e) => setFilmLengthFilter({ 
  ...filmLengthFilter, 
  min_value: e.target.value ,max_value:'',range:{
    max_value:'',min_value:''
  }
})}  variant="outlined" /> }
   {filmLengthFilter?.filterType=="greater" &&   <TextField type='number'  id="outlined-basic" label="Max Range" variant="outlined"  value={filmLengthFilter?.max_value} onChange={(e) => setFilmLengthFilter({ 
  ...filmLengthFilter, 
  max_value: e.target.value ,min_value:'',range:{
    max_value:'',min_value:''
  }
})} /> }
 {filmLengthFilter?.filterType=="range" && <>
  <TextField type='number'  id="outlined-basic" label="Min Range" variant="outlined" value={filmLengthFilter?.range?.min_value} onChange={(e) =>  
  setFilmLengthFilter({ 
    ...filmLengthFilter, 
    range: {
      ...filmLengthFilter.range, 
      min_value: e.target.value }
})} 
/>
  <TextField type='number' id="outlined-basic" label="Max Range" variant="outlined" value={filmLengthFilter?.range?.max_value}   onChange={(e) => 
  setFilmLengthFilter({ 
    ...filmLengthFilter, 
    range: {
      ...filmLengthFilter.range,
      max_value: e.target.value
    }
})}   />
  </>}
</div>
{/* <button onClick={()=>console.log(filmLengthFilter)} type='buttpn'>jgsdjh</button> */}

{/* ----film category--- */}
<div style={{margin:'15px 0'}} className='w-full flex gap-10'>
  <p>Fim Category : </p>
  <div  className=' flex justify-start items-center gap-10'>
   <Autocomplete
      disablePortal
      value={filmCategory}
      options={categorylist}
      onChange={(e,value)=>setFilmCategory(value)}
            sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Select Category" />}
    />
</div>
</div>


{/* ----film language--- */}
<div style={{margin:'15px 0'}} className='w-full flex gap-10'>
  <p>Fim Language : </p> 
  <div className=' flex justify-start items-center gap-10'>
   <Autocomplete
      disablePortal
      value={languageFilter}
      options={languagelist}
      sx={{ width: 300 }}
      onChange={(e,value)=>setLanguageFilter(value)}
      renderInput={(params) => <TextField {...params} label="Language" />}
    />
</div>
</div>



<div style={{marginTop:'35px',gap:'30px'}} className='w-full flex  items-center justify-center '>
  <Button onClick={handleSaveFilter}   variant="contained">Save Filters</Button>
  <Button onClick={getFilteredData} variant="contained">Apply Filters</Button>
  <Button onClick={handleClearFilter} variant="contained">Clear Filters</Button>
</div>


</Box>
        </Modal>
  )
}

export default MovieFilterModal