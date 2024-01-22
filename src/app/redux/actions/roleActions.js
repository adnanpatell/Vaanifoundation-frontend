import { axiosPost, axiosGet } from "../../services/auth/jwtAuth";
import {
    ROLE_LIST,
	ROLE_ACCESS_LIST
} from "../../utils/constants/userRole";


export const getRoleList = (cb) => {
    return dispatch => {
        return axiosPost(
			{ url: '/user/role/listAll', reqBody: {} },
			(response) => {
                if(typeof cb == "function") cb(response);
                if(response.data.success){
                    dispatch({ type: ROLE_LIST, payload: response.data.result });
                }				
			},
		);
    }
};


export const getRoleAccessList = (cb) => {
    return dispatch => {
        return axiosGet(
			{ url: '/user/role/access_keys' },
			(response) => {
				if(typeof cb == "function") cb(response);
                if(response.data.success){
                    dispatch({ type: ROLE_ACCESS_LIST, payload: response.data.result });
                }				
			},
		);
    }
};

export const saveRole = (postData, cb) => {
    return dispatch => {
        return axiosPost(
			{ url: '/user/role/add', reqBody: postData },
			(response) => {
                if(typeof cb == "function") cb(response?.data);
			},
		);
    }
}