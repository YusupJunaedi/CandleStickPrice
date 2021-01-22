import Axios from 'axios'

const API = 'https://testfai.herokuapp.com/ticker'

export const getAPI = () => {
    return Axios.get(API);
  };