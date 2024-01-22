import { axiosPost, axiosGet } from "../../services/auth/jwtAuth";
import { VISITS_LIST } from "../../utils/constants/statistics";


export const getVisitStatistics = (cb) => {
    return dispatch => {
        return axiosPost(
			{ url: '/appointments/statistics', reqBody: {} },
			(response) => {
                if(typeof cb == "function") cb(response);
                if(response.data.success){
                    dispatch({ type: VISITS_LIST, payload: response.data.result });
                }				
			},
		);
    }
};
