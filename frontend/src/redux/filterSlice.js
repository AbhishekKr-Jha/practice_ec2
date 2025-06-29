
// src/features/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'auth',
  initialState: { 
    filterData:null ,
isOpenFilter:false,
savedFilters:[],
categoryList:[],
languageList:[]
},
  reducers: {
    setFilterData: (state, action) => { state.filterData = action.payload },
    toggleFilterModal:(state,action)=>{state.isOpenFilter=action.payload},
savedFilterData:(state,action)=>{state.savedFilters.push(action.payload)},
saveCategoryList:(state,action)=>{state.categoryList=action.payload || []
    // console.log(action.payload)
},
saveLanguageList:(state,action)=>{state.languageList=action.payload || []}
  },
});

export const { setFilterData, toggleFilterModal, savedFilterData,saveCategoryList,saveLanguageList } = filterSlice.actions;
export default filterSlice.reducer;
