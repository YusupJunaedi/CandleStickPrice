import React, { useState, useEffect } from 'react'
import ApexCharts from 'react-apexcharts'
import { useDispatch, useSelector } from 'react-redux';
import { getAPICreator } from '../../Redux/Actions/actions';
import { groupBy, sortBy } from 'lodash';
import './Chart.css'

function Chart() {

    const dispatch = useDispatch()
    const DataApi = useSelector(state => state.API.dataAPI)

    const [dataTime, setDataTime] = useState(null)

    const [series, setSeries] = useState([{
        data: []
    }])
    const [options, setOptions] = useState({
        chart: {
            type: 'candlestick',
            height: 350
        },
        title: {
            text: 'CandleStick Chart',
            align: 'left'
        },
        xaxis: {
            type: 'datetime'
        },
        yaxis: {
            tooltip: {
                enabled: true
            }
        }
    })

    const FilterDataApi = () => {
        const sortedDate = sortBy(DataApi, (o) => {
            return o.timestamps
        })
        // bwt pembanding timenya
        let groupTime = []
        // group time nya
        const groupData = groupBy(sortedDate, (d) => {
            let time = new Date(d.timestamps)
            if (!groupTime) groupTime = new Date(time.getTime() + dataTime)
            return time - groupTime < 300000 ? groupTime : groupTime = time
        })
        const dataArray = Object.values(groupData).map((value, index) => {
            return value
        })
        let newdata = dataArray.map((v, idx) => {
            let temp = [];
            let open = v[0].price
            let close = v[v.length - 1].price;
            let low = 0;
            let high = 0;
            let time = v[0].timestamps + (idx * dataTime)
            v.map((e, idx) => {
                if (idx === 0) {
                    low = e.price;
                } else if (e.price < low) {
                    low = e.price;
                }
                if (e.price > high) {
                    high = e.price;
                }
            })
            return {
                x: time,
                y: [open, close, high, low]
            }
        })

        setSeries([{ data: newdata }])
    }


    useEffect(() => {
        dispatch(getAPICreator())
    }, [])

    useEffect(() => {
        FilterDataApi()
    }, [dataTime])

    console.log(series);

    return (
        <>
            <div class="btn-group">
                <button onClick={() => setDataTime(5 * 60000)}>5 Minute</button>
                <button onClick={() => setDataTime(15 * 60000)}>15 Minute</button>
                <button onClick={() => setDataTime(30 * 60000)}>30 Minute</button>
                <button onClick={() => setDataTime((3 * 60) * 60000)}>3 Hours</button>
                <button>7 Hours</button>
                <button>1 Day</button>
                <button>1 Week</button>
                <button>1 Month</button>
            </div>
            <div id="chart">
                <ApexCharts options={options} series={series} type="candlestick" height={350} />
            </div>
        </>
    )
}

export default Chart
