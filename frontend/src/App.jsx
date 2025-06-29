import React from 'react'
import './assets/styles.scss'
import Header from './header'
import Footer from './footer'
// import { PersistGate } from 'redux-persist/integration/react'
// import { persistor } from './redux/store'
import { getAxiosCall } from './apiHelper/axiosCall'
import { useDispatch } from 'react-redux'
import { saveCategoryList, saveLanguageList } from './redux/filterSlice'
import { useEffect } from 'react'
// import MoviesTable from './MoviesTable'
import MainRoutes from './mainRoutes'


function App() {
const dispatch=useDispatch()

const getCategoryAndLanguageList=async()=>{
  const result=await getAxiosCall('/get_language_category')
  if(result.success){
    // console.log("the value od category is",result?.responseData?.listData?.categoryList)
dispatch(saveCategoryList(result?.responseData?.listData?.categoryList))
dispatch(saveLanguageList(result?.responseData?.listData?.languageList))
  }else{
    console.log("error in fetching list")
  }
}

useEffect(()=>{
  getCategoryAndLanguageList()
},[])

  return (
    <>
      <Header />
       {/* <PersistGate loading={<div>Loading data...</div>} persistor={persistor}> */}
      <div className='main_page_holder'>
        <div className='table_outer_holder'>
        <MainRoutes />
        </div>
      </div>
      {/* </PersistGate> */}
      <Footer />
    </>
  )
}

export default App
