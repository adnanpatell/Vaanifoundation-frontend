import {
    VISITS_LIST
} from "../../utils/constants/statistics";

const INIT_STATE = {
    VISITS_LIST:[]
};

const reducerFunc = (state = INIT_STATE, action) => {
    switch (action.type) {
        case VISITS_LIST: {
            return {
                ...state,
                VISITS_LIST: action.payload,
            }
        }
        
        default: {
            return state;
        }
    }
};

export default reducerFunc;
