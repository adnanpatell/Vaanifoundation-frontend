import React, {useEffect, useReducer, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Table, TableBody, TableCell, TableHead, TableRow, IconButton, Tooltip, Box, Grid} from "@mui/material";
import Dialog, { DialogProps } from '@mui/material/Dialog';
import CloseIcon from '@mui/icons-material/Close';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import JumboCardQuick from "@jumbo/components/JumboCardQuick";
import JumboTextField from '@jumbo/components/JumboFormik/JumboTextField';
import Div from "@jumbo/shared/Div";
import {useTranslation} from "react-i18next";
import AddIcon from '@mui/icons-material/Add';
import JumboScrollbar from "@jumbo/components/JumboScrollbar";
import Span from "@jumbo/shared/Span";
import { getDiseasesList, saveDiseases, addDiseases } from '../../redux/actions/diseasesActions';
import {Link as RouterLink, useLocation, useNavigate} from "react-router-dom";
import Link from '@mui/material/Link';
import { DISEASES_LIST } from 'app/utils/constants/diseases';
import EditIcon from '@mui/icons-material/Edit';
import { successNotification, errorNotification } from 'app/utils/alertNotificationUtility';
import { StyledTableRow, StyledTableCell } from "@jumbo/vendors/sweetalert2/hooks";
import LoadingButton from "@mui/lab/LoadingButton";
import {Form, Formik} from "formik";
import * as yup from "yup";

const validationSchema = yup.object({
    name: yup
        .string('Enter diseses name')
        .required('Diseses name is required')
});

const Diseases = (props) => {
    const dispatch = useDispatch();
    const {t} = useTranslation();
    const navigate = useNavigate();
    const [scroll, setScroll] = useState('paper');
    const [viewDiseasesModel, setDiseasesModel] = useState(false);
    const [selectedDiseases, setSelectedDiseases] = useState({});

    const handleDiseasesModel = () => {
        if(viewDiseasesModel){
            setSelectedDiseases({});
        }
        setDiseasesModel(!viewDiseasesModel);
    };

    useEffect(()=>{
        dispatch(getDiseasesList());
    },[]);

    const diseasesList = useSelector((state)=> state.diseases[DISEASES_LIST]);

    const handleEditDiseases = (diseasesData) => {
        setSelectedDiseases(diseasesData);
        handleDiseasesModel();
    }

    const saveDiseasesHandler = (formData, resetForm) => {
        if(selectedDiseases._id){
            dispatch(saveDiseases({
                ...formData,
                _id: selectedDiseases._id
            }, (insRS)=>{
                if(insRS.success){
                    successNotification( ( insRS && insRS.message ? insRS.message : 'Diseases updated successfully'));
                }else{
                    errorNotification( insRS && insRS.message ? insRS.message : "Something went wrong.")
                }
                
                resetForm();
                handleDiseasesModel();
                dispatch(getDiseasesList());
            }));
        }else{
            dispatch(addDiseases(formData, (insRS)=>{
                if(insRS.success){
                    successNotification( ( insRS && insRS.message ? insRS.message : 'Diseases created successfully'));
                }else{
                    errorNotification( insRS && insRS.message ? insRS.message : "Something went wrong.")
                }
                
                resetForm();
                handleDiseasesModel();
                dispatch(getDiseasesList());
            }));
        }
    };
    
    return (
        <>
            <JumboCardQuick
                title={`Diseases List`}
                subheader={`List of Diseases`}
                action={
                    <Tooltip
                        title={`Diseases List`}
                        arrow
                        placement={"top"}
                        sx={{
                            '& .MuiTooltip-arrow': {
                                marginTop: '-0.65em'
                            }
                        }}
                    >
                        
                            <IconButton
                            onClick={handleDiseasesModel}
                            >
                                <AddIcon/>
                            </IconButton>
                        
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
                                        <StyledTableCell sx={{pr: 1}} align={"right"}>Action</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        diseasesList && diseasesList.map(item=>{
                                            return (
                                            <StyledTableRow key={item._id}>
                                                <StyledTableCell sx={{pl: 1, pr: 1}}>{item.name}</StyledTableCell>
                                                <StyledTableCell align="right">
                                                    <Span sx={{whiteSpace: 'nowrap'}}>
                                                        
                                                            <IconButton
                                                                onClick={()=>handleEditDiseases(item)}
                                                            >
                                                                <EditIcon sx={{fontSize: 16}} />
                                                            </IconButton>
                                                        
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
            
            <Dialog
                fullWidth={true}
                maxWidth="md"
                open={viewDiseasesModel}
                onClose={handleDiseasesModel}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle>{selectedDiseases._id ? ('Update diseases') : ('Add diseases')}

                <IconButton
                    aria-label="close"
                    onClick={handleDiseasesModel}
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
                <DialogContentText>
                    You can add new diseses
                </DialogContentText>
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
                    <Formik
                        validateOnChange={true}
                        initialValues={{
                            name: selectedDiseases.name ? selectedDiseases.name : ''

                        }}
                        validationSchema={validationSchema}
                        onSubmit={(data, {resetForm, setSubmitting}) => {
                            setSubmitting(true);
                            saveDiseasesHandler(data, resetForm);
                            setSubmitting(false);
                        }}
                        style={{width:'100%'}}
                    >
                        {({isSubmitting, setFieldValue, errors, touched, values}) => (
                            <Form style={{textAlign: 'left'}} noValidate autoComplete='off'>
                                <Div sx={{flexGrow: 1}}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <Div sx={{mt: 1, mb: 1}}>
                                                <JumboTextField
                                                    fullWidth
                                                    name="name"
                                                    label="Diseses name"
                                                />
                                            </Div>
                                        </Grid>
                                        
                                        <Grid textAlign="center" item xs={12}>
                                            <Div sx={{mt: 1, mb: 1}}>
                                                <LoadingButton
                                                    type="submit"
                                                    variant="contained"
                                                    size="large"
                                                    sx={{mb: 0}}
                                                    loading={isSubmitting}
                                                >
                                                    {
                                                        selectedDiseases._id ? ('Update diseases') : ('Add diseases')
                                                    }
                                                </LoadingButton>
                                            </Div>
                                        </Grid>
                                    </Grid>
                                </Div>
                            </Form>
                        )}
                    </Formik>
                </Box>
                </DialogContent>
                {/* <DialogActions>
                <Button onClick={handleDiseasesModel}>Close</Button>
                </DialogActions> */}
            </Dialog>
        </>
    );
};

export default Diseases;
