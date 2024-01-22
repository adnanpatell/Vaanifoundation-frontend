import React, {useEffect, useReducer, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Table, TableBody, TableCell, TableHead, TableRow, IconButton, Tooltip} from "@mui/material";
import JumboCardQuick from "@jumbo/components/JumboCardQuick";
import {useTranslation} from "react-i18next";
import AddIcon from '@mui/icons-material/Add';
import JumboScrollbar from "@jumbo/components/JumboScrollbar";
import Span from "@jumbo/shared/Span";
import { getMedicineList, deleteMedicine } from '../../redux/actions/medicineActions';
import {Link as RouterLink, useLocation, useNavigate} from "react-router-dom";
import Link from '@mui/material/Link';
import { MEDICINE_LIST } from 'app/utils/constants/medicine';
import EditIcon from '@mui/icons-material/Edit';
import { successNotification, errorNotification } from 'app/utils/alertNotificationUtility';
import { StyledTableRow, StyledTableCell } from "@jumbo/vendors/sweetalert2/hooks";
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from "@mui/material/Button";
import useSwalWrapper from "@jumbo/vendors/sweetalert2/hooks";

const Medicine = (props) => {
    const dispatch = useDispatch();
    const Swal = useSwalWrapper();
    
    const navigate = useNavigate();
    const patientList = useSelector((state)=> state.medicine[MEDICINE_LIST]);
    const rows = patientList && patientList.length > 0 ? patientList.map((row, i)=> ({...row, id:row._id, no:i+1})) : [];

    const columns = [
        { field: 'no', headerName: '#', width: 40 },
        { field: 'name', headerName: 'Name', width: 350 },        
        { field: 'description', headerName: 'Description', width: 280 },
        { field: 'categoryData.name', valueGetter:(params)=>params.row.categoryData.name, headerName: 'Category Name', width: 200 },
        { field: "action", headerName: "Action", width:80, renderCell:(params)=>(
            <Span sx={{whiteSpace: 'nowrap'}}>
                <Link underline={"none"} component={RouterLink} to={`/medicine/manage/${params.row._id}`}>
                    <IconButton>
                        <EditIcon sx={{fontSize: 16}} />
                    </IconButton>
                </Link>
                <IconButton>
                    <DeleteIcon 
                        sx={{fontSize: 16}} 
                        onClick={()=>deleteHandler(params.row._id)}
                    />
                </IconButton>
            </Span>
        )}
    ];

    useEffect(()=>{
        getMedicineListHandler();
    },[]);

    const getMedicineListHandler = () => dispatch(getMedicineList());

    const deleteHandler = (id)=>{
        Swal.fire({
            title: 'Are you sure?',
            text: "Medicine will removed permanently",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true,
        }).then(result => {
            if (result.value) {
                // Swal.fire('Deleted!', 'Medicine has been deleted.', 'success');
                dispatch(deleteMedicine(id, (resData)=>{
                    successNotification(resData?.message);
                    getMedicineListHandler();
                }));
            } 
            /* else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire('Cancelled', 'Your imaginary file is safe :)', 'error');
            } */
        });
    }

    return (
        <>
            <JumboCardQuick
                title={`Medicine List`}
                subheader={`List of Medicine`}
                action={
                    <Tooltip
                        title={`Medicine List`}
                        arrow
                        placement={"top"}
                        sx={{
                            '& .MuiTooltip-arrow': {
                                marginTop: '-0.65em'
                            }
                        }}
                    >
                        <Link underline={"none"} component={RouterLink} to={`/medicine/manage`}>
                            <IconButton>
                                <AddIcon/>
                            </IconButton>
                        </Link>
                    </Tooltip>

                }
                wrapperSx={{p: 0}}
            >
                {   
                    <React.Fragment>
                        
                        <DataGrid
                            rows={rows} 
                            columns={columns}
                            rowHeight={40}
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
                        />
                    </React.Fragment>
                }
            </JumboCardQuick>
            
        </>
    );
};

export default Medicine;
