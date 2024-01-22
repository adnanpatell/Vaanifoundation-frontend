import React, {useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Button, Divider, Grid, IconButton, TextField, Typography } from "@mui/material";
import * as yup from "yup";
import JumboCardQuick from "@jumbo/components/JumboCardQuick";
import Div from "@jumbo/shared/Div";
import LoadingButton from "@mui/lab/LoadingButton";
import JumboTextField from '@jumbo/components/JumboFormik/JumboTextField';
import {Form, Formik} from "formik";
import { addPHc, savePHc, getPHcData } from '../../redux/actions/phcActions';
import { PHC_DATA } from 'app/utils/constants/phc';
import { successNotification, errorNotification } from 'app/utils/alertNotificationUtility';
import { useParams, useNavigate } from 'react-router-dom';
import {styled} from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import AddIcon from '@mui/icons-material/Add';
import { StyledTableCell, StyledTableRow } from '@jumbo/vendors/sweetalert2/hooks';
import { Table, TableHead, TableRow, TableBody} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

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

const validationSchema = yup.object({
    name: yup
        .string('Enter PHc name')
        .required('PHc name is required'),
    phc_number: yup
        .string('Enter PHc number')
        .required('PHc number is required'),
});

const PHcManage = () => {
    const dispatch = useDispatch();
    const { phc_id } = useParams();
    const navigate = useNavigate();
    const [streamInput, setStreamInput] = useState({
        camera_url: "",
        camera_name: ""        
    });
    const [expanded, setExpanded] = useState(false);


    const handleExpandeChange = () => {
        setExpanded(!expanded);
    }

    useEffect(()=>{
        if(phc_id){
            dispatch(getPHcData({_id:phc_id},(resData)=>{
                console.log(resData, "resData");
            }));
        }

        return () =>{
            dispatch({ type: PHC_DATA, payload: {} });            
        }
        
    },[phc_id, dispatch]);


    const selectedPHc = useSelector((state)=> state.phc[PHC_DATA]);
    
    const saveUserHandler = (formData, resetForm) => {
        if(selectedPHc._id){
            dispatch(savePHc({
                ...formData,
                _id: selectedPHc._id
            }, (insRS)=>{
                if(insRS.success){
                    successNotification( ( insRS && insRS.message ? insRS.message : 'PHc updated successfully'));
                }else{
                    errorNotification( insRS && insRS.message ? insRS.message : "Something went wrong.")
                }
                
                resetForm();
                navigate(`/phc/list`);
            }));
        }else{
            dispatch(addPHc(formData, (insRS)=>{
                if(insRS.success){
                    successNotification( ( insRS && insRS.message ? insRS.message : 'PHc created successfully'));
                }else{
                    errorNotification( insRS && insRS.message ? insRS.message : "Something went wrong.")
                }
                
                resetForm();
                navigate(`/phc/list`);
            }));
        }
    };

    return (
        <>
            <JumboCardQuick
                title={`PHc Manage`}
                subheader={`Create and update PHc`}
                
                // wrapperSx={{p: 0}}
            >
                {   
                    <React.Fragment>
                        {
                            ((phc_id && (selectedPHc && selectedPHc._id)) || !phc_id) ? (
                                <Formik
                                    validateOnChange={true}
                                    initialValues={{
                                        name: selectedPHc && selectedPHc.name ? selectedPHc.name : '',
                                        phc_number: selectedPHc && selectedPHc.phc_number ? selectedPHc.phc_number : '',
                                        address: selectedPHc.address ? selectedPHc.address : '',
                                        streamSettings: selectedPHc.streamSettings && Array.isArray(selectedPHc.streamSettings) ? selectedPHc.streamSettings : []
                                    }}
                                    validationSchema={validationSchema}
                                    onSubmit={(data, {resetForm, setSubmitting}) => {
                                        setSubmitting(true);
                                        saveUserHandler(data, resetForm);
                                        setSubmitting(false);
                                    }}
                                    style={{width:'100%'}}
                                >
                                    {({isSubmitting, setFieldValue, errors, touched, values}) => (
                                        <Form style={{textAlign: 'left'}} noValidate autoComplete='off'>
                                            <Div sx={{flexGrow: 1}}>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={4}>
                                                        <Div sx={{ mt: 1}}>
                                                            <JumboTextField
                                                                fullWidth
                                                                name="name"
                                                                label="PHc name"
                                                                value={values.name}
                                                            />
                                                        </Div>
                                                    </Grid>
                                                    
                                                    <Grid item xs={4}>
                                                        <Div sx={{ mt: 1}}>
                                                            <JumboTextField
                                                                fullWidth
                                                                name="phc_number"
                                                                label="PHc Number"
                                                            />
                                                        </Div>
                                                    </Grid>

                                                    <Grid item xs={4}>
                                                        <Div sx={{ mt: 1}}>
                                                            <JumboTextField
                                                                fullWidth
                                                                name="address"
                                                                label="Address"
                                                            />
                                                        </Div>
                                                    </Grid>
                                                </Grid>

                                                <Grid container sx={{mt:1}} spacing={2}>
                                                    <Grid item xs={12}>
                                                        <Accordion expanded={expanded} onChange={handleExpandeChange}>
                                                            <AccordionSummary aria-controls={`d-content`} id={`d-header`}>
                                                                <Typography>Manage Streaming settings</Typography>
                                                            </AccordionSummary>
                                                            <AccordionDetails>
                                                                <Grid container spacing={2}>
                                                                    <Grid item xs={4}>
                                                                        
                                                                        <Div sx={{ mt: 1}}>
                                                                            <TextField
                                                                                fullWidth
                                                                                name="camera_name"
                                                                                label="Camera Title"
                                                                                value={streamInput.camera_name}
                                                                                onChange={(e)=>{
                                                                                    setStreamInput({
                                                                                        ...streamInput,
                                                                                        camera_name: e.target.value
                                                                                    });
                                                                                }}
                                                                            />
                                                                        </Div>
                                                                    </Grid>

                                                                    <Grid item xs={4}>
                                                                        <Div sx={{ mt: 1}}>
                                                                            <TextField
                                                                                fullWidth
                                                                                // name="camera_url"
                                                                                label="Stream URL"
                                                                                onChange={(e)=>{
                                                                                    setStreamInput({
                                                                                        ...streamInput,
                                                                                        camera_url: e.target.value
                                                                                    });
                                                                                }}
                                                                                value={streamInput.camera_url}
                                                                            />
                                                                        </Div>
                                                                    </Grid>

                                                                    <Grid 
                                                                        textAlign="end"                                                                        
                                                                        item xs={4}
                                                                    >
                                                                        <Div sx={{ mt: 1}} justifyContent={"center"}>
                                                                            <Button 
                                                                                variant="outlined" 
                                                                                size="large"
                                                                                startIcon={<AddIcon/>}
                                                                                onClick={()=>{
                                                                                    if(streamInput.camera_url && streamInput.camera_name){
                                                                                        let stSettings = values.streamSettings;
                                                                                        if(typeof streamInput.index != "undefined"){
                                                                                            stSettings = stSettings.map((stu)=>{
                                                                                                if(stu.index === streamInput.index) return {...streamInput};
                                                                                                else return stu;
                                                                                            });
                                                                                        }else{
                                                                                            stSettings.push({
                                                                                                ...streamInput,
                                                                                                index: stSettings.length
                                                                                            });
                                                                                        }
                                                                                        
                                                                                        setStreamInput({
                                                                                            camera_url:"",
                                                                                            camera_name:""
                                                                                        });
                                                                                        setFieldValue('streamSettings',stSettings);
                                                                                    }                                                                                    
                                                                                }}
                                                                            >
                                                                                Add
                                                                            </Button>
                                                                        </Div>
                                                                    </Grid>
                                                                </Grid>
                                                                
                                                                {
                                                                    (values.streamSettings && values.streamSettings.length) ? (
                                                                        <>
                                                                            <Divider sx={{mt:2}} />
                                                                            <Grid container sx={{mt:2}} spacing={2}>
                                                                                <Grid item xs={12}>
                                                                                    <Table>
                                                                                        <TableHead>
                                                                                            <StyledTableRow>
                                                                                                <StyledTableCell sx={{p:0.5}}>Title</StyledTableCell>
                                                                                                <StyledTableCell sx={{p:0.5}}>URL</StyledTableCell>
                                                                                                <StyledTableCell sx={{p:0.5}}></StyledTableCell>
                                                                                            </StyledTableRow>
                                                                                        </TableHead>
                                                                                        <TableBody>
                                                                                            {
                                                                                            values.streamSettings.map((st)=>{
                                                                                                return (        
                                                                                                    <StyledTableRow key={st.index+"li"}>
                                                                                                        <StyledTableCell sx={{p:0.5}}>{st.camera_name}</StyledTableCell>
                                                                                                        <StyledTableCell sx={{p:0.5}}>{st.camera_url}</StyledTableCell>
                                                                                                        <StyledTableCell sx={{p:0.5, textAlign:'end'}}>
                                                                                                            <Div>
                                                                                                                <IconButton
                                                                                                                    aria-label="close"
                                                                                                                    onClick={()=>{
                                                                                                                        let newAr = values.streamSettings.find((vl=>vl.index === st.index));
                                                                                                                        setStreamInput(newAr);
                                                                                                                    }}
                                                                                                                    sx={{ ml:1, color: (theme) => theme.palette.grey[500], p:0 }}
                                                                                                                >
                                                                                                                    <EditIcon />
                                                                                                                </IconButton>
                                                                                                                
                                                                                                                <IconButton
                                                                                                                    aria-label="close"
                                                                                                                    onClick={()=>{
                                                                                                                        let newAr = values.streamSettings.filter((vl=>vl.index !== st.index));
                                                                                                                        setFieldValue('streamSettings',newAr);
                                                                                                                    }}
                                                                                                                    sx={{
                                                                                                                        ml:1,
                                                                                                                        color: (theme) => theme.palette.grey[500],
                                                                                                                        p:0
                                                                                                                    }}
                                                                                                                    >
                                                                                                                    <DeleteIcon />
                                                                                                                </IconButton>
                                                                                                            </Div>
                                                                                                        </StyledTableCell>
                                                                                                    </StyledTableRow>
                                                                                                )
                                                                                            })}
                                                                                        </TableBody>
                                                                                    </Table>
                                                                                </Grid>
                                                                            </Grid>
                                                                        </>
                                                                        
                                                                    ) : ('')
                                                                }
                                                            </AccordionDetails>
                                                        </Accordion>
                                                    </Grid>
                                                    
                                                </Grid>

                                                <Grid container sx={{mt:1}} spacing={2}>
                                                    <Grid textAlign="center" item xs={12}>
                                                        <Div sx={{ mt: 1}}>
                                                            <LoadingButton                                                            
                                                                type="submit"                                                        
                                                                variant="contained"
                                                                size="large"
                                                                sx={{mb: 1}}
                                                                loading={isSubmitting}
                                                            >
                                                                {
                                                                    selectedPHc._id ? ('Update PHc') : ('Add PHc')
                                                                }
                                                            </LoadingButton>
                                                        </Div>
                                                    </Grid>
                                                </Grid>
                                            </Div>
                                        </Form>
                                    )}
                                </Formik>
                            ) : ('')
                        }

                        
                    </React.Fragment>
                }
            </JumboCardQuick>
        </>
    );
};

export default PHcManage;
