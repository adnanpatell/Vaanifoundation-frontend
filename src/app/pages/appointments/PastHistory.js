import React, { useState, useMemo, useEffect} from 'react';
import {styled} from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import {Typography, Table, TableHead, TableRow, TableBody, Chip, Link} from "@mui/material";
import { StyledTableCell, StyledTableRow } from '@jumbo/vendors/sweetalert2/hooks';
import DownloadIcon from '@mui/icons-material/Download';
import Div from "@jumbo/shared/Div";
import { MEDICINE_TIME } from 'app/utils/constants/staticData';


const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({theme}) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&:before': {
        display: 'none',
    },
}));

const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{fontSize: '0.9rem'}}/>}
        {...props}
    />
))(({theme}) => ({
    backgroundColor:
        theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, .05)'
            : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
    },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({theme}) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

const PastHistory = (props) => {

    const [expanded, setExpanded] = React.useState(props.historyData?.[0]?._id);
    
    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    useEffect(()=>{
        if(props.historyData && props.historyData.length > 0){
            setExpanded(props.historyData?.[0]?._id)
        }
        return () => setExpanded(false)
    },[props.historyData]);

    return (
        <>  
            {
                props.historyData?.map((pa, pai)=>{
                    return (
                    <Accordion expanded={expanded === pa._id} onChange={handleChange(pa._id)} key={`pai-${pai}`}>
                        <AccordionSummary aria-controls={`${pa._id}d-content`} id={`${pa._id}d-header`}>
                            <Typography>{pa.appointment_id}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Div>
                                <Typography variant={'h5'}>Details</Typography>
                                <Table>
                                    <TableBody>
                                        {
                                            pa.patientData && (
                                                <StyledTableRow>
                                                    <StyledTableCell sx={{p:0.5, width:'200px'}}>
                                                        Treatment by
                                                    </StyledTableCell>
                                                    <StyledTableCell sx={{p:0.5, width:'10px'}}>:</StyledTableCell>
                                                    <StyledTableCell component={`td`} sx={{p:0.5, fontWeight:400}}>
                                                        {pa.doctorData.doctor_name}
                                                    </StyledTableCell>
                                                </StyledTableRow>
                                            )
                                        }
                                        {
                                            pa.complains && (
                                                <StyledTableRow>
                                                    <StyledTableCell sx={{p:0.5, width:'200px'}}>Complaint</StyledTableCell>
                                                    <StyledTableCell sx={{p:0.5, width:'10px'}}>:</StyledTableCell>
                                                    <StyledTableCell component={`td`} sx={{p:0.5, fontWeight:400}}>
                                                        {pa.complains}
                                                    </StyledTableCell>
                                                </StyledTableRow>
                                            )
                                        }
                                        {
                                            pa.doctors_remark && (
                                                <StyledTableRow>
                                                    <StyledTableCell sx={{p:0.5, width:'200px'}}>Doctor's remark</StyledTableCell>
                                                    <StyledTableCell sx={{p:0.5, width:'10px'}}>:</StyledTableCell>
                                                    <StyledTableCell component={`td`} sx={{p:0.5, fontWeight:400}}>
                                                        {pa.doctors_remark}
                                                    </StyledTableCell>
                                                </StyledTableRow>
                                            )
                                        }
                                        {
                                            (pa.lab_reports && pa.lab_reports.length > 0) && (
                                                <StyledTableRow>
                                                    <StyledTableCell sx={{p:0.5, width:'200px'}}>Reports</StyledTableCell>
                                                    <StyledTableCell sx={{p:0.5, width:'10px'}}>:</StyledTableCell>
                                                    <StyledTableCell component={`td`} sx={{p:0.5, fontWeight:400}}>
                                                        {pa.lab_reports.map((urlRe, ri)=>(
                                                            <Link key={`lb-${ri}`} target='_blank' href={urlRe}><Chip sx={{mr:1}} icon={<DownloadIcon/>} label={"Report"}/></Link>)
                                                        )}
                                                    </StyledTableCell>
                                                </StyledTableRow>
                                            )
                                        }
                                        {
                                            pa.patientData && pa.patientData.unique_id && (
                                                <StyledTableRow>
                                                    <StyledTableCell sx={{p:0.5, width:'200px'}}>Patient ID</StyledTableCell>
                                                    <StyledTableCell sx={{p:0.5, width:'10px'}}>:</StyledTableCell>
                                                    <StyledTableCell component={`td`} sx={{p:0.5, fontWeight:400}}>
                                                        {pa.patientData.unique_id}
                                                    </StyledTableCell>
                                                </StyledTableRow>
                                            )
                                        }
                                        {
                                            pa.appointment_id && (
                                                <StyledTableRow>
                                                    <StyledTableCell sx={{p:0.5, width:'200px'}}>Appointment No.</StyledTableCell>
                                                    <StyledTableCell sx={{p:0.5, width:'10px'}}>:</StyledTableCell>
                                                    <StyledTableCell component={`td`} sx={{p:0.5, fontWeight:400}}>
                                                        {pa.appointment_id}
                                                    </StyledTableCell>
                                                </StyledTableRow>
                                            )
                                        }
                                    </TableBody>
                                </Table>
                            </Div>
                            {
                                (pa.medicine && Array.isArray(pa.medicine) && pa.medicine.length > 0) && (
                                    <Div sx={{mt:2}}>
                                        <Typography variant={'h5'}>Medicine Details</Typography>
                                        <Table>
                                            <TableHead>
                                                <StyledTableRow>
                                                    <StyledTableCell component={`th`} sx={{p:0.5, width:'40%'}}>Deases</StyledTableCell>
                                                    <StyledTableCell component={`th`} sx={{p:0.5, width:'40%'}}>Medicine</StyledTableCell>
                                                    <StyledTableCell component={`th`} sx={{p:0.5, width:'20%', textAlign:'right'}}>Timing</StyledTableCell>
                                                </StyledTableRow>
                                            </TableHead>
                                            <TableBody>
                                                {
                                                    pa.medicine.map((mad, paim)=>{
                                                        return (
                                                            <StyledTableRow key={`paim-${paim}`}>
                                                                <StyledTableCell component={`td`} sx={{p:0.5, width:'40%'}}>{mad.disease_name}</StyledTableCell>
                                                                <StyledTableCell component={`td`} sx={{p:0.5, width:'40%'}}>{mad.medicine_name}</StyledTableCell>
                                                                <StyledTableCell component={`td`} sx={{p:0.5, width:'20%', textAlign:'right'}}>{
                                                                    MEDICINE_TIME.map((tv=>{
                                                                        return mad.consume_time ? mad.consume_time.includes(tv) ? '1' : '0' : '0';
                                                                    }))?.join("-")
                                                                }</StyledTableCell>
                                                            </StyledTableRow>
                                                        );
                                                    })
                                                }
                                            </TableBody>
                                        </Table>
                                    </Div>
                                )
                            }
                        </AccordionDetails>
                    </Accordion>
                    )
                })
            }
        </>
        
    );
};

export default PastHistory;
