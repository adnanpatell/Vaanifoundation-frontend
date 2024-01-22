import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Checkbox, Box, Button, Table, TableBody, TableHead, TableRow, FormLabel, FormGroup} from "@mui/material";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import * as yup from "yup";
import {IconButton, Tooltip } from "@mui/material";
import JumboCardQuick from "@jumbo/components/JumboCardQuick";
import AddIcon from '@mui/icons-material/Add';
import JumboScrollbar from "@jumbo/components/JumboScrollbar";
import Div from "@jumbo/shared/Div";
import LoadingButton from "@mui/lab/LoadingButton";
import Span from "@jumbo/shared/Span";
import JumboTextField from '@jumbo/components/JumboFormik/JumboTextField';
import { Form, Formik} from "formik";
import { getRoleList, saveRole, getRoleAccessList } from '../../redux/actions/roleActions';
import EditIcon from '@mui/icons-material/Edit';
import { ROLE_ACCESS_LIST, ROLE_LIST } from 'app/utils/constants/userRole';
import { successNotification, errorNotification } from 'app/utils/alertNotificationUtility';
import { StyledTableRow, StyledTableCell } from "@jumbo/vendors/sweetalert2/hooks";


const validationSchema = yup.object({
    name: yup
        .string('Enter role name')
        .required('Role Name is required')
});
const Role = () => {
    const dispatch = useDispatch();
    const [scroll, setScroll] = useState('paper');
    const [viewRoleMode, setRoleModel] = useState(false);
    const [selectedRole, setSelectedRole] = useState({});
    const handleRoleModel = () => {
        if(viewRoleMode){
            setSelectedRole({});
        }
        setRoleModel(!viewRoleMode)
    };    

    useEffect(()=>{
        dispatch(getRoleList());
        dispatch(getRoleAccessList())
    },[dispatch]);

    const roleList = useSelector((state)=> state.role[ROLE_LIST]);

    const roleAccessKeys = useSelector((state)=> state.role[ROLE_ACCESS_LIST]);

    const saveRoleHandler = (formData, resetForm) => {
        let postData = formData;
        if(selectedRole && selectedRole._id){
            postData._id = selectedRole._id;
        }
        dispatch(saveRole(postData, (insRS)=>{

            if(insRS && insRS.success){
                successNotification(insRS.message);
            }else{
                errorNotification(insRS.message)
            }
            
            handleRoleModel();
            resetForm();
            setSelectedRole({});
            dispatch(getRoleList());
        }));        
    };

    const handleEditRole = (roleData) => {
        setSelectedRole(roleData);
        handleRoleModel();
    }

    return (
        <>
            <JumboCardQuick
                title={`Role List`}
                subheader={`Create and update roles`}
                action={
                    <Tooltip
                        title={`Role List`}
                        arrow
                        placement={"top"}
                        sx={{
                            '& .MuiTooltip-arrow': {
                                marginTop: '-0.65em'
                            }
                        }}
                    >
                        <IconButton
                            onClick={handleRoleModel}
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
                                        <StyledTableCell sx={{pl: 1}}>Role Name</StyledTableCell>                                        
                                        <StyledTableCell sx={{pl: 1}} align={"right"}>Action</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        roleList && roleList.map(item=>{
                                            return (
                                            <StyledTableRow key={item.name}>
                                                <StyledTableCell sx={{pl: 1, pr: 1}}>
                                                {item.name}
                                                </StyledTableCell>
                                                <StyledTableCell align="right">
                                                    <Span sx={{whiteSpace: 'nowrap'}}>
                                                        <IconButton
                                                            onClick={()=>handleEditRole(item)}
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
                maxWidth="sm"
                open={viewRoleMode}
                onClose={handleRoleModel}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle>Add Role</DialogTitle>
                <DialogContent dividers={scroll === 'paper'}>
                <DialogContentText>
                    You can add new role and manage access
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
                            name: selectedRole && selectedRole.name ? selectedRole.name : '',
                            access: selectedRole && selectedRole.access ? selectedRole.access : {}
                        }}
                        validationSchema={validationSchema}
                        onSubmit={(data, {resetForm, setSubmitting}) => {
                            setSubmitting(true);
                            saveRoleHandler(data, resetForm);
                            setSubmitting(false);
                        }}
                        style={{width:'100%'}}
                    >
                        {({isSubmitting, values, setFieldValue}) => (
                            <Form style={{textAlign: 'left'}} noValidate autoComplete='off'>
                                <Div sx={{mt: 1, mb: 3}}>
                                    <JumboTextField
                                        fullWidth
                                        name="name"
                                        label="Role name"
                                    />
                                </Div>
                                <Div sx={{mt: 1, mb: 2}}>
                                    
                                        
                                        
                                    {
                                        roleAccessKeys && Object.keys(roleAccessKeys[0].access_keys).map((accessKey)=>{
                                            return (
                                                <>
                                                    <FormControl component="fieldset">
                                                        
                                                        <FormLabel component="legend">{accessKey.split("_").join(" ").toUpperCase()}</FormLabel>
                                                        <FormGroup aria-label="position" row>
                                                            {
                                                                roleAccessKeys[0].access_keys[accessKey].map((keyValue)=>{
                                                                    return (
                                                                        <FormControlLabel
                                                                            value={keyValue}
                                                                            control={<Checkbox />}
                                                                            name={`access[${accessKey}][${keyValue}]`}
                                                                            label={keyValue.split("_").join(" ")}
                                                                            labelPlacement="end"
                                                                            checked={(values?.['access']?.[accessKey]?.[keyValue]) ? true : false}
                                                                            onChange={(e) => {
                                                                                
                                                                                if(!values['access']) values['access'] = {};

                                                                                if(!values['access'][accessKey]) values['access'][accessKey]={};

                                                                                values['access'][accessKey][keyValue] = e.target.checked;

                                                                                setFieldValue('access', values['access']);
                                                                            
                                                                            }}
                                                                        />
                                                                    )
                                                                })
                                                            }
                                                            
                                                        </FormGroup>
                                                    </FormControl>
                                                </>
                                            )
                                        })
                                    }                                           
                                        
                                    
                                </Div>                                
                                <LoadingButton
                                    fullWidth
                                    type="submit"
                                    variant="contained"
                                    size="large"
                                    sx={{mb: 3}}
                                    loading={isSubmitting}
                                >Add Role</LoadingButton>
                                
                            </Form>
                        )}
                    </Formik>
                </Box>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleRoleModel}>Close</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default Role;
