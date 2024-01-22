import { axiosPost, axiosGet } from "../../services/auth/jwtAuth";
import { MEDICINE_CATEGORY_LIST, MEDICINE_CATEGORY_DATA } from "../../utils/constants/medicine-category";


export const getMedicineCategoryList = (cb) => {
    return dispatch => {
        return axiosPost(
			{ url: '/medicine-category/list-all', reqBody: {} },
			(response) => {
                if(typeof cb == "function") cb(response);
                if(response.data.success){
                    dispatch({ type: MEDICINE_CATEGORY_LIST, payload: response.data.result });
                }				
			},
		);
    }
};

export const getMedicineCategoryData = (postData, cb) => {
    return dispatch => {
        return axiosPost(
			{ url: '/medicine-category/details',  reqBody: postData },
			(response) => {
                if(typeof cb == "function") cb(response);
                if(response.data.success){
                    dispatch({ type: MEDICINE_CATEGORY_DATA, payload: response.data.result });
                }				
			},
		);
    }
};

export const addMedicineCategory = (postData, cb) => {
    return dispatch => {
        return axiosPost(
			{ url: '/medicine-category/add', reqBody: postData },
			(response) => {
                if(typeof cb == "function") cb(response?.data);
			},
		);
    }
}

export const saveMedicineCategory = (postData, cb) => {
    return dispatch => {
        return axiosPost(
			{ url: '/medicine-category/update', reqBody: postData },
			(response) => {
                if(typeof cb == "function") cb(response?.data);
			},
		);
    }
}