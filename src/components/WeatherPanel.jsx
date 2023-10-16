import styles from "./WeatherPanel.module.scss"
import {dateFormater} from "./dateFormater"


import ForecastPanel from "./forecastPanel"
import InfoPanel from "./infoPanel"
import LinesChart from "./linesChart";


export default function WeatherPanel ({weatherData, forecastData, resetWeatherData, changeWeatherData, lightMode}){
    
    var fechaActual = new Date();

    // Obtener el día actual (del 1 al 31)
    var dia = fechaActual.getDate();

    // Obtener el mes actual (del 0 al 11, donde 0 es enero y 11 es diciembre)
    var mes = fechaActual.getMonth() + 1; // Sumamos 1 porque los meses se cuentan desde 0

    // Formatear el día y el mes como "dd/mm"
    var diaMesActual = dia.toString().padStart(2, '0') + '/' + mes.toString().padStart(2, '0');

    var dias = [
        diaMesActual, 
        dateFormater(forecastData.list[1].dt_txt), 
        dateFormater(forecastData.list[9].dt_txt), 
        dateFormater(forecastData.list[17].dt_txt), 
        dateFormater(forecastData.list[25].dt_txt),
        dateFormater(forecastData.list[33].dt_txt)
    ];
    
    return(
        
        <div className = {styles.container} >
                {
                    weatherData && forecastData &&
                    <>  
                        <InfoPanel 
                            weatherData = {weatherData} 
                            lightMode= {lightMode}
                        />
                        <div className={styles.containerChartForecast}>                            
                            <div className={`${styles.grafico} ${lightMode ? styles.graficoLightMode : ""}`}>
                                <LinesChart 
                                    forecastData = {forecastData}
                                    dias = {dias}
                                    lightMode= {lightMode}
                                />
                            </div>
                            <ForecastPanel
                                forecastData = {forecastData}
                                dias = {dias}
                                resetWeatherData = {resetWeatherData}
                                changeWeatherData={changeWeatherData}
                                lightMode= {lightMode}
                            />   
                        </div>
                        
                        
                        
                    </>
                    
                }
                <>
                    
                </>
            
            
            
        
        </div>
    );


}