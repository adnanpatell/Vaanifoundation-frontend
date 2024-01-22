import { axiosPost, axiosGet, axiosDelete } from "../../services/auth/jwtAuth";
import { MEDICINE_LIST, MEDICINE_DATA } from "../../utils/constants/medicine";


export const getMedicineList = (cb) => {
    return dispatch => {
        return axiosPost(
			{ url: '/medicine/list', reqBody: {} },
			(response) => {
                if(typeof cb == "function") cb(response);
                if(response.data.success){
                    dispatch({ type: MEDICINE_LIST, payload: response.data.result });
                }				
			},
		);
    }
};

export const getMedicineData = (postData, cb) => {
    return dispatch => {
        return axiosPost(
			{ url: '/medicine/details',  reqBody: postData },
			(response) => {
                if(typeof cb == "function") cb(response);
                if(response.data.success){
                    dispatch({ type: MEDICINE_DATA, payload: response.data.result });
                }				
			},
		);
    }
};

export const addMedicine = (postData, cb) => {
    return dispatch => {
        return axiosPost(
			{ url: '/medicine/add', reqBody: postData },
			(response) => {
                if(typeof cb == "function") cb(response?.data);
			},
		);
    }
}

export const saveMedicine = (postData, cb) => {
    return dispatch => {
        return axiosPost(
			{ url: '/medicine/update', reqBody: postData },
			(response) => {
                if(typeof cb == "function") cb(response?.data);
			},
		);
    }
}

export const deleteMedicine = (id,cb) => {
    return dispatch => {
        return axiosDelete(
			{ url: '/medicine/delete/'+id },
			(response) => {
                if(typeof cb == "function") cb(response.data);                				
			},
		);
    }
};