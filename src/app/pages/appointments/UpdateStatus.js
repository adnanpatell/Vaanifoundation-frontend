import React, { useState, useMemo, useEffect} from 'react';
import IconButton from "@mui/material/IconButton";
import Dialog from '@mui/material/Dialog';
import CloseIcon from '@mui/icons-material/Close';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
// import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {Checkbox, Grid, Box, Button, Typography, List, ListItem, Radio, RadioGroup, TextField, Autocomplete, Table, TableHead, TableRow, TableBody, ToggleButtonGroup, ToggleButton, FormGroup} from "@mui/material";
import Div from "@jumbo/shared/Div";
import { uploadFile } from 'app/redux/actions/uploadActions';
import { useDispatch, useSelector } from 'react-redux';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from "@mui/material/FormLabel";
import { APPOINTMENT_STATUS_ARR } from 'app/utils/constants/staticData';
// import moment from 'moment';
import {useDropzone} from "react-dropzone";
import DndWrapper from "./DndWrapper";
import DownloadIcon from '@mui/icons-material/Download';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import AddIcon from '@mui/icons-material/Add';
import { StyledTableCell, StyledTableRow } from '@jumbo/vendors/sweetalert2/hooks';
import { PATIENT_DATA } from 'app/utils/constants/patients';
import { getPatientData, patientAppointments } from 'app/redux/actions/patientActions';
import moment from 'moment';
import { calAge } from 'app/utils/appHelpers';
import PastHistory from './PastHistory';
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;


const baseStyle = {
    borderColor: '#eeeeee',
    color: '#bdbdbd',
};

const activeStyle = {
    borderColor: '#2196f3',
};

const acceptStyle = {
    borderColor: '#00e676',
};

const rejectStyle = {
    borderColor: '#ff1744',
};

