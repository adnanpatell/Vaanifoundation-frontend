import React, {useEffect, useState, useMemo} from 'react';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import IconButton from "@mui/material/IconButton";
import JumboCardQuick from "@jumbo/components/JumboCardQuick";
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { Button, Chip} from "@mui/material";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { successNotification, errorNotification } from 'app/utils/alertNotificationUtility';
import { getCompletedAppointmentList } from '../../redux/actions/appointmentsActions';
import { APPOINTMENT_STATUS_COLORS } from 'app/utils/constants/staticData';
// import { APPOINTMENTS_LIST_COMPLETED } from 'app/utils/constants/appointments';
import { useDispatch } from 'react-redux';
import moment from 'moment';


const NextAppointment = (props) => {
    const dispatch = useDispatch();
    
    // const appointmentList = useSelector((state)=> state.appointments[APPOINTMENTS_LIST_COMPLETED]);

    /* useEffect(()=>{
        dispatch(getCompletedAppointmentList({completed:true}));        
    },[dispatch]); */

    const rows = props.appointmentList && props.appointmentList.length > 0 ? props.appointmentList.map((row, i)=> ({...row, id:row._id})) : [];


    const columns = [
        { field: 'appointment_id', headerName: 'Appointment ID', width: 140 },
        { field: 'patientData.patient_name', valueGetter:(params)=>params.row.patientData.patient_name, headerName: 'Patient Name', width: 250 },
        { field: 'patientData.unique_id', valueGetter:(params)=>params.row.patientData.unique_id, headerName: 'Patient ID', width: 100 },
        { field: 'doctorData.doctor_name', valueGetter:(params)=>params.row.doctorData.doctor_name, headerName: 'Doctor Name', width: 200 },
        { field: 'status', headerName: 'Status', renderCell:(params)=>(<Button size='small' onClick={()=>props.moveToDoctor(params.row)} variant="text" endIcon={<ArrowRightAltIcon/>}>Doctor</Button>), width: 100 },
        { field: 'createdAt', headerName: 'Date', valueGetter:(params)=>moment(params.row.doctorData.createdAt).format("YYYY-MM-DD"), width: 130 },
        { field: 'complains', headerName: 'Complains', width: 250 },
        { field: 'history', headerName: 'History', width: 250 }
    ];
    
    return (
        <>
            {
                (rows && rows.length) ? (
                    <JumboCardQuick
                        title={props.title}
                        subheader={props.subheader}
                        action={
                            <IconButton onClick={() => {
                                if(typeof props.refresh === "function"){
                                    props.refresh();
                                }
                            }}>
                                <AutorenewIcon/>
                            </IconButton>
                        }
                        wrapperSx={{p: 0}}
                        sx={{mt:3}}
                    >
                        <DataGrid
                            rows={rows} 
                            columns={columns}
                            // getRowHeight={() => 'auto'}
                            rowHeight={40}
                            sx={{
                                [`& .${gridClasses.cell}`]: {
                                    py: 0.3,
                                },
                            }}
                            initialState={{ pagination: { paginationModel: { pageSize: 20 } }, }}
                            pageSizeOptions={[5, 10, 20, 30, 50]}
                        />
                    </JumboCardQuick>
                ) : ('')
            }
            
        </>
    );
};
export default NextAppointment;
