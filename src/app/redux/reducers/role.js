import {
    ROLE_LIST,
    ROLE_ACCESS_LIST
} from "../../utils/constants/userRole";


const INIT_STATE = {
    ROLE_LIST:[],
    ROLE_ACCESS_LIST:[]
};

const reducerFunc = (state = INIT_STATE, action) => {
    switch (action.type) {
        
        case ROLE_LIST: {
            return {
                ...state,
                ROLE_LIST: action.payload,
            }
        }
        
        case ROLE_ACCESS_LIST:{
            return {
                ...state,
                ROLE_ACCESS_LIST: action.payload,
            }
        }        

        default: {
            return state;
        }
    }
};

export default reducerFunc;
