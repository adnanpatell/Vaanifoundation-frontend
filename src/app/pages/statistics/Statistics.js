import React from 'react';
import JumboCardQuick from "@jumbo/components/JumboCardQuick";
import OfflineBoltOutlinedIcon from '@mui/icons-material/OfflineBoltOutlined';
import {Grid} from "@mui/material";
import CardIconText from "@jumbo/shared/CardIconText";
import VaccinesIcon from '@mui/icons-material/Vaccines';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import SummarizeIcon from '@mui/icons-material/Summarize';
const PHCVisitPieChart = React.lazy(() => import('./Charts/PHCVisitPieChart'));
const BarChartMonthlyVisit = React.lazy(() => import('./Charts/BarChartMonthlyVisit'));

const Statistics = (props) => {
    
    return (
        <>
            <Grid container spacing={3.75}>
                <Grid item xs={12} sm={6} lg={4}>
                    <CardIconText
                        icon={<LocalHospitalIcon fontSize={"large"}/>}
                        onHoverIcon={<OfflineBoltOutlinedIcon fontSize={"large"}/>}
                        title={"2,371"}
                        subTitle={'Total Appointments'}
                        hideArrow={true}
                    />
                </Grid>

                <Grid item xs={12} sm={6} lg={4}>
                    <CardIconText
                        icon={<SummarizeIcon fontSize={"large"}/>}
                        onHoverIcon={<OfflineBoltOutlinedIcon fontSize={"large"}/>}
                        title={"2,371"}
                        subTitle={'Total lab reports'}
                        hideArrow={true}
                    />
                </Grid>

                <Grid item xs={12} sm={6} lg={4}>
                    <CardIconText
                        icon={<VaccinesIcon fontSize={"large"}/>}
                        onHoverIcon={<OfflineBoltOutlinedIcon fontSize={"large"}/>}
                        title={"2,371"}
                        subTitle={'Total patients'}
                        hideArrow={true}
                    />
                </Grid>
            </Grid>


            <Grid container spacing={3.75} sx={{mt:4}}>
                <Grid item xs={12} sm={12} lg={12}>
                    <JumboCardQuick
                        title={`Statistics`}
                        subheader={`Statistics of visits`}                        
                    >
                        <BarChartMonthlyVisit />
                    </JumboCardQuick>
                </Grid>

                <Grid item xs={12} sm={6} lg={6}>
                    <JumboCardQuick
                        title={`Statistics`}
                        subheader={`Statistics of visits`}                        
                    >
                        <PHCVisitPieChart />
                    </JumboCardQuick>
                </Grid>
            </Grid>
            
        </>
    );
};

export default Statistics;
