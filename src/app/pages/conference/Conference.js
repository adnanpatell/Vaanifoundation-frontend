import React, { useEffect, useRef } from 'react';
import JumboCardQuick from "@jumbo/components/JumboCardQuick";
import videojs from "video.js";
import JsmpegPlayer from './JsmpegPlayer';
import ReactHlsPlayer from 'react-hls-player';

import './conference.css';
import { Grid, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getPHcList } from 'app/redux/actions/phcActions';
import { PHC_LIST } from 'app/utils/constants/phc';
import {styled} from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';

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

const videoOverlayOptions = {};
const Conference = () => {
    const dispatch = useDispatch();

    const [expanded, setExpanded] = React.useState(false);
    
    const handleExpandChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    let jsmpegPlayer = null;
    const videoOptions = {
        poster: 'https://cycjimmy.github.io/staticFiles/images/screenshot/big_buck_bunny_640x360.jpg'
    };
    
    useEffect(()=>{
        dispatch(getPHcList());
    },[]);

    const patientList = useSelector((state)=> state.phc[PHC_LIST]);
    
    return (
        <JumboCardQuick
            title={`Conference`}
            subheader={``}
            
            wrapperSx={{p: 0}}
        >
            <JsmpegPlayer
                wrapperClassName="video-wrapper"
                videoUrl={process.env.REACT_APP_STREAM_URL}
                options={videoOptions}
                overlayOptions={videoOverlayOptions}
                onRef={ref => jsmpegPlayer = ref}
            />
           

            {/* 
            <div className="buttons-wrapper">
                <button onClick={() => jsmpegPlayer.play()}>Play</button>
                <button onClick={() => jsmpegPlayer.pause()}>Pause</button>
                <button onClick={() => jsmpegPlayer.stop()}>Stop</button>
            </div>
            */}
            <Grid container spacing={1}>

                {
                    patientList && patientList.map((phc)=>{
                        return (
                            (phc.streamSettings && phc.streamSettings.length > 0) ? (
                                <Grid key={phc._id+"stream"} sx={{mt:1}} item xs={12}>
                                    <Accordion expanded={expanded === phc._id} onChange={handleExpandChange(phc._id)}>
                                        <AccordionSummary aria-controls={`${phc._id}d-content`} id={`${phc._id}d-header`}>
                                            <Typography>{phc.name} #{phc.phc_number}</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Grid container spacing={2} sx={{p:2}}>
                                                {
                                                    phc.streamSettings && phc.streamSettings.map((str)=>{
                                                        return (
                                                            <Grid item xs={6}>
                                                                <ReactHlsPlayer
                                                                    src={str.camera_url}
                                                                    autoPlay={false}
                                                                    controls={true}
                                                                    width="100%"
                                                                    height="auto"
                                                                />
                                                                <Typography>Stream Name : {str.camera_name}</Typography>
                                                            </Grid>
                                                        )
                                                    })
                                                }
                                            </Grid>
                                        </AccordionDetails>
                                    </Accordion>
                                </Grid>
                            ) : ('')                            
                        )
                    })
                }
                {/* <Grid item xs={4}>
                    <ReactHlsPlayer
                        src="https://assets.afcdn.com/video49/20210722/v_645516.m3u8"
                        autoPlay={false}
                        controls={true}
                        width="100%"
                        height="auto"
                    />
                </Grid> */}
            </Grid>

        </JumboCardQuick>
    );
};

export default Conference;