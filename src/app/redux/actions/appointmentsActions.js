import { axiosPost, axiosGet } from "../../services/auth/jwtAuth";
import { APPOINTMENTS_LIST, APPOINTMENTS_DATA, APPOINTMENTS_LIST_COMPLETED, APPOINTMENTS_LIST_PENDING } from "../../utils/constants/appointments";


export const getAppointmentList = (cb) => {
    return dispatch => {
        return axiosPost(
			{ url: '/appointments/list', reqBody: {} },
			(response) => {
                if(typeof cb == "function") cb(response);
                if(response.data.success){
                    dispatch({ type: APPOINTMENTS_LIST, payload: response.data.result });
                }				
			},
		);
    }
};

export const getCompletedAppointmentList = (pData,cb) => {
    return dispatch => {
        return axiosPost(
			{ url: '/appointments/role_according', reqBody: pData },
			(response) => {
                if(typeof cb == "function") cb(response);
                if(response.data.success){
                    dispatch({ type: APPOINTMENTS_LIST_COMPLETED, payload: response.data.result });
                }				
			},
		);
    }
};

export const getPendingAppointmentList = (pData,cb) => {
    return dispatch => {
        return axiosPost(
			{ url: '/appointments/role_according', reqBody: pData },
			(response) => {
                if(typeof cb == "function") cb(response);
                if(response.data.success){
                    dispatch({ type: APPOINTMENTS_LIST_PENDING, payload: response.data.result });
                }				
			},
		);
    }
};



export const getAppointmentData = (postData, cb) => {
    return dispatch => {
        return axiosPost(
			{ url: '/appointments/details',  reqBody: postData },
			(response) => {
                if(typeof cb == "function") cb(response);
                if(response.data.success){
                    dispatch({ type: APPOINTMENTS_DATA, payload: response.data.result });
                }				
			},
		);
    }
};

export const addAppointment = (postData, cb) => {
    return dispatch => {
        return axiosPost(
			{ url: '/appointments/add', reqBody: postData },
			(response) => {
                if(typeof cb == "function") cb(response?.data);
			},
		);
    }
}

export const saveAppointment = (postData, cb) => {
    return dispatch => {
        return axiosPost(
			{ url: '/appointments/update', reqBody: postData },
			(response) => {
                if(typeof cb == "function") cb(response?.data);
			},
		);
    }
}