import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Grid, Button} from "@mui/material";
import styled from "@emotion/styled";
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import CreatableSelect from 'react-select/creatable';
import * as yup from "yup";

import JumboCardQuick from "@jumbo/components/JumboCardQuick";
import {useTranslation} from "react-i18next";
import FormLabel from "@mui/material/FormLabel";
import { Radio, RadioGroup } from "@mui/material";

import Div from "@jumbo/shared/Div";
import LoadingButton from "@mui/lab/LoadingButton";

import JumboTextField from '@jumbo/components/JumboFormik/JumboTextField';
import {Form, Formik} from "formik";
import { addPatient, savePatient, getPatientData, getPatientList } from '../../redux/actions/patientActions';
import * as dayjs from 'dayjs'
import { PATIENT_DATA, PATIENT_LIST } from 'app/utils/constants/patients';
import EditIcon from '@mui/icons-material/Edit';
import { successNotification, errorNotification } from 'app/utils/alertNotificationUtility';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { talukaList, countryList } from 'app/utils/constants/staticData';
import {TextField} from "@mui/material";
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { useParams, useNavigate } from 'react-router-dom';
import { USER_LIST } from 'app/utils/constants/user';
import { getUserList } from 'app/redux/actions/userActions';
import { addAppointment } from 'app/redux/actions/appointmentsActions';
import moment from 'moment';


