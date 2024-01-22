import React, { useEffect, useState} from 'react';
import { successNotification, errorNotification } from 'app/utils/alertNotificationUtility';
import { getAppointmentList, saveAppointment, getCompletedAppointmentList, getPendingAppointmentList } from '../../redux/actions/appointmentsActions';
import { getUserList } from '../../redux/actions/userActions';
import { getPatientList } from '../../redux/actions/patientActions';
import { getMedicineList } from '../../redux/actions/medicineActions';
import { getDiseasesList } from 'app/redux/actions/diseasesActions';
import { APPOINTMENTS_LIST, APPOINTMENTS_LIST_COMPLETED, APPOINTMENTS_LIST_PENDING } from 'app/utils/constants/appointments';
import { useDispatch, useSelector } from 'react-redux';
import CompletedAppointment from './CompletedAppointment';
import AppointmentsList from './AppointmentsList';
// import UpdateStatus from './UpdateStatus';
import { MEDICINE_LIST } from 'app/utils/constants/medicine';
import ManageAppointment from './ManageAppointment';
import { DISEASES_LIST } from 'app/utils/constants/diseases';
import NextAppointment from './NextAppointment';
import Div from '@jumbo/shared/Div/Div';
import { Typography } from '@mui/material';
import useJumboAuth from "@jumbo/hooks/useJumboAuth";

