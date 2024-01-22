import React, {useEffect, useReducer, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Grid, Checkbox,  Select, MenuItem, FormHelperText, NativeSelect} from "@mui/material";
import styled from "@emotion/styled";
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import * as yup from "yup";
import JumboCardQuick from "@jumbo/components/JumboCardQuick";
import {useTranslation} from "react-i18next";
import FormLabel from "@mui/material/FormLabel";
import { Radio, RadioGroup } from "@mui/material";
import JumboScrollbar from "@jumbo/components/JumboScrollbar";
import Div from "@jumbo/shared/Div";
import LoadingButton from "@mui/lab/LoadingButton";
import Span from "@jumbo/shared/Span";
import JumboTextField from '@jumbo/components/JumboFormik/JumboTextField';
import {Form, Formik} from "formik";
import { addMedicine, saveMedicine, getMedicineData } from '../../redux/actions/medicineActions';
import { getMedicineCategoryList } from '../../redux/actions/medicineCategoryActions';
import * as dayjs from 'dayjs'
import { MEDICINE_DATA } from 'app/utils/constants/medicine';
import { MEDICINE_CATEGORY_LIST } from 'app/utils/constants/medicine-category';
import EditIcon from '@mui/icons-material/Edit';
import { successNotification, errorNotification } from 'app/utils/alertNotificationUtility';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { bloodGroup, countryList } from 'app/utils/constants/staticData';
import Divider from "@mui/material/Divider";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import {Autocomplete, TextField} from "@mui/material";
import { useParams, useNavigate } from 'react-router-dom';


const validationSchema = yup.object({
    name: yup
        .string('Enter medicine name')
        .required('Medicine name is required')
});

const MedicineManage = () => {
    const dispatch = useDispatch();
    const {t} = useTranslation();
    const { medicine_id } = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
        dispatch(getMedicineCategoryList());
        if(medicine_id){
            dispatch(getMedicineData({_id:medicine_id},(resData)=>{
                console.log(resData, "resData");
            }));
        }

        return () =>{
            dispatch({ type: MEDICINE_DATA, payload: {} });
            dispatch({ type: MEDICINE_CATEGORY_LIST, payload: [] });
        }
        
    },[medicine_id, dispatch]);


    const selectedMedicine = useSelector((state)=> state.medicine[MEDICINE_DATA]);
    const medicineCategories = useSelector((state)=> state.medicineCategory[MEDICINE_CATEGORY_LIST]);
    
    const saveUserHandler = (formData, resetForm) => {
        
        if(selectedMedicine._id){
            dispatch(saveMedicine({
                ...formData,
                _id: selectedMedicine._id
            }, (insRS)=>{
                if(insRS.success){
                    successNotification( ( insRS && insRS.message ? insRS.message : 'Medicine updated successfully'));
                }else{
                    errorNotification( insRS && insRS.message ? insRS.message : "Something went wrong.")
                }
                
                resetForm();
                navigate(`/medicine/list`);
            }));
        }else{
            dispatch(addMedicine(formData, (insRS)=>{
                if(insRS.success){
                    successNotification( ( insRS && insRS.message ? insRS.message : 'Medicine created successfully'));
                }else{
                    errorNotification( insRS && insRS.message ? insRS.message : "Something went wrong.")
                }
                
                resetForm();
                navigate(`/medicine/list`);
            }));
        }
    };

    return (
        <>
            <JumboCardQuick
                title={`Medicine Manage`}
                subheader={`Create and update medicine`}
                
                // wrapperSx={{p: 0}}
            >
                {   
                    <React.Fragment>
                        
                        {
                            ((medicine_id && (selectedMedicine && selectedMedicine._id)) || !medicine_id) ? (
                                <Formik
                                    validateOnChange={true}
                                    initialValues={{
                                        name: selectedMedicine && selectedMedicine.name ? selectedMedicine.name : '',
                                        category_id: selectedMedicine && selectedMedicine.category_id ? selectedMedicine.category_id : '',
                                        description: selectedMedicine.description ? selectedMedicine.description : ''                                        
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
                                                                label="Medicine name"
                                                                value={values.name}
                                                            />
                                                        </Div>
                                                    </Grid>
                                                    <Grid item xs={4}>
                                                        <Div sx={{mt: 1, mb: 1}}>
                                                            <FormControl fullWidth>
                                                                <InputLabel error={errors.role} touched={touched.role} id="medicine-category-label">Category</InputLabel>
                                                                <Select
                                                                    labelId="medicine-category-label"
                                                                    id="medicine-category"
                                                                    name="category_id"
                                                                    value={values.category_id}
                                                                    error={errors.category_id}
                                                                    touched={touched.category_id}
                                                                    onChange={(e) => {
                                                                            setFieldValue('category_id', e.target.value);
                                                                        }
                                                                    }
                                                                    // onChange={(event) => setAge(event.target.value)}
                                                                    label="Category"
                                                                >
                                                                    <MenuItem value="">
                                                                        <em>Medicine Category</em>
                                                                    </MenuItem>
                                                                    {
                                                                        medicineCategories && medicineCategories.map((cat)=>{
                                                                            return (
                                                                                <MenuItem value={cat._id}>{cat.name}</MenuItem>                                                                    
                                                                            )
                                                                        })
                                                                    }
                                                                </Select>
                                                                {touched.category_id && (
                                                                    <FormHelperText sx={{ color: 'error.main' }}>{errors.category_id}</FormHelperText>
                                                                )}
                                                            </FormControl>
                                                        </Div>
                                                    </Grid>
                                                    <Grid item xs={4}>
                                                        <Div sx={{ mt: 1}}>
                                                            <JumboTextField
                                                                fullWidth
                                                                name="description"
                                                                label="Description"
                                                            />
                                                        </Div>
                                                    </Grid>

                                                    <Grid textAlign="end" item xs={12}>
                                                        <Div sx={{ mt: 1}}>
                                                            <LoadingButton                                                            
                                                                type="submit"                                                        
                                                                variant="contained"
                                                                size="large"
                                                                sx={{mb: 1}}
                                                                loading={isSubmitting}
                                                            >
                                                                {
                                                                    selectedMedicine._id ? ('Update Category') : ('Add Category')
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

export default MedicineManage;
