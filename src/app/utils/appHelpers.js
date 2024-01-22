import moment from "moment";
import {USE_IMAGE_PLACEHOLDERS} from "./constants/paths";

export const getAssetPath = (url, size) => {
    if(USE_IMAGE_PLACEHOLDERS) {
        return `https://via.placeholder.com/${size}.png`;
    }

    return url;
};

export const calAge = (dob) => {
    const pluralize = (str, n) => n > 1 ? `${n} ${str.concat('s')}` : n == 0 ? '' :`${n} ${str}`

    const age = moment.duration(moment().diff(moment(dob)))
    const ageInYears = Math.floor(age.asYears())
    const ageInMonths = Math.floor(age.asMonths())
    const ageInDays = Math.floor(age.asDays())

    if (age < 0)
        throw 'DOB is in the future!'

    let pluralYears = pluralize('year', ageInYears)
    let pluralDays = pluralize('day', age.days())

    if (ageInYears < 18) {
        if (ageInYears >= 1) {
        return `${pluralYears} ${pluralize('month', age.months())}`
        } else if (ageInYears < 1 && ageInMonths >= 1) {
        return `${pluralize('month', ageInMonths)} ${pluralDays}`
        } else {
        return pluralDays
        }
    } else {
        return pluralYears
    }
  }