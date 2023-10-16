// import {dateFormater} from "./dateFormater"
import {
        Chart as ChartJS,
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend,
        Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

export default function linesChart ({forecastData, dias, lightMode}){
   

    var temp = [
        (forecastData.list[0].main.temp - 273).toFixed(0), 
        (forecastData.list[1].main.temp - 273).toFixed(0), 
        (forecastData.list[9].main.temp - 273).toFixed(0), 
        (forecastData.list[17].main.temp - 273).toFixed(0), 
        (forecastData.list[25].main.temp - 273).toFixed(0),
        (forecastData.list[33].main.temp - 273).toFixed(0)
    ];

    var velViento =[
        forecastData.list[0].wind.speed,
        forecastData.list[1].wind.speed,
        forecastData.list[9].wind.speed,
        forecastData.list[17].wind.speed,
        forecastData.list[25].wind.speed,
        forecastData.list[33].wind.speed,

    ]

    var myData = {
        labels: dias,
        datasets:[  //cada linea del grafico
            {
                label: "temperatura ºC",
                data: temp,
                tension: 0.5,
                fill: true,
                borderColor: "rgb(171, 41, 247)",
                backgroundColor: "rgba(171, 41, 247, 0.05)",
                pointRadius:5,
                //pointBorderColor: "rgba(211, 114, 235)",
                pointBackgroundColor: "rgb(240, 248, 255)",
            },
            {
                label: "vel. viento m/s",
                data: velViento,
                tension: 0.5,
                fill: true,
                borderColor: "rgb(240, 248, 255)", 
                backgroundColor: "rgba(0, 0, 0, 0.2)",              
                pointRadius:5,
                pointBackgroundColor: "rgb(171, 41, 247)",
            },
        ]
    };

    var myOptions = {
            responsive: true,
            plugins: {
                tooltip: {
                  enabled: false, // Desactivar los tooltips
                },
                legend:{
                    labels:{
                        color:`${lightMode ? "rgb(255, 255, 255)" : "rgba(255, 255, 255, 0.5)"}`,
                    }
                },
                
            },
            scales: {
                x: {
                  grid: {
                    color: `${lightMode ? "rgb(255, 255, 255, 0.2)" : "rgba(255, 255, 255, 0.1)"}`, // Cambia el color de las líneas de fondo en el eje X
                  },
                  ticks:{
                    color:`${lightMode ? "rgb(255, 255, 255)" : "rgba(255, 255, 255, 0.5)"}`
                  },
                },
                y: {
                  grid: {
                    color: `${lightMode ? "rgb(255, 255, 255, 0.2)" : "rgba(255, 255, 255, 0.1)"}`, // Cambia el color de las líneas de fondo en el eje Y
                  },
                  ticks:{
                    color:`${lightMode ? "rgb(255, 255, 255)" : "rgba(255, 255, 255, 0.5)"}`
                  },
                },
            },
              
          };



    return(
        <Line data ={myData} options = {myOptions}/>
    );
}