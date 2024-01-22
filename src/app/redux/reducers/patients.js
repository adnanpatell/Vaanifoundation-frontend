import {
    PATIENT_LIST,
    PATIENT_DATA
} from "../../utils/constants/patients";

const INIT_STATE = {
    PATIENT_LIST:[],
    PATIENT_DATA:{}
};

const reducerFunc = (state = INIT_STATE, action) => {
    switch (action.type) {
        case PATIENT_LIST: {
            return {
                ...state,
                PATIENT_LIST: action.payload,
            }
        }

        case PATIENT_DATA: {
            return {
                ...state,
                PATIENT_DATA: action.payload,
            }
        }
        
        default: {
            return state;
        }
    }
};

export default reducerFunc;
