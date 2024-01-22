import React from 'react';
import {Card, CardContent, Checkbox, FormControlLabel, IconButton, Typography} from "@mui/material";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import {Facebook, Google, Twitter} from "@mui/icons-material";
import Div from "@jumbo/shared/Div";
import {alpha} from "@mui/material/styles";
import {ASSET_IMAGES} from "../../../utils/constants/paths";
import {getAssetPath} from "../../../utils/appHelpers";
import * as yup from "yup";
import {Form, Formik} from "formik";
import JumboTextField from "@jumbo/components/JumboFormik/JumboTextField";
import LoadingButton from "@mui/lab/LoadingButton";
import authServices from "../../../services/auth-services";
import {useNavigate} from "react-router-dom";
import useJumboAuth from "@jumbo/hooks/useJumboAuth";
import { successNotification, errorNotification } from 'app/utils/alertNotificationUtility';
import { useDispatch } from 'react-redux';
import { AUTH_ACCESS } from 'app/utils/constants/user';
import logo from "assets/bharuch-health.png";

const validationSchema = yup.object({
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string('Enter your password')
        .required('Password is required'),
});

const Login2 = ({disableSmLogin}) => {
    const {setAuthToken, setAuthData} = useJumboAuth();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onSignIn = (email, password, cb) => {
        authServices.signIn({email, password})
            .then((data) => {
                if(data && data.success && data.result.token){
                    const roleData = data?.result?.roleData;
                    console.log(roleData, "roleData roleData")
                    dispatch({ type: AUTH_ACCESS, payload: roleData });
                    setAuthToken(data?.result?.token);
                    
                    localStorage.setItem("access_token", JSON.stringify(roleData));
                    localStorage.setItem('token', data?.result?.token);
                    // let authUserData = await authServices.getCurrentUser();

                    setAuthData(data?.result)
                    
                    
                    setTimeout(()=>{
                        if(roleData && roleData.role == "super_admin"){
                            window.location.href = "/statistics";
                        }else{
                            // window.location.href = "/dashboard"
                            navigate("/dashboard");
                        }
                    }, 800)
                    
                    if(typeof cb === "function"){
                        cb();
                    }
                    // navigate("/");
                }else{
                    if(typeof cb === "function"){
                        cb();
                    }
                    errorNotification( (data && data.message) ? data.message : "You can not login due to technical issue");
                }
            });
        };

    return (
        <Div sx={{
            width: 790,
            maxWidth: '100%',
            margin: 'auto',
            p: 4
        }}>
            <Card
                sx={{
                    display: 'flex',
                    minWidth: 0,
                    flexDirection: {xs: 'column', md: 'row'}
                }}
            >
                <CardContent
                    sx={{
                        flex: '0 1 300px',
                        position: 'relative',
                        background: `#0267a0 url(${getAssetPath(`${ASSET_IMAGES}/widgets/keith-luke.jpg`, "640x428")}) no-repeat center`,
                        backgroundSize: 'cover',

                        '&::after': {
                            display: 'inline-block',
                            position: 'absolute',
                            content: `''`,
                            inset: 0,
                            backgroundColor: alpha('#0267a0', .65)
                        }
                    }}
                >
                    <Div
                        sx={{
                            display: 'flex',
                            minWidth: 0,
                            flex: 1,
                            flexDirection: 'column',
                            color: 'common.white',
                            position: 'relative',
                            zIndex: 1,
                            height: '100%'
                        }}
                    >
                        <Div sx={{mb: 2}}>
                            <Typography variant={"h3"} color={"inherit"} fontWeight={500} mb={3}>Sign In - Bharuch Health Portal</Typography>
                            <Typography variant={"body1"} mb={2}>
                                By signing in, you can perform your task.
                            </Typography>
                            <Typography variant={"body1"}>
                                <Link
                                    href={"#"}
                                    color={"inherit"}
                                    underline={'none'}
                                >Forgot your password? Recover Now
                                </Link>
                            </Typography>
                        </Div>

                        <Div sx={{mt: 'auto'}}>
                            <Link href="#" underline="none" sx={{display: 'inline-flex'}}>
                                <img style={{
                                    maxWidth:'120px'
                                }} src={logo} alt="Jumbo React"/>
                            </Link>
                        </Div>
                    </Div>
                </CardContent>
                <CardContent sx={{flex: 1, p: 4}}
                >
                    <Formik
                        validateOnChange={true}
                        initialValues={{
                            email: '',
                            password: '',
                        }}
                        validationSchema={validationSchema}
                        onSubmit={(data, {setSubmitting}) => {
                            setSubmitting(true);
                            onSignIn(data.email, data.password, ()=>{setSubmitting(false);});
                            
                        }}
                    >
                        {({isSubmitting}) => (
                            <Form action='/dashboard' style={{textAlign: 'left'}} noValidate >
                                <Div sx={{mt: 1, mb: 3}}>
                                    <JumboTextField
                                        fullWidth
                                        name="email"
                                        label="Email"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Div>
                                <Div sx={{mt: 1, mb: 2}}>
                                    <JumboTextField
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Div>
                                <Div sx={{mb: 2}}>
                                    <FormControlLabel control={<Checkbox/>} label="Remember me"/>
                                </Div>
                                <LoadingButton
                                    fullWidth
                                    type="submit"
                                    variant="contained"
                                    size="large"
                                    sx={{mb: 3}}
                                    loading={isSubmitting}
                                >Sign In</LoadingButton>
                                {/* Social media login is removed if need then get from theme */}

                            </Form>
                        )}
                    </Formik>
                </CardContent>
            </Card>
        </Div>
    );
};

export default Login2;
