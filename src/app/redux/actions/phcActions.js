import { axiosPost, axiosGet } from "../../services/auth/jwtAuth";
import { PHC_LIST, PHC_DATA } from "../../utils/constants/phc";


export const getPHcList = (cb) => {
    return dispatch => {
        return axiosPost(
			{ url: '/phc/list', reqBody: {} },
			(response) => {
                if(typeof cb == "function") cb(response);
                if(response.data.success){
                    dispatch({ type: PHC_LIST, payload: response.data.result });
                }				
			},
		);
    }
};

export const getPHcData = (postData, cb) => {
    return dispatch => {
        return axiosPost(
			{ url: '/phc/details',  reqBody: postData },
			(response) => {
                if(typeof cb == "function") cb(response);
                if(response.data.success){
                    dispatch({ type: PHC_DATA, payload: response.data.result });
                }				
			},
		);
    }
};

export const addPHc = (postData, cb) => {
    return dispatch => {
        return axiosPost(
			{ url: '/phc/add', reqBody: postData },
			(response) => {
                if(typeof cb == "function") cb(response?.data);
			},
		);
    }
}

export const savePHc = (postData, cb) => {
    return dispatch => {
        return axiosPost(
			{ url: '/phc/update', reqBody: postData },
			(response) => {
                if(typeof cb == "function") cb(response?.data);
			},
		);
    }
}