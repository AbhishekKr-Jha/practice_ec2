import axios from 'axios';

const baseUrl = 'http://34.232.239.243:5000/backend/api/v1'; 

// GET
const getAxiosCall = async (url, headers = {},params={}) => {
  try {
    const mainUrl = `${baseUrl}${url}`;
    const result = await axios.get(mainUrl, { headers,params });

    return {
      success: true,
      responseData: result?.data,
    };
  } catch (error) {
    console.log("the error is get request is",error)
    return {
      success: false,
      errorMessage: error?.response?.data?.message,
    };
  }
};
       
// POST
const postAxiosCall = async (url, data, headers = {'Content-Type': 'application/json'}) => {
  try {
    const mainUrl = `${baseUrl}${url}`;
    const result = await axios.post(mainUrl, data, { headers });

    return {
      success: true,
      responseData: result?.data,
    };
  } catch (error) {
    return {
      success: false,
      errorMessage: error?.response?.data?.message,
    };
  }
};


export { getAxiosCall, postAxiosCall  };
