import jwtAuthAxios, { axiosPost } from "../../services/auth/jwtAuth";
import {
    USER_LIST
} from "../../utils/constants/user";


export const getUserList = (cb) => {
    return dispatch => {
        // return axiosPost.post('', postData).then();
        return axiosPost(
			{ url: '/user/listAll', reqBody: {} },
			(response) => {
                if(typeof cb == "function") cb(response);
                if(response.data.success){
                    dispatch({ type: USER_LIST, payload: response.data.result });
                }
				
			},
		);
    }
};

export const saveUser = (postData, cb) => {
    return dispatch => {
        // return axiosPost.post('', postData).then();

        return axiosPost(
			{ url: '/user/add', reqBody: postData },
			(response) => {
                if(typeof cb == "function") cb(response?.data);				
			},
		);
    }
}

export const updateUser = (postData, cb) => {
    return dispatch => {
        // return axiosPost.post('', postData).then();

        return axiosPost(
			{ url: '/user/update', reqBody: postData },
			(response) => {
                if(typeof cb == "function") cb(response?.data);				
			},
		);
    }
}