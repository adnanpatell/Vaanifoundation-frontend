import React, {useEffect, useReducer, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Table, TableBody, TableCell, TableHead, TableRow, IconButton, Tooltip} from "@mui/material";
import JumboCardQuick from "@jumbo/components/JumboCardQuick";
import {useTranslation} from "react-i18next";
import AddIcon from '@mui/icons-material/Add';
import JumboScrollbar from "@jumbo/components/JumboScrollbar";
import Span from "@jumbo/shared/Span";
import { getMedicineCategoryList,getMedicineCategoryData } from '../../redux/actions/medicineCategoryActions';
import {Link as RouterLink, useLocation, useNavigate} from "react-router-dom";
import Link from '@mui/material/Link';
import { MEDICINE_CATEGORY_LIST } from 'app/utils/constants/medicine-category';
import EditIcon from '@mui/icons-material/Edit';
import { successNotification, errorNotification } from 'app/utils/alertNotificationUtility';
import { StyledTableRow, StyledTableCell } from "@jumbo/vendors/sweetalert2/hooks";

const Category = (props) => {
    const dispatch = useDispatch();
    const {t} = useTranslation();
    const navigate = useNavigate();
    const [scroll, setScroll] = useState('paper');    

    useEffect(()=>{
        dispatch(getMedicineCategoryList());
    },[]);

    const patientList = useSelector((state)=> state.medicineCategory[MEDICINE_CATEGORY_LIST]);
    console.log(patientList, "patientList");

    const handleManagePatient = (pId) => {
        dispatch(getMedicineCategoryData({_id: pId},(resData)=>{
            navigate(`/medicine/category/manage/${pId}`)
        }))
    }

    return (
        <>
            <JumboCardQuick
                title={`Medicine Category List`}
                subheader={`List of Medicine Category patients`}
                action={
                    <Tooltip
                        title={`Medicine Category List`}
                        arrow
                        placement={"top"}
                        sx={{
                            '& .MuiTooltip-arrow': {
                                marginTop: '-0.65em'
                            }
                        }}
                    >
                        <Link underline={"none"} component={RouterLink} to={`/medicine/category/manage`}>
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
                        
                        <JumboScrollbar
                            autoHeight={true}
                            autoHideTimeout={4000}
                            autoHeightMin={350}
                            autoHide={true}
                            hideTracksWhenNotNeeded
                        >
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell sx={{pl: 1, pr: 1}}>Category</StyledTableCell>
                                        <StyledTableCell sx={{pl: 1, pr: 1}}>Description</StyledTableCell>
                                        <StyledTableCell sx={{pr: 1}} align={"right"}>Action</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        patientList && patientList.map(item=>{
                                            return (
                                            <StyledTableRow key={item._id}>
                                                <StyledTableCell sx={{pl: 1, pr: 1}}>{item.name}</StyledTableCell>
                                                <StyledTableCell sx={{pl: 1, pr: 1}}>{item.description}</StyledTableCell>
                                                <StyledTableCell align="right">
                                                    <Span sx={{whiteSpace: 'nowrap'}}>
                                                        <Link underline={"none"} component={RouterLink} to={`/medicine/category/manage/${item._id}`}>
                                                            <IconButton>
                                                                <EditIcon sx={{fontSize: 16}} />
                                                            </IconButton>
                                                        </Link>
                                                    </Span>
                                                </StyledTableCell>
                                                
                                            </StyledTableRow>
                                            )
                                        })
                                    }
                                    
                                </TableBody>
                            </Table>
                        </JumboScrollbar>
                    </React.Fragment>
                }
            </JumboCardQuick>
            
        </>
    );
};

export default Category;
