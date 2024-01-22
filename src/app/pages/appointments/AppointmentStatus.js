import React, { useState, useMemo, useEffect} from 'react';
import IconButton from "@mui/material/IconButton";
import Dialog from '@mui/material/Dialog';
import CloseIcon from '@mui/icons-material/Close';
import JumboCardQuick from "@jumbo/components/JumboCardQuick";
import {Checkbox, Grid, Box, Button, Typography, List, ListItem, Radio, RadioGroup, TextField, Autocomplete, Table, TableHead, TableRow, TableBody, ToggleButtonGroup, ToggleButton, FormGroup, DialogContent, DialogTitle, DialogActions, ListItemText, OutlinedInput, InputLabel} from "@mui/material";
import Div from "@jumbo/shared/Div";
import { uploadFile } from 'app/redux/actions/uploadActions';
import { useDispatch, useSelector } from 'react-redux';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from "@mui/material/FormLabel";
import { APPOINTMENT_STATUS_ARR, MEDICINE_TIME } from 'app/utils/constants/staticData';
// import moment from 'moment';
import {useDropzone} from "react-dropzone";
import DndWrapper from "./DndWrapper";
import DownloadIcon from '@mui/icons-material/Download';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import AddIcon from '@mui/icons-material/Add';
import { StyledTableCell, StyledTableRow } from '@jumbo/vendors/sweetalert2/hooks';
import { PATIENT_DATA } from 'app/utils/constants/patients';
import { getPatientData, patientAppointments } from 'app/redux/actions/patientActions';
import moment from 'moment';
import { calAge } from 'app/utils/appHelpers';
import PastHistory from './PastHistory';
import { getAppointmentData, saveAppointment } from 'app/redux/actions/appointmentsActions';
import { useNavigate, useParams } from 'react-router-dom';
import { APPOINTMENTS_DATA } from 'app/utils/constants/appointments';
import { errorNotification, successNotification } from 'app/utils/alertNotificationUtility';
import { getMedicineList } from 'app/redux/actions/medicineActions';
import { getDiseasesList } from 'app/redux/actions/diseasesActions';
import { MEDICINE_LIST } from 'app/utils/constants/medicine';
import { DISEASES_LIST } from 'app/utils/constants/diseases';
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

