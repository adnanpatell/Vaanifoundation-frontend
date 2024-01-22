import React from 'react';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import IconButton from "@mui/material/IconButton";
import JumboCardQuick from "@jumbo/components/JumboCardQuick";
import AddIcon from '@mui/icons-material/Add';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { Chip } from "@mui/material";
import moment from 'moment';
import EditIcon from '@mui/icons-material/Edit';
import Span from '@jumbo/shared/Span/Span';
import {Link as RouterLink, useLocation, useNavigate} from "react-router-dom";
import Link from '@mui/material/Link';
import { APPOINTMENT_STATUS_COLORS } from 'app/utils/constants/staticData';
import useJumboAuth from "@jumbo/hooks/useJumboAuth";
const AppointmentsList = (props) => {
    const authCtx = useJumboAuth();
    const navigate = useNavigate();
    const rows = props.appointmentList && props.appointmentList.length > 0 ? props.appointmentList.map((row, i)=> ({...row, id:row._id})) : [];
    const roleData = localStorage.getItem("access_token") ? JSON.parse(localStorage.getItem("access_token")) : {};
    const columns = [
        { field: 'appointment_id', headerName: 'Appointment ID', renderCell:(params)=>{
            if(!(authCtx && authCtx.authUser && authCtx.authUser.roleData && authCtx.authUser.roleData.access && authCtx.authUser.roleData.access.appointment.add_appointment)){
                return params.row.appointment_id;
            }
            return (
                <Link
                    component={RouterLink}
                    variant="body2"

                    to={`/appointment/${params.row._id}`}
                    /* onClick={() => {
                        props.setUpdateStatusData(params.row)
                    }} */
                    
                >
                    {params.row.appointment_id}
                </Link>
            )
            }, width: 140 },
        { field: 'patientData.patient_name', valueGetter:(params)=>params.row.patientData.patient_name, headerName: 'Patient Name', width: 220 },
        { field: 'patientData.unique_id', valueGetter:(params)=>params.row.patientData.unique_id, headerName: 'Patient ID', width: 100 },
        { field: 'doctorData.doctor_name', valueGetter:(params)=>params.row.doctorData.doctor_name, headerName: 'Doctor Name', width: 200 },
        { field: 'status', headerName: 'Status', renderCell:(params)=>{
            if(!(authCtx && authCtx.authUser && authCtx.authUser.roleData && authCtx.authUser.roleData.access && authCtx.authUser.roleData.access.appointment.add_appointment))return params.row.status;
            return (
            <Chip onClick={()=>navigate(`/appointment/${params.row._id}`)} sx={{backgroundColor:APPOINTMENT_STATUS_COLORS[params.row.status], color:"#FFF"}} size={"small"} label={params.row.status}/>)
        }, width: 100 },
        { field: 'createdAt', headerName: 'Date', valueGetter:(params)=>moment(params.row.doctorData.createdAt).format("YYYY-MM-DD"), width: 130 },
        { field: 'complains', headerName: 'Complains', width: 250 },
        { field: 'history', headerName: 'History', width: 250 },
        { field: "action", headerName: "Action", width:100, renderCell:(params)=>{
            if(!(authCtx && authCtx.authUser && authCtx.authUser.roleData && authCtx.authUser.roleData.access && authCtx.authUser.roleData.access.appointment.add_appointment)) return '';
            return (
                <Span sx={{whiteSpace: 'nowrap'}}>
                    <IconButton
                        onClick={()=>{
                            props.setSelectedAppointment(params.row)
                            props.handleAppointmentModel();
                        }}
                    >
                        <EditIcon sx={{fontSize: 18}} />
                    </IconButton>
                </Span>
            )
        }}
    ];
    
    return (
        <>
            <JumboCardQuick
                title={`Appointment List`}
                subheader={`Patient appointment with the status`}
                action={
                    <>
                        {
                            authCtx && authCtx.authUser && authCtx.authUser.roleData && authCtx.authUser.roleData.access && authCtx.authUser.roleData.access.appointment.add_appointment ? (
                                <IconButton onClick={props.handleAppointmentModel}>
                                    <AddIcon />
                                </IconButton>
                            ) : ('')
                        }
                        
                        <IconButton onClick={() => props.getAppointmentListHandler()}>
                            <AutorenewIcon/>
                        </IconButton>
                    </>
                }
                wrapperSx={{p: 0}}
            >
                <DataGrid
                    rows={rows} 
                    columns={columns}
                    rowHeight={40}
                    // getRowHeight={() => 'auto'}
                    sx={{
                        [`& .${gridClasses.cell}`]: {
                            py: 0.3,
                        },
                    }}
                    initialState={{
                        pagination: { paginationModel: { pageSize: 20 } },
                    }}
                    pageSizeOptions={[5, 10, 20, 30, 50]}
                />
            </JumboCardQuick>
        </>
        
    );
};

export default AppointmentsList;
