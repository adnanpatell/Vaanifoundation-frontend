import { axiosPost, axiosGet } from "../../services/auth/jwtAuth";


export function uploadFile(post, pg, cb) {
    return dispatch => {
        return axiosPost(
            { url: "upload", reqBody: post }, 
            (response) => {
                if(typeof cb == "function") cb(response.data)
            }, 
            pg
        )
    };
}