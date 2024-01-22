import { axiosPost, axiosGet } from "../../services/auth/jwtAuth";
import { DISEASES_LIST, DISEASES_DATA } from "../../utils/constants/diseases";


export const getDiseasesList = (cb) => {
    return dispatch => {
        return axiosPost(
			{ url: '/diseases/list', reqBody: {} },
			(response) => {
                if(typeof cb == "function") cb(response);
                if(response.data.success){
                    dispatch({ type: DISEASES_LIST, payload: response.data.result });
                }				
			},
		);
    }
};

export const getDiseasesData = (postData, cb) => {
    return dispatch => {
        return axiosPost(
			{ url: '/diseases/details',  reqBody: postData },
			(response) => {
                if(typeof cb == "function") cb(response);
                if(response.data.success){
                    dispatch({ type: DISEASES_DATA, payload: response.data.result });
                }				
			},
		);
    }
};

export const addDiseases = (postData, cb) => {
    return dispatch => {
        return axiosPost(
			{ url: '/diseases/add', reqBody: postData },
			(response) => {
                if(typeof cb == "function") cb(response?.data);
			},
		);
    }
}

export const saveDiseases = (postData, cb) => {
    return dispatch => {
        return axiosPost(
			{ url: '/diseases/update', reqBody: postData },
			(response) => {
                if(typeof cb == "function") cb(response?.data);
			},
		);
    }
}