import {
    APPOINTMENTS_LIST,
    APPOINTMENTS_DATA,
    APPOINTMENTS_LIST_COMPLETED,
    APPOINTMENTS_LIST_PENDING
} from "../../utils/constants/appointments";

const INIT_STATE = {
    APPOINTMENTS_LIST:[],
    APPOINTMENTS_DATA:{},
    APPOINTMENTS_LIST_COMPLETED:[],
    APPOINTMENTS_LIST_PENDING:[]
};

const reducerFunc = (state = INIT_STATE, action) => {
    switch (action.type) {
        case APPOINTMENTS_LIST: {
            return {
                ...state,
                APPOINTMENTS_LIST: action.payload,
            }
        }

        case APPOINTMENTS_DATA: {
            return {
                ...state,
                APPOINTMENTS_DATA: action.payload,
            }
        }

        case APPOINTMENTS_LIST_COMPLETED: {
            return {
                ...state,
                APPOINTMENTS_LIST_COMPLETED: action.payload,
            }
        }

        case APPOINTMENTS_LIST_PENDING: {
            return {
                ...state,
                APPOINTMENTS_LIST_PENDING: action.payload,
            }
        }

        
        
        default: {
            return state;
        }
    }
};

export default reducerFunc;
