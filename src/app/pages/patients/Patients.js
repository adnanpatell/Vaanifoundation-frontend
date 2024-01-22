import React, {useEffect, useReducer, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Table, TableBody, TableCell, TableHead, TableRow, IconButton, Tooltip} from "@mui/material";
import JumboCardQuick from "@jumbo/components/JumboCardQuick";
import {useTranslation} from "react-i18next";
import AddIcon from '@mui/icons-material/Add';
import JumboScrollbar from "@jumbo/components/JumboScrollbar";
import Span from "@jumbo/shared/Span";
import { getPatientList,getPatientData, deletePatiente, deleteManyPatiente } from '../../redux/actions/patientActions';
import {Link as RouterLink, useLocation, useNavigate} from "react-router-dom";
import Link from '@mui/material/Link';
import { PATIENT_LIST } from 'app/utils/constants/patients';
import EditIcon from '@mui/icons-material/Edit';
import { successNotification, errorNotification } from 'app/utils/alertNotificationUtility';
import { StyledTableRow, StyledTableCell } from "@jumbo/vendors/sweetalert2/hooks";
import { DataGrid, gridClasses, useGridApiRef } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from "@mui/material/Button";
import useSwalWrapper from "@jumbo/vendors/sweetalert2/hooks";

const Patients = (props) => {
    const dispatch = useDispatch();
    const Swal = useSwalWrapper();
    const {t} = useTranslation();
    const navigate = useNavigate();
    const [scroll, setScroll] = useState('paper');    
    const [selectedRows, setSelectedRows] = useState([]);
    const apiRef = useGridApiRef();
    useEffect(()=>{
        dispatch(getPatientList());
    },[]);

    const handlePatientist = () => dispatch(getPatientList());

    const patientList = useSelector((state)=> state.patients[PATIENT_LIST]);
    
    const handleManagePatient = (pId) => {
        dispatch(getPatientData({patient_id: pId},(resData)=>{
            navigate(`/patients/manage/${pId}`)
        }))
    }

    console.log(selectedRows, "selectedRows")
    const deleteHandler = (id)=>{
        Swal.fire({
            title: 'Are you sure?',
            text: "Patient will removed permanently",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true,
        }).then(result => {
            if (result.value) {
                // Swal.fire('Deleted!', 'Medicine has been deleted.', 'success');
                dispatch(deletePatiente(id, (resData)=>{
                    successNotification(resData?.message);
                    handlePatientist();
                }));
            } 
            /* else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire('Cancelled', 'Your imaginary file is safe :)', 'error');
            } */
        });
    }

    const deleteManyHandler = (ids)=>{
        Swal.fire({
            title: 'Are you sure?',
            text: "Patient will removed permanently",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true,
        }).then(result => {
            if (result.value) {
                // Swal.fire('Deleted!', 'Medicine has been deleted.', 'success');
                dispatch(deleteManyPatiente({ids:ids}, (resData)=>{
                    successNotification(resData?.message);
                    handlePatientist();
                }));
            } 
            /* else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire('Cancelled', 'Your imaginary file is safe :)', 'error');
            } */
        });
    }

    const rows = patientList && patientList.length > 0 ? patientList.map((row, i)=> {
            
            return {...row, id:row._id, no:i+1}
        }
    ) : [];

    const columns = [
        
        { field: 'no', headerName: '#', width: 40 },
        { field: 'unique_id', headerName: 'Patient Id', width: 130 },        
        { field: 'first_name', headerName: 'Name', valueGetter:(params)=>(params.row.patient_name), width: 240 },
        { field: 'mobile', headerName: 'Mobile', width: 130 },
        { field: 'email', headerName: 'Email', width: 230 },
        { field: 'gender', headerName: 'Gender', width: 70 },
        { field: "action", headerName: "Action", width:80, renderCell:(params)=>(
            <Span sx={{whiteSpace: 'nowrap'}}>
                <IconButton
                    onClick={()=> handleManagePatient(params.row._id)}
                >
                    <EditIcon sx={{fontSize: 16}} />
                </IconButton>
                <IconButton
                    onClick={()=>deleteHandler(params.row._id)}
                >
                    <DeleteIcon sx={{fontSize: 16}} />
                </IconButton>
            </Span>
        )}
    ];

    return (
        <>
            <JumboCardQuick
                title={`Patients List`}
                subheader={`List of created patients`}
                action={
                    <Tooltip
                        title={`Patients List`}
                        arrow
                        placement={"top"}
                        sx={{
                            '& .MuiTooltip-arrow': {
                                marginTop: '-0.65em'
                            }
                        }}
                    >
                        <>
                            <IconButton
                                onClick={()=>{
                                    let rowsData = apiRef.current.state.rowSelection;
                                    if(rowsData && rowsData.length > 0){
                                        deleteManyHandler(rowsData)
                                    }
                                }}
                            >
                                <DeleteIcon sx={{fontSize: 16}} />
                            </IconButton>
                            <Link underline={"none"} component={RouterLink} to={`/patients/manage`}>
                                <IconButton>
                                    <AddIcon/>
                                </IconButton>                            
                            </Link>
                        </>
                    </Tooltip>

                }
                wrapperSx={{p: 0}}
            >
                <DataGrid
                    apiRef={apiRef} 
                    rows={rows} 
                    columns={columns}
                    // rowHeight={40}
                    getRowHeight={() => 'auto'}
                    sx={{
                        [`& .${gridClasses.cell}`]: {
                            py: 0.3,
                        },
                    }}
                    initialState={{
                        pagination: { paginationModel: { pageSize: 20 } },
                    }}
                    pageSizeOptions={[5, 10, 20, 30, 50]}
                    checkboxSelection
                    disableRowSelectionOnClick
                    
                />
            </JumboCardQuick>
            
        </>
    );
};

export default Patients;
