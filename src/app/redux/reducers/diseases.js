import {
    DISEASES_LIST,
    DISEASES_DATA
} from "../../utils/constants/diseases";

const INIT_STATE = {
    DISEASES_LIST:[],
    DISEASES_DATA:{}
};

const reducerFunc = (state = INIT_STATE, action) => {
    switch (action.type) {
        case DISEASES_LIST: {
            return {
                ...state,
                DISEASES_LIST: action.payload,
            }
        }

        case DISEASES_DATA: {
            return {
                ...state,
                DISEASES_DATA: action.payload,
            }
        }
        
        default: {
            return state;
        }
    }
};

export default reducerFunc;
