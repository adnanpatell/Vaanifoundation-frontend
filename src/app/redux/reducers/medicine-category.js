import {
    MEDICINE_CATEGORY_LIST,
    MEDICINE_CATEGORY_DATA
} from "../../utils/constants/medicine-category";

const INIT_STATE = {
    MEDICINE_CATEGORY_LIST:[],
    MEDICINE_CATEGORY_DATA:{}
};

const reducerFunc = (state = INIT_STATE, action) => {
    switch (action.type) {
        case MEDICINE_CATEGORY_LIST: {
            return {
                ...state,
                MEDICINE_CATEGORY_LIST: action.payload,
            }
        }

        case MEDICINE_CATEGORY_DATA: {
            return {
                ...state,
                MEDICINE_CATEGORY_DATA: action.payload,
            }
        }
        
        default: {
            return state;
        }
    }
};

export default reducerFunc;
