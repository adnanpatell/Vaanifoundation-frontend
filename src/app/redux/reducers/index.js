import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import contactsApp from "./contactsApp";
import role from "./role";
import user from "./user";
import patients from "./patients";
import medicineCategory from "./medicine-category";
import medicine from "./medicine";
import phc from "./phc";
import diseases from "./diseases";
import appointments from "./appointments";
import statistics from "./statistics"

const exportReducers = history => {
    return combineReducers({
        router: connectRouter(history),
        contactsApp: contactsApp,
        role: role,
        user: user,
        patients: patients,
        medicineCategory: medicineCategory,
        medicine: medicine,
        phc: phc,
        diseases: diseases,
        appointments: appointments,
        statistics: statistics
    });
};

export default exportReducers;

