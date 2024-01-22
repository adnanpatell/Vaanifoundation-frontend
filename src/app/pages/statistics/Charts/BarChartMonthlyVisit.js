import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getVisitStatistics } from 'app/redux/actions/statisticsActions';
import { VISITS_LIST } from 'app/utils/constants/statistics';
import { BarChart, Bar, XAxis, YAxis, Tooltip as REToolTip, ResponsiveContainer } from 'recharts';

const BarChartMonthlyVisit = (props) => {
    const dispatch = useDispatch();
    const statisticsList = useSelector((state)=> state.statistics[VISITS_LIST]);
    useEffect(()=>{
        dispatch(getVisitStatistics());
        return ()=> dispatch({ type: VISITS_LIST, payload: [] });
    },[dispatch]);

    return (
        <>
            {
                statisticsList && statisticsList.length > 0 && (
                    <ResponsiveContainer width="100%" height={200}>
                        <BarChart margin={{top: 0, right: 0, left: 0, bottom: 0}} data={statisticsList}>
                            <Bar dataKey="visits" fill="#e91e63" />
                            <XAxis dataKey="_id" />
                            <YAxis />
                            <REToolTip />
                        </BarChart>
                    </ResponsiveContainer>
                )
            }
        </>
    )
}

export default BarChartMonthlyVisit;