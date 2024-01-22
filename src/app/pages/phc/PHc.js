import React, {useEffect, useReducer, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Table, TableBody, TableCell, TableHead, TableRow, IconButton, Tooltip} from "@mui/material";
import JumboCardQuick from "@jumbo/components/JumboCardQuick";
import {useTranslation} from "react-i18next";
import AddIcon from '@mui/icons-material/Add';
import JumboScrollbar from "@jumbo/components/JumboScrollbar";
import Span from "@jumbo/shared/Span";
import { getPHcList } from '../../redux/actions/phcActions';
import {Link as RouterLink, useLocation, useNavigate} from "react-router-dom";
import Link from '@mui/material/Link';
import { PHC_LIST } from 'app/utils/constants/phc';
import EditIcon from '@mui/icons-material/Edit';
import { successNotification, errorNotification } from 'app/utils/alertNotificationUtility';
import { StyledTableRow, StyledTableCell } from "@jumbo/vendors/sweetalert2/hooks";

const PHc = (props) => {
    const dispatch = useDispatch();
    

    useEffect(()=>{
        dispatch(getPHcList());
    },[]);

    const patientList = useSelector((state)=> state.phc[PHC_LIST]);
    
    return (
        <>
            <JumboCardQuick
                title={`PHc List`}
                subheader={`List of PHc`}
                action={
                    <Tooltip
                        title={`PHc List`}
                        arrow
                        placement={"top"}
                        sx={{
                            '& .MuiTooltip-arrow': {
                                marginTop: '-0.65em'
                            }
                        }}
                    >
                        <Link underline={"none"} component={RouterLink} to={`/phc/manage`}>
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
                                        <StyledTableCell sx={{pl: 1, pr: 1}}>Name</StyledTableCell>
                                        <StyledTableCell sx={{pl: 1, pr: 1}}>PHc Number</StyledTableCell>
                                        <StyledTableCell sx={{pl: 1, pr: 1}}>Address</StyledTableCell>
                                        <StyledTableCell sx={{pr: 1}} align={"right"}>Action</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        patientList && patientList.map(item=>{
                                            return (
                                            <StyledTableRow key={item._id}>
                                                <StyledTableCell sx={{pl: 1, pr: 1}}>{item.name}</StyledTableCell>
                                                <StyledTableCell sx={{pl: 1, pr: 1}}>{item.phc_number}</StyledTableCell>
                                                <StyledTableCell sx={{pl: 1, pr: 1}}>{item.address}</StyledTableCell>
                                                <StyledTableCell align="right">
                                                    <Span sx={{whiteSpace: 'nowrap'}}>
                                                        <Link underline={"none"} component={RouterLink} to={`/phc/manage/${item._id}`}>
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

export default PHc;
