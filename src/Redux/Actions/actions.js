import actionType from "./actionType";
import {getAPI} from '../../Utils/Api'
  
  export const getAPICreator = () => {
    return {
      type: actionType.getAPI,
      payload: getAPI()
    };
  };
