import React, { useState } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Drawer, TextField, Autocomplete, FormControlLabel, Checkbox, Tooltip, Popover, MenuItem } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { useEffect } from 'react';
import { postAxiosCall } from './apiHelper/axiosCall';
import Pagination from '@mui/material/Pagination';
import DetailsDrawer from './components/films/DetailsDrawer';
import MovieFilterModal from './components/films/MovieFilterModal';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFilterModal } from './redux/filterSlice';
import SavedFilterDrawer from './components/films/SavedFilterDrawer';


export default function MoviesTable() {
  const dispatch=useDispatch()
const [filmList,setFilList]=useState([])
const [totalPages,setTotalPages]=useState(1)
  const currentFilters=useSelector((state)=>state.filter.filterData)
    const [drawerVisibility,setDrawerVisibility]=useState(false) 
            const handleDrawerClose=()=>setDrawerVisibility(false)

            const [savedFilterVisibility,setSavedFilterVisibility]=useState(false)
            const closeSavedFiltersDrawer=()=>setSavedFilterVisibility(false)


const [sliderFilmId,setSliderFilmId]=useState(null)
const filterData = useSelector(state => state.filter.isOpenFilter);

     const getFilmsList=async(pageNumber)=>{
    const result=await postAxiosCall('/films',{
      film_category_filter:currentFilters?.filmCategory,
      releaseyear_filter:Number(currentFilters?.releaseYear) ,
      film_actor_first_name:currentFilters?.actorFirstName ,
      language_filter:currentFilters?.languageFilter,
      film_length_filter_obj:currentFilters?.filmLengthFilter,
      pageNumber
    },{})
    if (result.success) {
      // console.log("the film list is",result.responseData.filmlist)
         setFilList(result.responseData.filmlist)
         setTotalPages(result?.responseData?.totalPages)
    }else{
console.log("data fetching error")
    }
}

  // const [createdDateValue, setCreatedDateValue] = React.useState(dayjs());

  const handlePageChange=(event, value)=>{
getFilmsList(value)
  }

const handleBtnClick=()=>dispatch(toggleFilterModal(true))

const handleSavedFilterDrawer=()=>{
setSavedFilterVisibility(true)
}


  useEffect(()=>{
    getFilmsList(1)
    // console.log("the current filter ius chjnged ")
  },[currentFilters])
  
  return (
    <>
      <div className='heading_holder'>
        <h4 className='heading'>Movie Lists</h4>  
        <div className='flex gap-10'>
           <Button onClick={handleBtnClick} variant="contained"> Filter</Button>
        <Button onClick={handleSavedFilterDrawer} variant="contained"> Open Saved Filters</Button>
    
        </div>
         </div>


      {/* table data */}
      <TableContainer component={Paper} sx={{ margin: '0 auto' }}>
        <Table size='small'>
          <TableHead>
            <TableRow>
              <TableCell><strong>Title</strong></TableCell>
              <TableCell><strong>Release Year</strong></TableCell>
              <TableCell><strong>Language</strong></TableCell>
              <TableCell><strong>Length</strong></TableCell>
              <TableCell><strong>Replacement Cost</strong></TableCell>
              <TableCell><strong>Rating</strong></TableCell>
              <TableCell 
                sx={{
                  width: '50px',
                  minWidth: '50px',
                  maxWidth: '50px',
                  padding: '4px', // Optional: reduces internal padding
                  textAlign: 'center',
                }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filmList.length>0 && filmList.map((row, index) => (
              <TableRow  hover
              onClick={()=>{setSliderFilmId(row?.film_id);setDrawerVisibility(true)}}
                key={index}
                sx={{
                  backgroundColor: index % 2 === 0 ? 'rgba(0 ,0, 0, 0.04)' : 'white', cursor:'pointer'
                }}
              >
                <TableCell>{row?.title}</TableCell>
                <TableCell>{row?.release_year}</TableCell>
                <TableCell>{row?.language_film_language_idTolanguage?.name}</TableCell>
                <TableCell>{row?.replacement_cost}</TableCell>
                <TableCell>{row?.length}</TableCell>
                <TableCell>{row.rating}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer> 
      <div style={{margin:'15px 0'}} className="flex-ele ">
 {filmList.length>0 && <Pagination count={totalPages} color="primary"  onChange={handlePageChange} />}
</div>

{drawerVisibility && <DetailsDrawer closeDrawer={handleDrawerClose} openDrawer={drawerVisibility} filmId={sliderFilmId}   />}
 {savedFilterVisibility &&  <SavedFilterDrawer  openSavedFilter={savedFilterVisibility}  closeSavedFilter={closeSavedFiltersDrawer} />}
    {filterData && <MovieFilterModal />} 
    </>
  );
}
