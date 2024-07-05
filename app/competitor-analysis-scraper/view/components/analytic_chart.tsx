import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';



export default function AnalyticChart ({data}:{data:number[]}) {
    const options = {
        chart: {
          type: 'spline',
          width:450,
          height:170,
        },
        title: null,
        yAxis: {
            tickInterval: 1,
        },
        legend:{
            enabled:false
        },
        series: [
          {
            data: data
          }
        ]
    };
    return(
    <HighchartsReact highcharts={Highcharts} options={options}/>
    );
}
