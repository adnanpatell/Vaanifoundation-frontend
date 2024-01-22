import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Grid, Box, Table, TableBody, TableHead, TableRow, Select, MenuItem, FormHelperText} from "@mui/material";
import Dialog from '@mui/material/Dialog';
import CloseIcon from '@mui/icons-material/Close';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import * as yup from "yup";
import {IconButton, Tooltip } from "@mui/material";
import JumboCardQuick from "@jumbo/components/JumboCardQuick";
import AddIcon from '@mui/icons-material/Add';
import JumboScrollbar from "@jumbo/components/JumboScrollbar";
import Div from "@jumbo/shared/Div";
import LoadingButton from "@mui/lab/LoadingButton";
import Span from "@jumbo/shared/Span";
import JumboTextField from '@jumbo/components/JumboFormik/JumboTextField';
import {Form, Formik} from "formik";
import { getUserList, saveUser, updateUser } from '../../redux/actions/userActions';
import { getRoleList } from '../../redux/actions/roleActions';
import { getPHcList } from 'app/redux/actions/phcActions';
import { USER_LIST } from 'app/utils/constants/user';
import { ROLE_LIST } from 'app/utils/constants/userRole';
import { PHC_LIST } from 'app/utils/constants/phc';
import EditIcon from '@mui/icons-material/Edit';
import { successNotification, errorNotification } from 'app/utils/alertNotificationUtility';
import { StyledTableRow, StyledTableCell } from "@jumbo/vendors/sweetalert2/hooks";



const validationSchema = yup.object({
    first_name: yup
        .string('Enter your first name')
        .required('First name is required'),
    last_name: yup
        .string('Enter your last name')
        .required('Last name is required'),
    email: yup
        .string('Enter your email')
        .email("Invalid email format")
        .required('Email is required'),
    mobile: yup
        .string('Enter user mobile number')
        .required('Mobile is required'),
    password: yup
        .string('Enter password')
        .required('Password is required'),
    role: yup
        .string('Select role')
        .required('Role is required'),
    phcid:  yup
        .string('Select PHc')
        .required('PHc is required'),
});

