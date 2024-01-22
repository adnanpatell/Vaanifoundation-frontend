import {
    USER_LIST,
    AUTH_USER,
    AUTH_ACCESS
} from "../../utils/constants/user";

const INIT_STATE = {
    USER_LIST:[],
    AUTH_USER:{},
    AUTH_ACCESS:{}
};

const reducerFunc = (state = INIT_STATE, action) => {
    switch (action.type) {
        case USER_LIST: {
            return {
                ...state,
                USER_LIST: action.payload,
            }
        }

        case AUTH_USER: {
            return {
                ...state,
                AUTH_USER: action.payload,
            }
        }

        case AUTH_ACCESS:{
            return {
                ...state,
                AUTH_ACCESS: action.payload,
            }
        }
        
        default: {
            return state;
        }
    }
};

export default reducerFunc;
