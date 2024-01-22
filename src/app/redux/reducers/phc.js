import {
    PHC_LIST,
    PHC_DATA
} from "../../utils/constants/phc";

const INIT_STATE = {
    PHC_LIST:[],
    PHC_DATA:{}
};

const reducerFunc = (state = INIT_STATE, action) => {
    switch (action.type) {
        case PHC_LIST: {
            return {
                ...state,
                PHC_LIST: action.payload,
            }
        }

        case PHC_DATA: {
            return {
                ...state,
                PHC_DATA: action.payload,
            }
        }
        
        default: {
            return state;
        }
    }
};

export default reducerFunc;
