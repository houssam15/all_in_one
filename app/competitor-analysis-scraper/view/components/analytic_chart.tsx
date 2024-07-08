import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';



export default function AnalyticChart ({type , yData , xData}:{type:string , yData:any , xData:any}) {
    const options = {
        chart: {
          type: type,
          width:450,
          height:170,
        },
        title: null,
        yAxis: {
            tickInterval: 1,
        },
        xAxis:{
          categories:xData
        },
        legend:{
            enabled:false
        },
        series: yData
    };
    return(
    <HighchartsReact highcharts={Highcharts} options={options}/>
    );
}