const Appointments = (props) => {
    const dispatch = useDispatch();
    const authCtx = useJumboAuth();
    const roleData = localStorage.getItem("access_token") ? JSON.parse(localStorage.getItem("access_token")) : {};
    const [appointmentStatus, setAppointmentStatus] = useState("");
    const [doctorRemarks, setDoctorRemark] = useState("");
    const [labReports, setLabReports] = useState([]);
    const [selectedMedicine, setSelectedMedicine] = useState([{}]);
    const [viewAppointmentModel, setViewAppointmentModel] = useState(false);
    const [appointmentStatusModel, setAppointmentStatusModel] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState(false);
    const [selectedDisease, setSelctedDisease] = useState("");
    const [viewPatientData, setViewPatientdata] = useState(false);

    const appointmentList = useSelector((state)=> state.appointments[APPOINTMENTS_LIST]);
    const completedAppointmentList = useSelector((state)=> state.appointments[APPOINTMENTS_LIST_COMPLETED]);
    const pendingAppintmentList = useSelector((state)=> state.appointments[APPOINTMENTS_LIST_PENDING]);
    const medicineList = useSelector((state)=> {
        if(state.medicine[MEDICINE_LIST]){
            return state.medicine[MEDICINE_LIST]?.map((medicine)=>({label:medicine.description,id:medicine._id}))
        }else{
            return []
        }
    });
    const diseasesList = useSelector((state)=> {
        if(state.diseases[DISEASES_LIST]){
            return state.diseases[DISEASES_LIST]?.map((dis)=>({label:dis.name,id:dis._id}))
        }else{
            return []
        }
    });
    
    useEffect(()=>{
        dispatch(getAppointmentList());
        dispatch(getPatientList());
        dispatch(getUserList());
        if(roleData && roleData.role === "doctor"){
            dispatch(getPendingAppointmentList({pending:true}));
        }
        dispatch(getCompletedAppointmentList({completed:true}));
        dispatch(getMedicineList());
        dispatch(getDiseasesList());

        const interval = setInterval(() => {
            dispatch(getAppointmentList());
            if(roleData && roleData.role === "doctor"){
                dispatch(getPendingAppointmentList({pending:true}));
            }
            dispatch(getCompletedAppointmentList({completed:true}));
        }, 10000);
  
        //Clearing the interval
        return () => {
            clearInterval(interval);
            dispatch({ type: APPOINTMENTS_LIST, payload: [] });
        };
        
    },[dispatch]);

    const handleStatusPopup = () => {
        if(appointmentStatusModel){
            setSelectedAppointment({});
        }
        setAppointmentStatusModel(!appointmentStatusModel);
    }

    const setUpdateStatusData = (apData) => {
        setSelectedAppointment(apData);
        setAppointmentStatus(apData?.status);
        setDoctorRemark(apData?.doctors_remark);
        setLabReports(apData?.lab_reports ? apData?.lab_reports : []);
        setSelectedMedicine(apData.medicine);
        setSelctedDisease(apData.disease_id);
        handleStatusPopup();
    }

    const handleAppointmentModel = () => {
        if(viewAppointmentModel){
            setSelectedAppointment({});
        }
        setViewAppointmentModel(!viewAppointmentModel);
    };

    const getAppointmentListHandler = () => {
        dispatch(getAppointmentList((resData)=>{
            console.log(resData, "resData");
        }));
    }

    const updateSatusHandle = () => {
        if(selectedAppointment && selectedAppointment._id){
            let updObj = {_id: selectedAppointment._id};
            updObj.status = appointmentStatus;
            if(selectedAppointment.status === "Doctor"){
                updObj.doctors_remark = doctorRemarks;
                updObj.medicine = selectedMedicine;
                updObj.disease_id = selectedDisease;
            }

            if(selectedAppointment.status === "Lab"){
                updObj.lab_reports = labReports;
            }
            dispatch(saveAppointment(updObj, (insRS)=>{
                if(insRS.success){
                    successNotification( ( insRS && insRS.message ? insRS.message : 'Appointment updated successfully'));
                }else{
                    errorNotification( insRS && insRS.message ? insRS.message : "Something went wrong.")
                }
                handleStatusPopup();
                setAppointmentStatus("");
                getAppointmentListHandler();
                dispatch(getCompletedAppointmentList({completed:true}));
            }));
        }
    }

    const moveToDoctor = (appt) => {
        if(appt && appt._id){
            let updObj = {_id: appt._id};
            updObj.status = 'Doctor';
            
            dispatch(saveAppointment(updObj, (insRS)=>{
                if(insRS.success){
                    successNotification( ( insRS && insRS.message ? insRS.message : 'Appointment updated successfully'));
                }else{
                    errorNotification( insRS && insRS.message ? insRS.message : "Something went wrong.")
                }
                // handleStatusPopup();
                // setAppointmentStatus("");
                getAppointmentListHandler();
                dispatch(getPendingAppointmentList({pending:true}));
                dispatch(getCompletedAppointmentList({completed:true}));
            }));
        }
    }
    
    return (
        <>
            
            <Div sx={{width: '100%'}}>
                <Typography variant="h1" component="div" gutterBottom>
                   {authCtx && authCtx.authUser && authCtx.authUser.phcData ? authCtx.authUser.phcData.name : ''} {authCtx && authCtx.authUser && authCtx.authUser.phcData ? " - "+authCtx.authUser.phcData.phc_number+ " / " : ''} { (roleData.role?.charAt(0)?.toUpperCase() + roleData.role?.slice(1)?.split("_")?.join(" "))} Dashboard
                </Typography>
            </Div>
            <AppointmentsList 
                appointmentList={appointmentList}
                setSelectedAppointment={setSelectedAppointment}
                handleAppointmentModel={handleAppointmentModel}
                getAppointmentListHandler={getAppointmentListHandler}
                setUpdateStatusData={setUpdateStatusData}
            />

            {
                (roleData && roleData.role === "doctor" && pendingAppintmentList && pendingAppintmentList.length > 0) && (
                    <NextAppointment 
                        title={`Next Appointment List`}
                        subheader={`Patient pending appointment`}
                        refresh={()=>{
                            dispatch(getPendingAppointmentList({pending:true}));
                        }}
                        appointmentList={pendingAppintmentList}
                        moveToDoctor={moveToDoctor} 
                    />
                )
            }

            {
                (completedAppointmentList && completedAppointmentList.length > 0) && (
                    <CompletedAppointment 
                        title={`Completed Appointment List`}
                        subheader={`Patient completed appointment`}
                        refresh={()=>{
                            dispatch(getCompletedAppointmentList({completed:true}));
                        }}
                        appointmentList={completedAppointmentList}
                        setUpdateStatusData={setUpdateStatusData} 
                        setAppointmentStatus={setAppointmentStatus}
                    />
                )
            }

            <ManageAppointment 
                viewAppointmentModel={viewAppointmentModel}
                setViewAppointmentModel={setViewAppointmentModel}
                selectedAppointment={selectedAppointment}
                handleAppointmentModel={handleAppointmentModel}
                getAppointmentListHandler={getAppointmentListHandler}
            />

            {/* <UpdateStatus
                appointmentStatusModel={appointmentStatusModel}
                handleStatusPopup={handleStatusPopup}
                appointmentStatus={appointmentStatus}
                setAppointmentStatus={setAppointmentStatus}
                selectedAppointment={selectedAppointment}
                setDoctorRemark={setDoctorRemark}
                doctorRemarks={doctorRemarks}
                medicineList={medicineList}
                setSelectedMedicine={setSelectedMedicine}
                selectedMedicine={selectedMedicine}
                diseasesList={diseasesList}
                selectedDisease={selectedDisease}
                setSelctedDisease={setSelctedDisease}
                labReports={labReports}
                setLabReports={setLabReports}
                updateSatusHandle={updateSatusHandle}
            /> */}
        </>
        
    );
};

export default Appointments;
