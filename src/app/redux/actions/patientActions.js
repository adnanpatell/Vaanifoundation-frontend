import { axiosPost, axiosGet, axiosDelete } from "../../services/auth/jwtAuth";
import { PATIENT_LIST, PATIENT_DATA } from "../../utils/constants/patients";


export const getPatientList = (cb) => {
    return dispatch => {
        return axiosPost(
			{ url: '/patients/listAll', reqBody: {} },
			(response) => {
                if(typeof cb == "function") cb(response);
                if(response.data.success){
                    dispatch({ type: PATIENT_LIST, payload: response.data.result });
                }				
			},
		);
    }
};

export const getPatientData = (postData, cb) => {
    return dispatch => {
        return axiosPost(
			{ url: '/patients/details',  reqBody: postData },
			(response) => {
                if(typeof cb == "function") cb(response);
                if(response.data.success){
                    dispatch({ type: PATIENT_DATA, payload: response.data.result });
                }				
			},
		);
    }
};

export const addPatient = (postData, cb) => {
    return dispatch => {
        return axiosPost(
			{ url: '/patients/add', reqBody: postData },
			(response) => {
                if(typeof cb == "function") cb(response?.data);
			},
		);
    }
}

export const savePatient = (postData, cb) => {
    return dispatch => {
        return axiosPost(
			{ url: '/patients/update', reqBody: postData },
			(response) => {
                if(typeof cb == "function") cb(response?.data);
			},
		);
    }
}

export const deletePatiente = (id,cb) => {
    return dispatch => {
        return axiosDelete(
			{ url: '/patients/delete/'+id },
			(response) => {
                if(typeof cb == "function") cb(response.data);                				
			},
		);
    }
};

export const deleteManyPatiente = (postData,cb) => {
    return dispatch => {
        return axiosPost(
			{ url: '/patients/delete', reqBody: postData },
			(response) => {
                if(typeof cb == "function") cb(response.data);                				
			},
		);
    }
};



export const patientAppointments = (post, cb) => {
    
    return dispatch => {
        return axiosPost(
			{ url: '/patients/appointments', reqBody: post },
			(response) => {
                if(typeof cb == "function") cb(response?.data);
			},
		);
    }
}