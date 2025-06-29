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
import StoreDetailsDrawer from './components/stores/StoreDetailsDrawer';


export default function StoresTable() {
  const dispatch=useDispatch()
const [storeList,setStoreList]=useState([])
  const currentFilters=useSelector((state)=>state.filter.filterData)
    const [drawerVisibility,setDrawerVisibility]=useState(false) 
            const handleDrawerClose=()=>setDrawerVisibility(false)
const [sliderFilmId,setSliderFilmId]=useState(null)
const filterData = useSelector(state => state.filter.isOpenFilter);

     const getStoresList=async(pageNumber)=>{ 
    const result=await postAxiosCall('/stores',{},{})
    if (result.success) {
    //   console.log("the film list is",result.responseData.storelist)
         setStoreList(result.responseData.storelist)
    }else{
console.log("data fetching error")
    }
}


const handleBtnClick=()=>dispatch(toggleFilterModal(true))

  useEffect(()=>{
    getStoresList(1)
    // console.log("the current filter ius chjnged ")
  },[currentFilters])
  
  return (
    <>
      <div className='heading_holder'>
        <h4 className='heading'>Stores Lists</h4>  
        <Button onClick={handleBtnClick} variant="contained"> Filter</Button>
      </div>


      {/* table data */}
      <TableContainer component={Paper} sx={{ margin: '0 auto' }}>
        <Table size='small'>
          <TableHead>
            <TableRow>
              <TableCell><strong>StoreId</strong></TableCell>
              <TableCell><strong>Address </strong></TableCell>
              <TableCell><strong>Manager Name</strong></TableCell>
              <TableCell><strong>Total Rentals</strong></TableCell>
              <TableCell><strong>Staff Count</strong></TableCell>
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
            {storeList.length>0 && storeList.map((row, index) => (
              <TableRow  hover
              onClick={()=>{setSliderFilmId(row?.film_id);setDrawerVisibility(true)}}
                key={index}
                sx={{
                  backgroundColor: index % 2 === 0 ? 'rgba(0 ,0, 0, 0.04)' : 'white', cursor:'pointer'
                }}
              >
                <TableCell>{row?.store_id}</TableCell>
                <TableCell>{row?.address}</TableCell>
                <TableCell>{row?.manager_name?.name}</TableCell>
                <TableCell>{row?.replacement_cost}</TableCell>
                <TableCell>{row?.totalRentals}</TableCell>
                <TableCell>{row.staffCount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer> 
     

{/* {drawerVisibility && <StoreDetailsDrawer closeDrawer={handleDrawerClose} openDrawer={drawerVisibility} filmId={sliderFilmId}   />} */}
    {/* {filterData && <MovieFilterModal />}  */}
    </>
  );
}
