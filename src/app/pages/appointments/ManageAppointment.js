import React, { useEffect, useState} from 'react';
import IconButton from "@mui/material/IconButton";
import Dialog from '@mui/material/Dialog';
import CloseIcon from '@mui/icons-material/Close';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import * as yup from "yup";
import {Form, Formik} from "formik";
import {Grid, Box } from "@mui/material";
import Div from "@jumbo/shared/Div";
import { successNotification, errorNotification } from 'app/utils/alertNotificationUtility';
import { saveAppointment, addAppointment } from '../../redux/actions/appointmentsActions';
import { PATIENT_LIST } from 'app/utils/constants/patients';
import { USER_LIST } from 'app/utils/constants/user';
import LoadingButton from "@mui/lab/LoadingButton";
import { useDispatch, useSelector } from 'react-redux';
import {Autocomplete, TextField} from "@mui/material";
import moment from 'moment';

const validationSchema = yup.object({
    patient_id: yup
        .string('Select patient')
        .required('First name is required'),
    doctor_id: yup
        .string('Select doctor')
        .required('Last name is required')
    
});

const ManageAppointment = (props) => {
    const dispatch = useDispatch();    
    const [scroll, setScroll] = useState('paper');
    const patientList = useSelector((state)=> state.patients[PATIENT_LIST]);
    const doctorList = useSelector((state)=> state.user[USER_LIST]?.filter(user=> user.roleData.role === "doctor")?.map(doctor=>({label:`${doctor.first_name} ${doctor.middle_name} ${doctor.last_name}`, id: doctor._id})));
    


    const saveAppointmentHandler = (formData, resetForm) => {
        if(props.selectedAppointment._id){
            dispatch(saveAppointment({
                ...formData,
                _id: props.selectedAppointment._id
            }, (insRS)=>{
                if(insRS.success){
                    successNotification( ( insRS && insRS.message ? insRS.message : 'Appointment updated successfully'));
                }else{
                    errorNotification( insRS && insRS.message ? insRS.message : "Something went wrong.")
                }
                
                props.handleAppointmentModel();
                resetForm();
                props.getAppointmentListHandler();
                
            }));
        }else{
            dispatch(addAppointment(formData, (insRS)=>{
                if(insRS.success){
                    successNotification( ( insRS && insRS.message ? insRS.message : 'Appointment created successfully'));
                }else{
                    errorNotification( insRS && insRS.message ? insRS.message : "Something went wrong.")
                }
                props.handleAppointmentModel();
                resetForm();
                props.getAppointmentListHandler();
            }));
        }
    };
    
    return (
        <>
            <Dialog
                fullWidth={true}
                maxWidth="md"
                open={props.viewAppointmentModel}
                onClose={props.handleAppointmentModel}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle>Add Appointment

                <IconButton
                    aria-label="close"
                    onClick={props.handleAppointmentModel}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                    >
                    <CloseIcon />
                </IconButton>
                </DialogTitle>
                <DialogContent dividers={scroll === 'paper'}>
                <DialogContentText>
                    You can add new appointment
                </DialogContentText>
                <Box
                    noValidate
                    component="div"
                    sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    m: 'auto',
                    width: '100%',
                    }}
                >
                    <Formik
                        validateOnChange={true}
                        initialValues={{
                            patient_id: props.selectedAppointment.patient_id ? props.selectedAppointment.patient_id : '',
                            doctor_id: props.selectedAppointment.doctor_id ? props.selectedAppointment.doctor_id : '',
                            complains: props.selectedAppointment.complains ? props.selectedAppointment.complains : '',
                            // disease_id: props.selectedAppointment.disease_id ? props.selectedAppointment.disease_id : '',
                            history: props.selectedAppointment.history ? props.selectedAppointment.history : ''
                        }}
                        validationSchema={validationSchema}
                        onSubmit={(data, {resetForm, setSubmitting}) => {
                            setSubmitting(true);
                            saveAppointmentHandler(data, resetForm);
                            setSubmitting(false);
                        }}
                        style={{width:'100%'}}
                    >
                        {({isSubmitting, setFieldValue, errors, touched, values}) => (
                            <Form style={{textAlign: 'left'}} noValidate autoComplete='off'>
                                <Div sx={{flexGrow: 1}}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={6}>
                                            <Div sx={{ mt: 1}}>
                                                <Autocomplete
                                                    id="patient-select"
                                                    options={patientList?.map(patient=>({label:`${patient.patient_name} ${(patient.birth_date ? ' - ( '+moment(patient.birth_date).format("DD-MM-YYYY")+' )' : '')} ${(patient.age && !patient.birth_date ? ' - ( '+patient.age+' )' : '')}`, id: patient._id}))}
                                                    fullWidth
                                                    value={patientList?.map(patient=>({label:`${patient.patient_name} ${(patient.birth_date ? ' - ( '+moment(patient.birth_date).format("DD-MM-YYYY")+' )' : '')} ${(patient.age  && !patient.birth_date? ' - ( '+patient.age+' )' : '')}`, id: patient._id}))?.find((pD)=>pD.id === values.patient_id)}
                                                    onChange={(e, value)=> {
                                                        setFieldValue('patient_id', value?.id);
                                                    }}
                                                    renderInput={(params) => ( <TextField {...params} label="Patient" placeholder="Patient"/> )}
                                                />
                                            </Div>
                                        </Grid>

                                        <Grid item xs={6}>
                                            <Div sx={{ mt: 1}}>
                                                <Autocomplete
                                                    id="doctor-select"
                                                    options={doctorList}
                                                    fullWidth
                                                    value={doctorList?.find(doctor=> doctor.id === values.doctor_id)}
                                                    onChange={(e, value)=> setFieldValue('doctor_id', value?.id)}
                                                    renderInput={(params) => ( <TextField {...params} label="Doctor" placeholder="Doctor"/> )}
                                                />
                                            </Div>
                                        </Grid>

                                        

                                        <Grid item xs={6}>
                                            <Div sx={{ mt: 1}}>
                                                <TextField
                                                    id="complains-text-label"
                                                    fullWidth
                                                    label="Complains"
                                                    multiline
                                                    name="complains"
                                                    onChange={(e)=>setFieldValue('complains', e.target.value)}
                                                    value={values.complains}
                                                    rows={3}
                                                    // defaultValue="Default Value"
                                                />
                                            </Div>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Div sx={{ mt: 1}}>
                                                <TextField
                                                    id="history-text-label"
                                                    fullWidth
                                                    label="History"
                                                    multiline
                                                    onChange={(e)=>setFieldValue('history', e.target.value)}
                                                    value={values.history}
                                                    name="history"
                                                    rows={3}
                                                />
                                            </Div>
                                        </Grid>
                                        
                                        <Grid textAlign={`center`} item xs={12}>
                                            <Div sx={{mt: 1, mb: 1}}>
                                                <LoadingButton
                                                    type="submit"
                                                    variant="contained"
                                                    size="large"
                                                    sx={{mb: 0}}
                                                    loading={isSubmitting}
                                                >
                                                    {
                                                        props.selectedAppointment._id ? ('Update Appointment') : ('Add Appointment')
                                                    }
                                                </LoadingButton>
                                            </Div>
                                        </Grid>
                                    </Grid>
                                </Div>
                            </Form>
                        )}
                    </Formik>
                </Box>
                </DialogContent>
            </Dialog>
        </>        
    );
};

export default ManageAppointment;
