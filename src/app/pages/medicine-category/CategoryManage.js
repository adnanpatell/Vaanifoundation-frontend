import React, {useEffect, useReducer, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Grid, Checkbox,  Select, MenuItem, FormHelperText, NativeSelect} from "@mui/material";
import styled from "@emotion/styled";
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import * as yup from "yup";
import {IconButton, Tooltip, Typography} from "@mui/material";
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
import { addMedicineCategory, saveMedicineCategory, getMedicineCategoryData } from '../../redux/actions/medicineCategoryActions';
import * as dayjs from 'dayjs'
import { MEDICINE_CATEGORY_DATA } from 'app/utils/constants/medicine-category';
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
        .string('Enter category name')
        .required('Category name is required')
});

const PatientsManage = () => {
    const dispatch = useDispatch();
    const {t} = useTranslation();
    const { category_id } = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
        if(category_id){
            dispatch(getMedicineCategoryData({_id:category_id},(resData)=>{
                console.log(resData, "resData");
            }));
        }

        return () =>{
            dispatch({ type: MEDICINE_CATEGORY_DATA, payload: {} });
        }
        
    },[category_id, dispatch]);


    const selectedCategory = useSelector((state)=> state.medicineCategory[MEDICINE_CATEGORY_DATA])
    
    const saveUserHandler = (formData, resetForm) => {
        
        if(selectedCategory._id){
            dispatch(saveMedicineCategory({
                ...formData,
                _id: selectedCategory._id
            }, (insRS)=>{
                if(insRS.success){
                    successNotification( ( insRS && insRS.message ? insRS.message : 'Medicine category updated successfully'));
                }else{
                    errorNotification( insRS && insRS.message ? insRS.message : "Something went wrong.")
                }
                
                resetForm();
                navigate(`/medicine/category`);
            }));
        }else{
            dispatch(addMedicineCategory(formData, (insRS)=>{
                if(insRS.success){
                    successNotification( ( insRS && insRS.message ? insRS.message : 'Medicine category created successfully'));
                }else{
                    errorNotification( insRS && insRS.message ? insRS.message : "Something went wrong.")
                }
                
                resetForm();
                navigate(`/medicine/category`);
            }));
        }
    };

    return (
        <>
            <JumboCardQuick
                title={`Medicine Category Manage`}
                subheader={`Create and update medicine category`}
                
                // wrapperSx={{p: 0}}
            >
                {   
                    <React.Fragment>
                        
                        {
                            ((category_id && (selectedCategory && selectedCategory._id)) || !category_id) ? (
                                <Formik
                                    validateOnChange={true}
                                    initialValues={{
                                        name: selectedCategory && selectedCategory.name ? selectedCategory.name : '',
                                        description: selectedCategory.description ? selectedCategory.description : '',
                                        
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
                                                                label="Category name"
                                                                value={values.name}
                                                            />
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

                                                    <Grid textAlign="end" item xs={4}>
                                                        <Div sx={{ mt: 1}}>
                                                            <LoadingButton                                                            
                                                                type="submit"                                                        
                                                                variant="contained"
                                                                size="large"
                                                                sx={{mb: 1}}
                                                                loading={isSubmitting}
                                                            >
                                                                {
                                                                    selectedCategory._id ? ('Update Category') : ('Add Category')
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

export default PatientsManage;