const validationSchema = yup.object({
    patient_name:yup.string('Enter patient name')
    .required('Patient name is required'),
    email:yup.string("Enter valid email").email('Enter valid email')
});
const filter = createFilterOptions();
const PatientsManage = () => {
    const dispatch = useDispatch();
    const {t} = useTranslation();
    const { patient_id } = useParams();
    const [selectedPatientId, setSelectedPatientId] = useState(patient_id);
    const navigate = useNavigate();
    
    
    const patientList = useSelector((state)=> state.patients[PATIENT_LIST]);
    
    useEffect(()=>{
        dispatch(getUserList());
        if(selectedPatientId){
            dispatch(getPatientData({patient_id:selectedPatientId},(resData)=>{
                console.log(resData, "resData");
            }));
        }
        dispatch(getPatientList());
        
        return () =>{
            dispatch({ type: PATIENT_DATA, payload: {} });
        }
    },[selectedPatientId, dispatch]);

    const doctorList = useSelector((state)=> state.user[USER_LIST]?.filter(user=> user.roleData.role === "doctor")?.map(doctor=>({label:`${doctor.first_name} ${doctor.middle_name} ${doctor.last_name}`, id: doctor._id})));

    const selectedPatient = useSelector((state)=> state.patients[PATIENT_DATA]);

    const saveUserHandler = (formData, resetForm) => {
        if(selectedPatient._id){
            dispatch(savePatient({
                ...formData,
                _id: selectedPatient._id
            }, (insRS)=>{
                
                if(insRS.success){
                    
                    if(formData.create_appointment){
                    
                        let appointmentSchema = {
                            patient_id: selectedPatient._id,
                            doctor_id: formData.doctor_id || (doctorList?.[0]?.id),
                        };
                        dispatch(addAppointment(appointmentSchema, (insRS)=>{
                            if(insRS.success){
                                successNotification( ( insRS && insRS.message ? insRS.message : 'Patients updated successfully'));
                            }else{
                                errorNotification( insRS && insRS.message ? insRS.message : "Something went wrong.")
                            }
                            resetForm();
                            navigate(`/dashboard`);
                        }));
                    
                    }else{
                        successNotification( ( insRS && insRS.message ? insRS.message : 'Patients updated successfully'));
                        resetForm();
                        navigate(`/patients`);
                    }
                }else{
                    resetForm();
                    errorNotification( insRS && insRS.message ? insRS.message : "Something went wrong.")
                    navigate(`/patients`);
                }
                
                
            }));
        }else{
            dispatch(addPatient(formData, (insRS)=>{
                if(insRS.success){

                    if(formData.doctor_id && insRS.result && insRS.result._id){
                        let appointmentSchema = {
                            patient_id: insRS?.result?._id,
                            doctor_id: formData.doctor_id,
                        };
                        dispatch(addAppointment(appointmentSchema, (insRS)=>{
                            if(insRS.success){
                                successNotification( ( insRS && insRS.message ? insRS.message : 'Patients created successfully'));
                            }else{
                                errorNotification( insRS && insRS.message ? insRS.message : "Something went wrong.")
                            }
                            resetForm();
                            navigate(`/dashboard`);
                        }));
                    }
                }else{
                    errorNotification( insRS && insRS.message ? insRS.message : "Something went wrong.");
                    resetForm();
                    navigate(`/patients`);
                }
                
                
            }));
        }
    };

    return (
        <>
            <JumboCardQuick
                title={`Patients Manage`}
                subheader={`${selectedPatient._id ? 'Patient ID : '+selectedPatient.unique_id : 'Create and update patients'}`}
                
                // wrapperSx={{p: 0}}
            >
                {   
                    <React.Fragment>
                        
                        
                            
                                <Formik
                                    validateOnChange={true}
                                    initialValues={{
                                        patient_id: selectedPatientId ? selectedPatientId : (selectedPatient ? selectedPatient._id : ''),
                                        /* first_name: selectedPatient && selectedPatient.first_name ? selectedPatient.first_name : '',
                                        middle_name: selectedPatient && selectedPatient.middle_name ? selectedPatient.middle_name : '',
                                        last_name: selectedPatient && selectedPatient.last_name ? selectedPatient.last_name : '', */
                                        patient_name: selectedPatient.patient_name ? selectedPatient.patient_name : '',
                                        email: selectedPatient.email ? selectedPatient.email : '',
                                        mobile: selectedPatient.mobile ? selectedPatient.mobile : '',
                                        birth_date: selectedPatient.birth_date ? new Date(selectedPatient.birth_date) : '',
                                        age: selectedPatient.age ? selectedPatient.age :  '',
                                        gender: selectedPatient.gender ? selectedPatient.gender : 'Male',
                                        country: selectedPatient.country ? selectedPatient.country : '',
                                        state: selectedPatient.state ? selectedPatient.state : '',
                                        city: selectedPatient.city ? selectedPatient.city : '',
                                        taluka:selectedPatient.city ? selectedPatient.taluka :'',
                                        address: selectedPatient.address ? selectedPatient.address : '',
                                        adharcard_number:selectedPatient.adharcard_number ? selectedPatient.adharcard_number : '',
                                        doctor_id: Array.isArray(doctorList) && doctorList[0] && doctorList[0].id ? doctorList[0].id : ""
                                        
                                    }}
                                    validationSchema={validationSchema}
                                    onSubmit={(data, {resetForm, setSubmitting}) => {
                                        setSubmitting(true);
                                        saveUserHandler(data, resetForm);
                                        setSubmitting(false);
                                    }}
                                    style={{width:'100%'}}
                                    enableReinitialize={true}
                                    
                                >
                                    {({isSubmitting, setFieldValue, errors, touched, values}) => (
                                        <Form style={{textAlign: 'left'}} noValidate autoComplete='off'>
                                            <Div sx={{flexGrow: 1}}>
                                                <Grid container spacing={2}>
                                                    
                                                    {
                                                        !patient_id ? (
                                                            <Grid item xs={4}>
                                                                <Div sx={{ mt: 1}}>
                                                                    <Autocomplete
                                                                        freeSolo
                                                                        id="patient-select"
                                                                        options={patientList?.map(patient=>({title:`${patient.patient_name} ${(patient.birth_date ? ' - ( '+moment(patient.birth_date).format("DD-MM-YYYY")+' )' : '')} ${(patient.age && !patient.birth_date ? ' - ( '+patient.age+' )' : '')}`, id: patient._id}))}
                                                                        fullWidth
                                                                        value={patientList?.map(patient=>({title:`${patient.patient_name} ${(patient.birth_date ? ' - ( '+moment(patient.birth_date).format("DD-MM-YYYY")+' )' : '')} ${(patient.age  && !patient.birth_date? ' - ( '+patient.age+' )' : '')}`, id: patient._id}))?.find((pD)=>pD.id === values.patient_id)}
                                                                        onChange={(e, value)=> {
                                                                            if(value && value.id){
                                                                                setFieldValue('patient_id', value?.id);
                                                                                dispatch(getPatientData({patient_id:value?.id},(resData)=>{
                                                                                    console.log(resData, "resData");
                                                                                }));
                                                                            }else{
                                                                                console.log("In Catch")
                                                                                dispatch({ type: PATIENT_DATA, payload: {} });
                                                                            }
                                                                        }}

                                                                        getOptionLabel={(option) => {
                                                                            // Value selected with enter, right from the input
                                                                            if (typeof option === 'string') {
                                                                                return option;
                                                                            }
                                                                            // Add "xxx" option created dynamically
                                                                            if (option.inputValue) {
                                                                                return option.inputValue;
                                                                            }
                                                                            // Regular option
                                                                            return option.title;
                                                                        }}

                                                                        /* filterOptions={(options, params) => {
                                                                            
                                                                            
                                                                            const filtered = filter(options, params);
                                                                    
                                                                            const { inputValue } = params;
                                                                            // Suggest the creation of a new value
                                                                            const isExisting = options.some((option) => inputValue === option.title);
                                                                            if (inputValue !== '' && !isExisting) {
                                                                                filtered.push({
                                                                                inputValue,
                                                                                label: inputValue,
                                                                                title: `Add "${inputValue}"`,
                                                                                });
                                                                            }
                                                                            
                                                                            return filtered;
                                                                        }} */
                                                                        onInputChange={(e)=>{
                                                                            setFieldValue('patient_name', e.target.value)
                                                                        }}
                                                                        renderOption={(props, option) => <li {...props}>{option.title}</li>}
                                                                        renderInput={(params) => ( <TextField {...params} label="Patient" placeholder="Patient"/> )}
                                                                    />
                                                                </Div>
                                                            </Grid>
                                                        ) : (
                                                            <Grid item xs={4}>
                                                                <Div sx={{ mt: 1}}>
                                                                    <JumboTextField
                                                                        fullWidth
                                                                        name="patient_name"
                                                                        label="Patient name"
                                                                        value={values.patient_name}
                                                                    />
                                                                </Div>
                                                            </Grid>
                                                        )
                                                    }    
                                                    
                                                    
                                                    
                                                        
                                                    {/* <Grid item xs={4}>
                                                        <Div sx={{ mt: 1}}>
                                                            <JumboTextField
                                                                fullWidth
                                                                name="patient_name"
                                                                label="Patient name"
                                                                value={values.patient_name}
                                                            />
                                                        </Div>
                                                    </Grid> */}
                                                        
                                                    
                                                    
                                                    {/* <Grid item xs={4}>
                                                        <Div sx={{ mt: 1}}>
                                                            <JumboTextField
                                                                fullWidth
                                                                name="first_name"
                                                                label="First name"
                                                                value={values.first_name}
                                                            />
                                                        </Div>
                                                    </Grid> */}

                                                    {/* <Grid item xs={4}>
                                                        <Div sx={{ mt: 1}}>
                                                            <JumboTextField
                                                                fullWidth
                                                                name="middle_name"
                                                                label="Middle name"
                                                                value={values.middle_name}
                                                            />
                                                        </Div>
                                                    </Grid>

                                                    <Grid item xs={4}>
                                                        <Div sx={{ mt: 1}}>
                                                            <JumboTextField
                                                                fullWidth
                                                                name="last_name"
                                                                label="Last name"
                                                                value={values.last_name}
                                                            />
                                                        </Div>
                                                    </Grid> */}

                                                    <Grid item xs={4}>
                                                        <Div sx={{ mt: 1}}>
                                                            <JumboTextField
                                                                fullWidth
                                                                name="email"
                                                                label="Email"
                                                            />
                                                        </Div>
                                                    </Grid>
                                                    <Grid item xs={4}>
                                                        <Div sx={{ mt: 1}}>
                                                            <JumboTextField
                                                                fullWidth
                                                                name="mobile"
                                                                label="Mobile"
                                                            />
                                                        </Div>
                                                    </Grid>

                                                    <Grid item xs={4}>
                                                        <Div sx={{ mt: 1}}>
                                                            <FormControl fullWidth>
                                                                <DatePicker 
                                                                    name="birth_date" 
                                                                    label="Birth date"
                                                                    format="DD-MM-YYYY"
                                                                    value={values.birth_date ? dayjs(values.birth_date) : null}
                                                                    onChange={(newValue) => {
                                                                        console.log(newValue, "newValue")
                                                                        setFieldValue('birth_date', newValue ? newValue.format('YYYY-MM-DD') : null);
                                                                        if(newValue){
                                                                            let age = dayjs().diff(newValue, 'year');
                                                                            setFieldValue('age', age ? age : "")
                                                                        }
                                                                    }}
                                                                />
                                                            </FormControl>
                                                        </Div>
                                                    </Grid>

                                                    <Grid item xs={4}>
                                                        <Div sx={{ mt: 1}}>
                                                            <JumboTextField
                                                                fullWidth
                                                                name="age"
                                                                label="Age"
                                                            />
                                                        </Div>
                                                    </Grid>

                                                    <Grid item xs={4}>
                                                        <Div sx={{ mt: 1}}>
                                                            <Autocomplete
                                                                id="country-select"
                                                                options={countryList}
                                                                fullWidth
                                                                value={values.country ? values.country : ""}
                                                                onChange={(e, value)=> setFieldValue('country', value)}
                                                                renderInput={(params) => ( <TextField {...params} label="Country" placeholder="Country"/> )}
                                                            />
                                                        </Div>
                                                    </Grid>

                                                    <Grid item xs={4}>
                                                        <Div sx={{ mt: 1}}>
                                                            <JumboTextField
                                                                fullWidth
                                                                name="state"
                                                                label="State"
                                                            />
                                                        </Div>
                                                    </Grid>

                                                    <Grid item xs={4}>
                                                        <Div sx={{ mt: 1}}>
                                                            <JumboTextField
                                                                fullWidth
                                                                name="city"
                                                                label="City"
                                                            />
                                                        </Div>
                                                    </Grid>

                                                    <Grid item xs={4}>
                                                        <Div sx={{ mt: 1}}>
                                                            <Autocomplete
                                                                id="taluka-select"
                                                                options={talukaList}
                                                                fullWidth
                                                                value={values.taluka ? values.taluka : ""}
                                                                onChange={(e, value)=> setFieldValue('taluka', value)}
                                                                renderInput={(params) => ( <TextField {...params} label="Taluka" placeholder="Taluka"/> )}
                                                            />
                                                        </Div>
                                                    </Grid>

                                                    
                                                    <Grid item xs={4}>
                                                        <Div sx={{ mt: 1}}>
                                                            <JumboTextField
                                                                fullWidth
                                                                name="address"
                                                                label="Address"
                                                            />
                                                        </Div>
                                                    </Grid>

                                                    <Grid item xs={4}>
                                                        <Div sx={{ mt: 1}}>
                                                            <JumboTextField
                                                                fullWidth
                                                                name="adharcard_number"
                                                                label="Adharcard number"
                                                            />
                                                        </Div>
                                                    </Grid>
                                                    
                                                    <Grid item xs={4}>
                                                        <FormControl>
                                                            <FormLabel id="patient-gender-label">Gender</FormLabel>
                                                            <RadioGroup
                                                                row
                                                                aria-labelledby="patient-gender-label"
                                                                name="gender"
                                                                value={values.gender ? values.gender : null}
                                                                onChange={(e)=> setFieldValue('gender', e.target.value)}
                                                            >
                                                                <FormControlLabel value="Male" control={<Radio/>} label="Male"/>
                                                                <FormControlLabel value="Female" control={<Radio/>} label="Female"/>
                                                                <FormControlLabel value="Other" control={<Radio/>} label="Other"/>                                                            
                                                            </RadioGroup>
                                                        </FormControl>
                                                    </Grid>
                                                    
                                                    <Grid item xs={4}>
                                                        <Div sx={{ mt: 1}}>
                                                            <Autocomplete
                                                                id="doctor-select"
                                                                options={doctorList}
                                                                fullWidth
                                                                value={doctorList.find(doctor=> doctor.id === values.doctor_id)}
                                                                onChange={(e, value)=> setFieldValue('doctor_id', value?.id)}
                                                                renderInput={(params) => ( <TextField {...params} label="Doctor" placeholder="Doctor"/> )}
                                                            />
                                                        </Div>
                                                    </Grid>

                                                    <Grid textAlign="center" item xs={12}>
                                                        <Div sx={{ mt: 1}}>
                                                            <LoadingButton                                                            
                                                                type="submit"
                                                                variant="contained"
                                                                size="large"
                                                                sx={{mb: 1}}
                                                                loading={isSubmitting}
                                                            >
                                                                {
                                                                    selectedPatient._id ? ('Update Patients') : ('Add Patients')
                                                                }
                                                            </LoadingButton>
                                                            {
                                                                selectedPatient._id && (
                                                                    <Button
                                                                        type="button"
                                                                        variant="contained"
                                                                        size="large"
                                                                        sx={{mb: 1, ml:2}}
                                                                        onClick={() => saveUserHandler({
                                                                            ...values,
                                                                            create_appointment:true
                                                                        },()=>{})}
                                                                    >
                                                                        Create Appointment
                                                                    </Button>
                                                                )
                                                            }
                                                        </Div>
                                                    </Grid>
                                                </Grid>
                                            </Div>
                                        </Form>
                                    )}
                                </Formik>
                            
                        

                        
                    </React.Fragment>
                }
            </JumboCardQuick>
        </>
    );
};

export default PatientsManage;