const AppointmentStatus = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { appointment_id } = useParams();
    const [scroll, setScroll] = useState('paper');
    const [medicineModel, setMedicineModel] = useState(false);
    const [medicine, setMedicine] = useState({});
    const [appointmentValue, setAppointmentValue] = useState({});
    const [patientsAppointment, setPatientAppointment] = useState([]);

    const selectedAppointment = useSelector((state)=> state.appointments[APPOINTMENTS_DATA])
    const selectedPatient = useSelector((state)=> state.patients[PATIENT_DATA]);
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

    const {getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject} = useDropzone({
        accept: 'image/*, application/pdf',
        onDropAccepted:(files, event)=>{
            const formData = new FormData();
            formData.append("file", files[0]);
            formData.append("module_type","user_profile");
            formData.append("module_key",selectedAppointment.patient_id);
            dispatch(
                uploadFile(formData, (progressRate)=>{
                    // setProgress(progressRate);
                },(resData)=>{
                    if(resData.success && resData.result){
                        handleInputChange('lab_reports',[
                            ...(Array.isArray(appointmentValue.lab_reports) ? appointmentValue.lab_reports : []),
                            resData.result
                        ]);
                    }
                    
                }),
            );


        }
    });
    
    useEffect(()=>{
        dispatch(getAppointmentData({_id:appointment_id}, (resData)=>{
            setAppointmentValue(resData.data?.result)
        }));
        dispatch(getMedicineList());
        dispatch(getDiseasesList());
        return () => {
            dispatch({ type: MEDICINE_LIST, payload: [] });
            dispatch({ type: DISEASES_LIST, payload: [] });
        }
    },[appointment_id, dispatch])

    useEffect(()=>{
        if(selectedAppointment && selectedAppointment.patient_id){
            dispatch(getPatientData({patient_id:selectedAppointment.patient_id}));

            dispatch(patientAppointments({
                patient_id: selectedAppointment.patient_id,
                appointment_notin: selectedAppointment._id
            }, (resData)=> {
                setPatientAppointment(resData?.result);
            }));
        }

        return () =>{
            dispatch({ type: PATIENT_DATA, payload: {} });
            setPatientAppointment([]);
        }
        
    },[dispatch, selectedAppointment]);

    const handleMedicineModel = () =>{
        setMedicineModel(!medicineModel)
    }

    const handleAddMedicine = () => {
        setMedicineModel(false);
    }

    const style = useMemo(
        () => ({
            ...baseStyle,
            ...(isDragActive ? activeStyle : {}),
            ...(isDragAccept ? acceptStyle : {}),
            ...(isDragReject ? rejectStyle : {}),
        }),
        [isDragActive, isDragReject, isDragAccept],
    );

    const handleInputChange = (name, val) => {
        setAppointmentValue({
            ...appointmentValue,
            [name]: val
        })
    }

    const updateStatusHandle = () => {
        if(selectedAppointment && selectedAppointment._id){
            
            dispatch(saveAppointment(appointmentValue, (insRS)=>{
                if(insRS.success){
                    successNotification( ( insRS && insRS.message ? insRS.message : 'Appointment updated successfully'));
                }else{
                    errorNotification( insRS && insRS.message ? insRS.message : "Something went wrong.")
                }
                navigate('/dashboard')
                // handleStatusPopup();
                // setAppointmentStatus("");
                // getAppointmentListHandler();
                // dispatch(getCompletedAppointmentList({completed:true}));
            }));
        }
    }

    return (
        <>
            <JumboCardQuick
                title={`Manage Appointment`}
                subheader={`Appointment ID : ${selectedAppointment.appointment_id}`}
                wrapperSx={{p: 2}}
            >
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
                    }} spacing={2}>
                        <Grid container item xs={5}>
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
                                                {selectedAppointment.appointment_id} 
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

                        <Grid container item xs={7}>

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
                                            value={appointmentValue.status ? appointmentValue.status : null}
                                            exclusive
                                            onChange={(e)=> {
                                                handleInputChange('status',e.target.value);
                                            }}
                                        >
                                            {
                                                APPOINTMENT_STATUS_ARR.filter((st) => {
                                                    if(selectedAppointment?.status === "Doctor" && !["Pending", "Doctor"].includes(st)){
                                                        return true;
                                                    }else if(selectedAppointment.status === "Pharmacy" && !["Pending", "Pharmacy"].includes(st)){
                                                        return true;
                                                    }else if(selectedAppointment.status === "Pending" && !["Pending", "Pharmacy","Complete", "Lab"].includes(st)){
                                                        return true;
                                                    }else if(selectedAppointment.status === "Lab" && !["Pending", "Lab","Complete"].includes(st)){
                                                        return true;
                                                    }else if(["Complete"].includes(selectedAppointment.status)){
                                                        return true;
                                                    }else{
                                                        return false;
                                                    }
                                                }).map((st, tgli)=>{
                                                    return (<ToggleButton key={`tgl-${tgli}`} fullWidth value={st}>{st}</ToggleButton>)
                                                })
                                            }
                                        </ToggleButtonGroup>
                                    </FormGroup>
                                </FormControl>
                            </Grid>

                            {
                                (selectedAppointment.status === "Doctor") ? (
                                    <Grid item xs={12}>
                                        <Div sx={{ mt: 1}}>
                                            <TextField
                                                id="history-text-label"
                                                fullWidth
                                                label="Doctor's Remark"
                                                disabled={selectedAppointment.status !== "Doctor"}
                                                multiline
                                                onChange={(e)=>{
                                                    handleInputChange('doctors_remark',e.target.value);
                                                }}
                                                value={appointmentValue.doctors_remark}
                                                name="doctors_remark"
                                                rows={2}
                                                // defaultValue="Default Value"
                                            />
                                        </Div>
                                    </Grid>
                                ) : (
                                    <Grid item xs={12}>
                                        <Div sx={{ mt: 1}}>
                                            <FormControl>
                                                <FormLabel id="appointment-remarks-label">Doctor's Remark</FormLabel>
                                                <Typography>{appointmentValue.doctors_remark ? appointmentValue.doctors_remark : 'N/A'}</Typography>
                                            </FormControl>
                                        </Div>
                                    </Grid>
                                )
                            }
                            
                            {
                                (medicineList && selectedAppointment.status === "Doctor") && (
                                    <Grid alignItems={'center'} container item xs={12}>
                                        <Grid item xs={6}>
                                            <FormLabel id="appointment-medicine-label">Medicine</FormLabel>
                                        </Grid>
                                        <Grid item textAlign={'end'} xs={6}>
                                            <IconButton 
                                                aria-label="add-medicine" 
                                                color="success"
                                                onClick={()=>{
                                                    handleMedicineModel()
                                                }}
                                            >
                                                <AddIcon />
                                            </IconButton>
                                        </Grid>
                                    </Grid>
                                )                            
                            }
                            
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
                                            (appointmentValue.medicine && Array.isArray(appointmentValue.medicine)) ? 
                                            (
                                                <>
                                                {
                                                    appointmentValue.medicine.map((sml, mdi)=>{
                                                        return  (
                                                            <>
                                                                <StyledTableRow key={mdi+"mdiv"}>
                                                                    <StyledTableCell sx={{p:0.5}}>{mdi+1}</StyledTableCell>
                                                                    <StyledTableCell sx={{p:0.5}}>{sml.disease_name}</StyledTableCell>
                                                                    <StyledTableCell sx={{p:0.5}}>{sml.medicine_name}</StyledTableCell>
                                                                    <StyledTableCell sx={{p:0.5}}>{ MEDICINE_TIME.map((tv=>{
                                                                        return sml.consume_time ? sml.consume_time.includes(tv) ? '1' : '0' : '0';
                                                                    }))?.join("-")}</StyledTableCell>
                                                                    <StyledTableCell sx={{p:0.5}}>
                                                                    {
                                                                        selectedAppointment.status === "Doctor" && (
                                                                            <IconButton
                                                                                aria-label="close"
                                                                                onClick={(e)=>{
                                                                                    let oldMedicine = appointmentValue.medicine ? appointmentValue.medicine : [];
                                                                                    let newMedicine = oldMedicine.filter((md, fmdi)=> fmdi !== mdi);
                                                                                    // props.setSelectedMedicine(newMedicine);
                                                                                    handleInputChange('medicine', newMedicine)
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
                                                </>
                                            ) : (
                                                <TableRow>
                                                    <StyledTableCell sx={{textAlign:'center'}} colSpan={5}>
                                                        <Typography>
                                                            No medicine Added
                                                        </Typography>
                                                    </StyledTableCell>
                                                </TableRow>
                                            )
                                        }
                                        </TableBody>

                                    </Table>
                                    
                                    
                                </Div>
                            </Grid>

                            

                            {
                                selectedAppointment.status === "Lab" && (
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
                                (appointmentValue.lab_reports && appointmentValue.lab_reports.length > 0) && (
                                    <Grid item xs={12}>
                                        <Div sx={{ mt: 1}}>
                                            {/* <Typography variant={"h4"}>Files</Typography> */}
                                            <FormLabel id="appointment-files-label">Report Files</FormLabel>
                                            <List disablePadding sx={{display: 'flex'}}>
                                            {
                                                appointmentValue.lab_reports && appointmentValue.lab_reports.map((file, lif)=>{
                                                    return  (
                                                        <>
                                                            <ListItem selected sx={{width: 'auto', pt:0.4, pb:0.4, pr:0, pl:0, mb:1, mr: 1}} key={`key-lif-${lif}`}>
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
                                                                        let newRep = appointmentValue.lab_reports.filter((rp)=> rp !== file)
                                                                        handleInputChange('lab_reports', newRep)
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
                            
                            <Grid textAlign={`center`} item xs={12}>
                                <Div sx={{mt: 1, mb: 1}}>
                                    <Button
                                        type="button"
                                        variant="contained"
                                        onClick={updateStatusHandle}
                                        size="large"
                                        sx={{mb: 0}}
                                    >Done</Button>
                                </Div>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </JumboCardQuick>

            <Dialog
                fullWidth={true}
                maxWidth="lg"
                open={medicineModel}
                onClose={handleMedicineModel}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle sx={{mb:0}}>Manage Medicine

                    <IconButton
                        aria-label="close"
                        onClick={handleMedicineModel}
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
                        }} spacing={2}>
                            {
                                (medicineList && diseasesList && selectedAppointment.status === "Doctor") && (
                                    <>
                                        <Grid item xs={4}>
                                            <Div sx={{ mt: 1}}>
                                                <Autocomplete
                                                    id="disease-select"
                                                    options={diseasesList}
                                                    disabled={!(medicineList && selectedAppointment.status === "Doctor")}
                                                    fullWidth
                                                    value={diseasesList?.find(dis=> dis.id === medicine.disease_id) || null}
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
                                                    options={medicineList}
                                                    fullWidth
                                                    value={ medicineList?.find((l)=>l.id === medicine.medicine_id) || null}
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
                                                
                                                <FormControl fullWidth>
                                                <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
                                                    <Select
                                                        labelId="demo-multiple-checkbox-label"
                                                        id="demo-multiple-checkbox"
                                                        multiple
                                                        fullWidth
                                                        value={medicine && medicine.consume_time ? medicine.consume_time : []}
                                                        onChange={(e)=>{
                                                            setMedicine({
                                                                ...medicine,
                                                                consume_time:e.target.value
                                                            });
                                                        }}
                                                        input={<OutlinedInput label="Tag" />}
                                                        renderValue={(selected) => MEDICINE_TIME.map((tv=>{
                                                            return selected ? selected.includes(tv) ? '1' : '0' : '0';
                                                        }))?.join("-")}
                                                        // MenuProps={MenuProps}
                                                        >
                                                        {MEDICINE_TIME.map((name, pin) => (
                                                            <MenuItem key={`${name}-${pin}-cid`} value={name}>
                                                                <Checkbox checked={medicine.consume_time ? medicine.consume_time.includes(name) : false} />
                                                                <ListItemText primary={name} />
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </Div>
                                        </Grid>
                                        <Grid item textAlign="end" xs={1}>
                                            <Div textAlign="end" sx={{ mt: 2}}>
                                                <IconButton 
                                                    aria-label="add-medicine" 
                                                    color="success"
                                                    onClick={()=>{
                                                        let oldMedicine = Array.isArray(appointmentValue.medicine) ? appointmentValue.medicine : [];
                                                        handleInputChange("medicine", [
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
                        </Grid>
                        
                        {
                            appointmentValue.medicine && (
                                appointmentValue.medicine.map((mdData, madIndex)=>{

                                    return (
                                        <Grid container sx={{
                                            justifyContent: 'space-between',
                                            alignItems: 'flex-start'
                                        }} 
                                        spacing={2}
                                        key={`${madIndex}-mdci`}
                                        
                                        >
                                            <Grid item xs={4}>
                                                <Div sx={{ mt: 1}}>
                                                    <Autocomplete
                                                        id={`disease-select-${madIndex}`}
                                                        options={diseasesList}
                                                        disabled={!(medicineList && selectedAppointment.status === "Doctor")}
                                                        fullWidth
                                                        value={diseasesList?.find(dis=> dis.id === mdData.disease_id)}
                                                        onChange={(e, value)=> {
                                                            let newCon = {
                                                                ...appointmentValue.medicine[madIndex],
                                                                disease_id:value && value.id ? value.id : '',
                                                                disease_name: value.label
                                                            }
                                                            appointmentValue.medicine[madIndex] = newCon;
                                                            handleInputChange('medicine', appointmentValue.medicine);
                                                            
                                                        }}
                                                        renderInput={(params) => ( <TextField {...params} label="Disease" placeholder="Disease"/> )}
                                                    />
                                                </Div>
                                            </Grid>
                                            <Grid item xs={4}>
                                                <Div sx={{ mt: 1}}>
                                                    <Autocomplete
                                                        id={`medicine-list-select-${madIndex}`}
                                                        options={medicineList}
                                                        fullWidth
                                                        value={ medicineList?.find((l)=>l.id === mdData.medicine_id) || null}
                                                        onChange={(e, value)=> {
                                                            let newCon = {
                                                                ...appointmentValue.medicine[madIndex],
                                                                medicine_id:value && value.id ? value.id : '',
                                                                medicine_name: value.label
                                                            }
                                                            appointmentValue.medicine[madIndex] = newCon;
                                                            handleInputChange('medicine', appointmentValue.medicine);
                                                        }}
                                                        renderInput={(params) => ( <TextField {...params} label="Medicine" placeholder="Medicine"/> )}
                                                    />
                                                </Div>
                                            </Grid>
                                            
                                            <Grid item xs={3}>
                                                <Div sx={{ mt: 1}}>                                                
                                                    <FormControl fullWidth>
                                                        <InputLabel id={`demo-multiple-checkbox-label-${madIndex}`}>Tag</InputLabel>
                                                        <Select
                                                            labelId={`demo-multiple-checkbox-label-${madIndex}`}
                                                            id={`demo-multiple-checkbox-${madIndex}`}
                                                            multiple
                                                            fullWidth
                                                            value={ mdData.consume_time && Array.isArray( mdData.consume_time) ?  mdData.consume_time : []}
                                                            onChange={(e)=>{
                                                                let newCon = {
                                                                    ...appointmentValue.medicine[madIndex],
                                                                    consume_time: e.target.value
                                                                }
                                                                appointmentValue.medicine[madIndex] = newCon;
                                                                handleInputChange('medicine', appointmentValue.medicine);
                                                            }}
                                                            input={<OutlinedInput label="Tag" />}
                                                            renderValue={(selected) => MEDICINE_TIME.map((tv=>{
                                                                return selected ? selected.includes(tv) ? '1' : '0' : '0';
                                                            }))?.join("-")}
                                                        >
                                                            {MEDICINE_TIME.map((name) => (
                                                                <MenuItem key={`${name}-${madIndex}-xupd`} value={name}>
                                                                    <Checkbox checked={ mdData.consume_time?.includes(name)} />
                                                                    <ListItemText primary={name} />
                                                                </MenuItem>
                                                            ))}
                                                        </Select>
                                                    </FormControl>                                                
                                                </Div>
                                            </Grid>
                                            <Grid item textAlign="end" xs={1}>
                                                <Div textAlign="end" sx={{ mt: 2}}>
                                                    <IconButton
                                                        aria-label="close"
                                                        onClick={(e)=>{
                                                            let newMedicine = appointmentValue.medicine.filter((m, ind) => ind !== madIndex)
                                                            handleInputChange("medicine", newMedicine);
                                                        }}
                                                        sx={{ ml:1, color: (theme) => theme.palette.grey[500], p:0}}
                                                        >
                                                        <CloseIcon sx={{color:"red"}} />
                                                    </IconButton>                                                        
                                                </Div>
                                            </Grid>
                                        </Grid>
                                    )
                                })
                                
                            )
                        }
                    </Box>
                </DialogContent>
                <DialogActions sx={{justifyContent:'center'}}>
                    
                    <Button
                        type="button"
                        variant="contained"
                        onClick={()=>{
                            if(medicine && medicine.medicine_id && medicine.medicine_id && medicine.disease_id){
                                handleInputChange('medicine', [
                                    ...appointmentValue.medicine,
                                    medicine
                                ]);
                                setMedicine({});
                            }
                            handleMedicineModel();
                        }}
                        size="large"
                        sx={{mb: 0}}
                    >Save</Button>
                    
                </DialogActions>
            </Dialog>
        </>
        
    );
};

export default AppointmentStatus;
