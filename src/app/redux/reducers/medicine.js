import {
    MEDICINE_LIST,
    MEDICINE_DATA
} from "../../utils/constants/medicine";

const INIT_STATE = {
    MEDICINE_LIST:[],
    MEDICINE_DATA:{}
};

const reducerFunc = (state = INIT_STATE, action) => {
    switch (action.type) {
        case MEDICINE_LIST: {
            return {
                ...state,
                MEDICINE_LIST: action.payload,
            }
        }

        case MEDICINE_DATA: {
            return {
                ...state,
                MEDICINE_DATA: action.payload,
            }
        }
        
        default: {
            return state;
        }
    }
};

export default reducerFunc;