const Users = () => {
    const dispatch = useDispatch();
    const [scroll, setScroll] = useState('paper');
    const [viewRoleMode, setRoleModel] = useState(false);
    const [selectedUser, setSelecteUser] = useState({});
    const handleRoleModel = () => {
        if(viewRoleMode){
            setSelecteUser({});
        }
        setRoleModel(!viewRoleMode);
    };


    useEffect(()=>{
        dispatch(getUserList((resData)=>{
            
        }));

        dispatch(getRoleList((resData)=>{
            
        }));

        dispatch(getPHcList());
    },[dispatch]);

    const userList = useSelector((state)=> state.user[USER_LIST]);
    const roleList = useSelector((state)=> state.role[ROLE_LIST]);
    const phcList = useSelector((state)=> state.phc[PHC_LIST])


    const saveUserHandler = (formData, resetForm) => {

        if(selectedUser._id){
            dispatch(updateUser({
                ...formData,
                _id: selectedUser._id
            }, (insRS)=>{
                if(insRS.success){
                    successNotification( ( insRS && insRS.message ? insRS.message : 'User updated successfully'));
                }else{
                    errorNotification( insRS && insRS.message ? insRS.message : "Something went wrong.")
                }
                
                handleRoleModel();
                resetForm();
                dispatch(getUserList((resData)=>{
                    
                }));
            }));
        }else{
            dispatch(saveUser(formData, (insRS)=>{
                if(insRS.success){
                    successNotification( ( insRS && insRS.message ? insRS.message : 'User created successfully'));
                }else{
                    errorNotification( insRS && insRS.message ? insRS.message : "Something went wrong.")
                }
                handleRoleModel();
                resetForm();
                dispatch(getUserList((resData)=>{
                    
                }));
            }));
        }       
    };

    const handleEditUser = (userData) => {
        setSelecteUser(userData);
        handleRoleModel();
    }

    return (
        <>
            <JumboCardQuick
                title={`User List`}
                subheader={`Create and update users`}
                action={
                    <Tooltip
                        title={`User List`}
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
                                        <StyledTableCell sx={{pl: 1, pr: 1}}>Name</StyledTableCell>
                                        <StyledTableCell sx={{pl: 1, pr: 1}}>Mobile</StyledTableCell>
                                        <StyledTableCell sx={{pl: 1, pr: 1}}>Email</StyledTableCell>
                                        <StyledTableCell sx={{pl: 1, pr: 1}}>PHc</StyledTableCell>
                                        <StyledTableCell sx={{pl: 1, pr: 1}}>Role</StyledTableCell>
                                        <StyledTableCell sx={{pr: 1}} align={"right"}>Action</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        userList && userList.map(item=>{
                                            return (
                                            <StyledTableRow key={item._id}>
                                                <StyledTableCell sx={{pl: 1, pr: 1}}>{item.first_name} {item.middle_name} {item.last_name}</StyledTableCell>
                                                <StyledTableCell sx={{pl: 1, pr: 1}}>{item.mobile}</StyledTableCell>
                                                <StyledTableCell sx={{pl: 1, pr: 1}}>{item.email}</StyledTableCell>
                                                <StyledTableCell sx={{pl: 1, pr: 1}}>{item.phcData?.name}</StyledTableCell>
                                                <StyledTableCell sx={{pl: 1, pr: 1}}>{item.roleData?.name}</StyledTableCell>
                                                <StyledTableCell align="right">
                                                    <Span sx={{whiteSpace: 'nowrap'}}>
                                                        <IconButton
                                                            onClick={()=>handleEditUser(item)}
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
                open={viewRoleMode}
                onClose={handleRoleModel}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle>Add User

                <IconButton
                    aria-label="close"
                    onClick={handleRoleModel}
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
                    You can add new user
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
                            first_name: selectedUser.first_name ? selectedUser.first_name : '',
                            middle_name: selectedUser.middle_name ? selectedUser.middle_name : '',
                            last_name: selectedUser.last_name ? selectedUser.last_name : '',
                            email: selectedUser.email ? selectedUser.email : '',
                            mobile: selectedUser.mobile ? selectedUser.mobile : '',
                            password: selectedUser.password ? selectedUser.password : '',
                            role: selectedUser.role ? selectedUser.role :  '',
                            phcid: selectedUser.phcid ? selectedUser.phcid : ''

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
                                        <Grid item xs={6}>
                                            <Div sx={{mt: 1, mb: 1}}>
                                                <JumboTextField
                                                    fullWidth
                                                    name="first_name"
                                                    label="first name"
                                                />
                                            </Div>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Div sx={{mt: 1, mb: 1}}>
                                                <JumboTextField
                                                    fullWidth
                                                    name="middle_name"
                                                    label="Middle name"
                                                />
                                            </Div>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Div sx={{mt: 1, mb: 1}}>
                                                <JumboTextField
                                                    fullWidth
                                                    name="last_name"
                                                    label="Last name"
                                                />
                                            </Div>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Div sx={{mt: 1, mb: 1}}>
                                                <JumboTextField
                                                    fullWidth
                                                    name="email"
                                                    label="Email"
                                                />
                                            </Div>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Div sx={{mt: 1, mb: 1}}>
                                                <JumboTextField
                                                    fullWidth
                                                    name="mobile"
                                                    label="Mobile"
                                                />
                                            </Div>
                                        </Grid>

                                        <Grid item xs={6}>
                                            <Div sx={{mt: 1, mb: 1}}>
                                                <JumboTextField
                                                    fullWidth
                                                    name="password"
                                                    label="Password"
                                                    type="password"
                                                />
                                            </Div>
                                        </Grid>

                                        <Grid item xs={6}>
                                            <Div sx={{mt: 1, mb: 1}}>
                                                <FormControl fullWidth>
                                                    <InputLabel error={errors.role} touched={touched.role} id="user-role-label">Role</InputLabel>
                                                    <Select
                                                        labelId="user-role-label"
                                                        id="user-role"
                                                        name="role"
                                                        value={values.role}
                                                        error={errors.role}
                                                        touched={touched.role}
                                                        onChange={(e) => {
                                                                setFieldValue('role', e.target.value);
                                                            }
                                                        }
                                                        // onChange={(event) => setAge(event.target.value)}
                                                        label="Role"
                                                    >
                                                        <MenuItem value="">
                                                            <em>Role</em>
                                                        </MenuItem>
                                                        {
                                                            roleList && roleList.map((role)=>{
                                                                return (
                                                                    <MenuItem value={role._id}>{role.name}</MenuItem>                                                                    
                                                                )
                                                            })
                                                        }
                                                    </Select>
                                                    {touched.role && (
                                                        <FormHelperText sx={{ color: 'error.main' }}>{errors.role}</FormHelperText>
                                                    )}
                                                </FormControl>
                                            </Div>
                                        </Grid>

                                        <Grid item xs={6}>
                                            <Div sx={{mt: 1, mb: 1}}>
                                                <FormControl fullWidth>
                                                    <InputLabel error={errors.phcid} touched={touched.phcid} id="user-phcid-label">PHc ID</InputLabel>
                                                    <Select
                                                        labelId="user-phcid-label"
                                                        id="user-phcid"
                                                        name="role"
                                                        value={values.phcid}
                                                        error={errors.phcid}
                                                        touched={touched.phcid}
                                                        onChange={(e) => {
                                                                setFieldValue('phcid', e.target.value);
                                                            }
                                                        }
                                                        // onChange={(event) => setAge(event.target.value)}
                                                        label="PHc ID"
                                                    >
                                                        <MenuItem value="">
                                                            <em>PHc ID</em>
                                                        </MenuItem>
                                                        {
                                                            phcList && phcList.map((phc)=>{
                                                                return (
                                                                    <MenuItem value={phc._id}>{phc.name}</MenuItem>                                                                    
                                                                )
                                                            })
                                                        }
                                                    </Select>
                                                    {touched.phcid && (
                                                        <FormHelperText sx={{ color: 'error.main' }}>{errors.phcid}</FormHelperText>
                                                    )}
                                                </FormControl>
                                            </Div>
                                        </Grid>
                                        <Grid textAlign={`center`} item xs={12}>
                                            <Div sx={{mt: 1, mb: 1}}>
                                                <LoadingButton
                                                    type="submit"
                                                    variant="contained"
                                                    size="large"
                                                    sx={{mb: 0}}
                                                    loading={isSubmitting}
                                                >
                                                    {
                                                        selectedUser._id ? ('Update User') : ('Add User')
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
                <Button onClick={handleRoleModel}>Close</Button>
                </DialogActions> */}
            </Dialog>
        </>
    );
};

export default Users;