const UpdateStatus = (props) => {
    const dispatch = useDispatch();
    
    const [scroll, setScroll] = useState('paper');
    const [medicine, setMedicine] = useState({});
    const [patientsAppointment, setPatientAppointment] = useState([]);
    const {getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject} = useDropzone({
        accept: 'image/*, application/pdf',
        onDropAccepted:(files, event)=>{
            const formData = new FormData();
            formData.append("file", files[0]);
            formData.append("module_type","user_profile");
            formData.append("module_key",props.selectedAppointment.patient_id);
            dispatch(
                uploadFile(formData, (progressRate)=>{
                    // setProgress(progressRate);
                },(resData)=>{
                    if(resData.success && resData.result){
                        props.setLabReports([
                            ...props.labReports,
                            resData.result
                        ]);
                    }
                    
                }),
            );


        }
    });

    useEffect(()=>{
        if(props.selectedAppointment && props.selectedAppointment.patient_id){
            dispatch(getPatientData({patient_id:props.selectedAppointment.patient_id},(resData)=>{
                console.log(resData, "resData");
            }));

            dispatch(patientAppointments({
                patient_id: props.selectedAppointment.patient_id,
                appointment_notin: props.selectedAppointment._id
            }, (resData)=> {
                setPatientAppointment(resData?.result);
            }));
        }

        return () =>{
            dispatch({ type: PATIENT_DATA, payload: {} });
        }
        
    },[props.selectedAppointment]);
    
    const selectedPatient = useSelector((state)=> state.patients[PATIENT_DATA]);

    

    const style = useMemo(
        () => ({
            ...baseStyle,
            ...(isDragActive ? activeStyle : {}),
            ...(isDragAccept ? acceptStyle : {}),
            ...(isDragReject ? rejectStyle : {}),
        }),
        [isDragActive, isDragReject, isDragAccept],
    );

    return (
        <>
            <Dialog
                fullWidth={true}
                maxWidth="xl"
                open={props.appointmentStatusModel}
                onClose={props.handleStatusPopup}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle sx={{mb:0}}>Appointment Status

                    <IconButton
                        aria-label="close"
                        onClick={props.handleStatusPopup}
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
                        <Grid container sx={{
                            justifyContent: 'space-between',
                            alignItems: 'flex-start'
                        }} spacing={1}>
                            <Grid container item spacing={1} xs={6}>
                                <Grid item xs={12}>
                                    <Typography variant={"h4"}>Patiend Details</Typography>
                                    <Table>
                                        <TableBody>
                                            <StyledTableRow>
                                                <StyledTableCell sx={{p:0.5, width:'200px'}}>Patient Name</StyledTableCell>
                                                <StyledTableCell sx={{p:0.5, width:'10px'}}>:</StyledTableCell>
                                                <StyledTableCell component={`td`} sx={{p:0.5, fontWeight:400}}>
                                                    {selectedPatient.patient_name}
                                                </StyledTableCell>
                                            </StyledTableRow>
                                            <StyledTableRow>
                                                <StyledTableCell sx={{p:0.5, width:'200px'}}>Age / Birth Date</StyledTableCell>
                                                <StyledTableCell sx={{p:0.5, width:'10px'}}>:</StyledTableCell>
                                                <StyledTableCell component={`td`} sx={{p:0.5, fontWeight:400}}>
                                                    {
                                                        selectedPatient.age ? selectedPatient.age +" Years " : selectedPatient.birth_date ?  calAge(new Date(selectedPatient.birth_date))+' ' : ''
                                                    }
                                                    /
                                                    {selectedPatient.birth_date ? " "+moment(selectedPatient.birth_date).format("DD-MM-YYYY") : ''}
                                                </StyledTableCell>
                                            </StyledTableRow>
                                            {/* <StyledTableRow>
                                                <StyledTableCell sx={{p:0.5, width:'200px'}}>Patient Uniq ID</StyledTableCell>
                                                <StyledTableCell sx={{p:0.5, width:'10px'}}>:</StyledTableCell>
                                                <StyledTableCell component={`td`} sx={{p:0.5, fontWeight:400}}>
                                                    {selectedPatient.unique_id} 
                                                </StyledTableCell>
                                            </StyledTableRow> */}
                                            <StyledTableRow>
                                                <StyledTableCell sx={{p:0.5, width:'200px'}}>Appointment No.</StyledTableCell>
                                                <StyledTableCell sx={{p:0.5, width:'10px'}}>:</StyledTableCell>
                                                <StyledTableCell component={`td`} sx={{p:0.5, fontWeight:400}}>
                                                    {props.selectedAppointment?.appointment_id} 
                                                </StyledTableCell>
                                            </StyledTableRow>
                                        </TableBody>
                                    </Table>
                                </Grid>

                                {
                                    patientsAppointment && patientsAppointment.length > 0 && (
                                        <Grid item sx={{mt:3}} xs={12}>
                                            <Typography variant={"h4"}>Past Appointment</Typography>
                                            <PastHistory 
                                                historyData={patientsAppointment}
                                            />
                                        </Grid>
                                    )
                                }
                                
                                
                            </Grid>

                            <Grid container item spacing={1} xs={6}>

                                <Grid item xs={12}>
                                    {/* <FormControl>
                                        <FormLabel id="appointment-status-label">Status</FormLabel>
                                        <RadioGroup
                                            row
                                            aria-labelledby="appointment-status-label"
                                            name="appointment_status"
                                            value={props.appointmentStatus ? props.appointmentStatus : null}
                                            onChange={(e)=> {
                                                props.setAppointmentStatus(e.target.value);
                                            }}
                                        >
                                            {
                                                APPOINTMENT_STATUS_ARR.map((st)=>{
                                                    return (
                                                        <FormControlLabel value={st} control={<Radio/>} label={st}/>
                                                    )
                                                })
                                            }
                                        </RadioGroup>
                                    </FormControl> */}
                                    <FormControl>
                                        <FormGroup row sx={{alignItems:'center'}}>
                                            <FormLabel id="appointment-status-label">Status</FormLabel>
                                            <ToggleButtonGroup
                                                color="primary"
                                                sx={{ml:2}}
                                                value={props.appointmentStatus ? props.appointmentStatus : null}
                                                exclusive
                                                onChange={(e)=> {
                                                    props.setAppointmentStatus(e.target.value);
                                                }}
                                            >
                                                {
                                                    APPOINTMENT_STATUS_ARR.filter((st) => {
                                                        if(props.selectedAppointment.status === "Doctor" && !["Pending", "Doctor"].includes(st)){
                                                            return true;
                                                        }else if(props.selectedAppointment.status === "Pharmacy" && !["Pending", "Pharmacy","Complete"].includes(st)){
                                                            return true;
                                                        }else if(props.selectedAppointment.status === "Lab" && !["Pending", "Lab","Complete"].includes(st)){
                                                            return true;
                                                        }else if(["Complete"].includes(props.selectedAppointment.status)){
                                                            return true;
                                                        }else{
                                                            return false;
                                                        }
                                                    }).map((st)=>{
                                                        return (<ToggleButton value={st}>{st}</ToggleButton>)
                                                    })
                                                }
                                            </ToggleButtonGroup>
                                        </FormGroup>
                                    </FormControl>
                                </Grid>

                                {
                                    (props.selectedAppointment.status === "Doctor") ? (
                                        <Grid item xs={12}>
                                            <Div sx={{ mt: 1}}>
                                                <TextField
                                                    id="history-text-label"
                                                    fullWidth
                                                    label="Doctor's Remark"
                                                    disabled={props.selectedAppointment.status !== "Doctor"}
                                                    multiline
                                                    onChange={(e)=>{
                                                        props.setDoctorRemark(e.target.value);
                                                    }}
                                                    value={props.doctorRemarks}
                                                    name="doctors_remark"
                                                    rows={3}
                                                    // defaultValue="Default Value"
                                                />
                                            </Div>
                                        </Grid>
                                    ) : (
                                        <Grid item xs={12}>
                                            <Div sx={{ mt: 1}}>
                                                <FormControl>
                                                    <FormLabel id="appointment-remarks-label">Doctor's Remark</FormLabel>
                                                    <Typography>{props.doctorRemarks}</Typography>
                                                </FormControl>
                                            </Div>
                                        </Grid>
                                    )
                                }

                                {
                                    (props.medicineList && props.selectedAppointment.status === "Doctor") && (
                                        <>
                                            <Grid item xs={4}>
                                                <Div sx={{ mt: 1}}>
                                                    <Autocomplete
                                                        id="disease-select"
                                                        options={props.diseasesList}
                                                        disabled={!(props.medicineList && props.selectedAppointment.status === "Doctor")}
                                                        fullWidth
                                                        // value={props.diseasesList?.find(dis=> dis.id === props.selectedDisease)}
                                                        onChange={(e, value)=> {
                                                            // props.setSelctedDisease(value?.id)
                                                            if(value && value.label){
                                                                setMedicine({
                                                                    disease_id:value && value.id ? value.id : '',
                                                                    disease_name: value.label
                                                                });
                                                            }else{
                                                                setMedicine({});
                                                            }
                                                        }}
                                                        renderInput={(params) => ( <TextField {...params} label="Disease" placeholder="Disease"/> )}
                                                    />
                                                </Div>
                                            </Grid>
                                            <Grid item xs={4}>
                                                <Div sx={{ mt: 1}}>
                                                    <Autocomplete
                                                        id="medicine-list-select"
                                                        options={props.medicineList}
                                                        fullWidth
                                                        value={ props.medicineList?.find((l)=>l.id === medicine.medicine_id) || ''}
                                                        onChange={(e, value)=> {
                                                            if(value && value.label){
                                                                setMedicine({
                                                                    ...medicine,
                                                                    medicine_id:value && value.id ? value.id : '',
                                                                    medicine_name: value.label
                                                                });
                                                            }else{
                                                                setMedicine({});
                                                            }
                                                            
                                                        }}
                                                        renderInput={(params) => ( <TextField {...params} label="Medicine" placeholder="Medicine"/> )}
                                                    />
                                                </Div>
                                            </Grid>
                                            
                                            <Grid item xs={3}>
                                                <Div sx={{ mt: 1}}>
                                                    <Autocomplete
                                                        multiple
                                                        disableCloseOnSelect
                                                        id="medicine-time-select"
                                                        options={["Morning", "Afternoon", "Night"]}
                                                        getOptionLabel={(option) => option}
                                                        fullWidth
                                                        value={medicine && medicine.consume_time ? medicine.consume_time : [] }
                                                        onChange={(e, value)=> {
                                                            setMedicine({
                                                                ...medicine,
                                                                consume_time:value ? value : []
                                                            });
                                                        }}
                                                        renderOption={(props, option, { selected }) => (
                                                            <li {...props}>
                                                            <Checkbox
                                                                icon={icon}
                                                                checkedIcon={checkedIcon}
                                                                style={{ marginRight: 8 }}
                                                                checked={selected}
                                                            />
                                                            {option}
                                                            </li>
                                                        )}
                                                        renderInput={(params) => ( <TextField {...params} label="Medicine time" placeholder="Medicine time"/> )}
                                                    />
                                                </Div>
                                            </Grid>
                                            <Grid item textAlign="end" xs={1}>
                                                <Div textAlign="end" sx={{ mt: 2}}>
                                                    <IconButton 
                                                        aria-label="add-medicine" 
                                                        color="success"
                                                        onClick={()=>{
                                                            let oldMedicine = props.selectedMedicine ? props.selectedMedicine : [];
                                                            // oldMedicine = oldMedicine.filter((md)=>md.id !== medicine.id);
                                                            props.setSelectedMedicine([
                                                                ...oldMedicine,
                                                                medicine
                                                            ]);
                                                            setMedicine({});
                                                        }}
                                                    >
                                                        <AddIcon />
                                                    </IconButton>
                                                    
                                                </Div>
                                            </Grid>
                                            
                                        </>
                                    )
                                }

                                {
                                    (props.selectedMedicine && props.selectedMedicine.length > 0) && (
                                        
                                        <Grid item xs={12}>
                                            <Div sx={{ mt: 1}}>
                                                <FormLabel id="appointment-medicine-label">Medicine List</FormLabel>
                                                <Table>
                                                    <TableHead>
                                                        <TableRow>
                                                            <StyledTableCell sx={{pl: 1, pr: 1}}>No</StyledTableCell>
                                                            <StyledTableCell sx={{pl: 1, pr: 1}}>Deases</StyledTableCell>
                                                            <StyledTableCell sx={{pl: 1, pr: 1}}>Medicine</StyledTableCell>
                                                            <StyledTableCell sx={{pl: 1, pr: 1}}>Timing</StyledTableCell>
                                                            <StyledTableCell sx={{pl: 1, pr: 1}}></StyledTableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                    {
                                                        props.selectedMedicine && props.selectedMedicine.map((sml, mdi)=>{
                                                            return  (
                                                                <>
                                                                    <StyledTableRow key={mdi+"mdi"}>
                                                                        <StyledTableCell sx={{p:0.5}}>{mdi+1}</StyledTableCell>
                                                                        <StyledTableCell sx={{p:0.5}}>{sml.disease_name}</StyledTableCell>
                                                                        <StyledTableCell sx={{p:0.5}}>{sml.medicine_name}</StyledTableCell>
                                                                        <StyledTableCell sx={{p:0.5}}>{sml.consume_time?.join(" / ")}</StyledTableCell>
                                                                        <StyledTableCell sx={{p:0.5}}>
                                                                        {
                                                                            props.selectedAppointment.status === "Doctor" && (
                                                                                <IconButton
                                                                                    aria-label="close"
                                                                                    onClick={(e)=>{
                                                                                        let oldMedicine = props.selectedMedicine ? props.selectedMedicine : [];
                                                                                        let newMedicine = oldMedicine.filter((md)=>md.id !== sml.id);
                                                                                        props.setSelectedMedicine(newMedicine);
                                                                                    }}
                                                                                    sx={{
                                                                                        ml:1,
                                                                                        color: (theme) => theme.palette.grey[500],
                                                                                        p:0
                                                                                    }}
                                                                                    >
                                                                                    <CloseIcon sx={{color:"red"}} />
                                                                                </IconButton>
                                                                            )
                                                                        }
                                                                        </StyledTableCell>                                                                        
                                                                    </StyledTableRow>
                                                                </>
                                                            )
                                                        })
                                                    }
                                                    </TableBody>

                                                </Table>
                                                
                                                
                                            </Div>
                                        </Grid>
                                    )
                                }

                                

                                {
                                    props.selectedAppointment.status === "Lab" && (
                                        <Grid item xs={12}>
                                            <Div sx={{ mt: 1}}>
                                                <FormLabel id="appointment-report-label">Upload Reports</FormLabel>
                                                <DndWrapper 
                                                sx={{
                                                    // borderColor: theme => theme.palette.action.hover
                                                }}>
                                                    <div {...getRootProps({style})}>
                                                        <input {...getInputProps()} />
                                                        <Typography variant={"body1"}>Drag 'n' drop some files here, or click to select files</Typography>
                                                    </div>
                                                </DndWrapper>
                                            </Div>
                                        </Grid>
                                    )
                                }
                                {
                                    (props.labReports && props.labReports.length > 0) && (
                                        <Grid item xs={12}>
                                            <Div sx={{ mt: 1}}>
                                                {/* <Typography variant={"h4"}>Files</Typography> */}
                                                <FormLabel id="appointment-files-label">Report Files</FormLabel>
                                                <List disablePadding sx={{display: 'flex'}}>
                                                {
                                                    props.labReports && props.labReports.map((file)=>{
                                                        return  (
                                                            <>
                                                                <ListItem selected sx={{width: 'auto', pt:0.4, pb:0.4, pr:0, pl:0, mb:1, mr: 1}}>
                                                                    <IconButton
                                                                        aria-label="close"
                                                                        // onClick={handleStatusPopup}
                                                                        sx={{
                                                                            me:1,
                                                                            color: (theme) => theme.palette.grey[500],
                                                                        }}
                                                                        >
                                                                        <DownloadIcon onClick={()=> window.open(file, '_blank')} />
                                                                    </IconButton>
                                                                    {file.split("/").pop()}
                                                                    <IconButton
                                                                        aria-label="close"
                                                                        onClick={()=>{
                                                                            let newRep = props.labReports.filter((rp)=> rp !== file)
                                                                            props.setLabReports(newRep)
                                                                        }}
                                                                        sx={{
                                                                            ml:1,
                                                                            color: (theme) => theme.palette.grey[500],
                                                                        }}
                                                                        >
                                                                        <CloseIcon />
                                                                    </IconButton>
                                                                </ListItem>
                                                            </>
                                                        )
                                                    })
                                                }
                                                </List>
                                            </Div>
                                        </Grid>
                                    )
                                }
                                
                                {/* <Grid textAlign={`center`} item xs={12}>
                                    <Div sx={{mt: 1, mb: 1}}>
                                        <Button
                                            type="button"
                                            variant="contained"
                                            onClick={props.updateSatusHandle}
                                            size="large"
                                            sx={{mb: 0}}
                                        >Update Status</Button>
                                    </Div>
                                </Grid> */}
                            </Grid>
                        </Grid>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button
                        type="button"
                        variant="contained"
                        onClick={props.updateSatusHandle}
                        size="large"
                        sx={{mb: 0}}
                    >Done</Button>
                </DialogActions>
            </Dialog>
        </>
        
    );
};

export default UpdateStatus;
