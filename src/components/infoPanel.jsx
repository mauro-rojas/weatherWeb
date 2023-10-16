import styles from "./infoPanel.module.scss"
import caution from "../assets/caution.png"
import cloud from "../assets/cloud.png"
import drizzle from "../assets/drizzle.png"
import rain from "../assets/rain.png"
import snow from "../assets/snow.png"
import storm from "../assets/storm.png"
import sun from "../assets/sun.png"

import cloudsBackground from "../assets/backgroundClouds.jpg"
import drizzleBackground from "../assets/backgroundDrizzle.jpg"
import rainBackground from "../assets/backgroundRain.jpg"
import snowBackground from "../assets/backgroundSnow.jpg"
import stormBackground from "../assets/backgroundStorm.jpg"
import sunBackground from "../assets/backgroundSun.jpg"
import pressure from "../assets/pressure.png"
import humidity from "../assets/humidity.png"
import thermometer from "../assets/thermometer.png"
import { useState, useEffect } from "react"
import { motion } from "framer-motion";


export default function infoPanel({weatherData, lightMode}){

    const cautionIcon = <img className= {styles.icon} src={caution} alt="https://icons8.com/" draggable="false"/>;
    const cloudIcon = <img className= {styles.icon} src={cloud} alt="https://icons8.com/" draggable="false"/>;
    const drizzleIcon = <img className= {styles.icon} src={drizzle} alt="https://icons8.com/" draggable="false"/>;
    const rainIcon = <img className= {styles.icon} src={rain} alt="https://icons8.com/" draggable="false"/>;
    const snowIcon = <img className= {styles.icon} src={snow} alt="https://icons8.com/" draggable="false"/>;
    const stormIcon = <img className= {styles.icon} src={storm} alt="https://icons8.com/" draggable="false"/>;
    const sunIcon = <img className= {styles.icon} src={sun} alt="https://icons8.com/" draggable="false"/>;

    const [currentIcon, setCurrentIcon] = useState(null);
    const [currentBackground, setCurrentBackground] = useState("");
    
    
    const assetsMapping = {
        "200": {icon: stormIcon, background: stormBackground},
        "201": {icon: stormIcon, background: stormBackground},
        "202": {icon: stormIcon, background: stormBackground},
        "210": {icon: stormIcon, background: stormBackground},
        "211": {icon: stormIcon, background: stormBackground},
        "212": {icon: stormIcon, background: stormBackground},
        "221": {icon: stormIcon, background: stormBackground},
        "230": {icon: stormIcon, background: stormBackground},
        "231": {icon: stormIcon, background: stormBackground},
        "232": {icon: stormIcon, background: stormBackground},

        "300": {icon: drizzleIcon, background: drizzleBackground},
        "301": {icon: drizzleIcon, background: drizzleBackground},
        "302": {icon: drizzleIcon, background: drizzleBackground},
        "310": {icon: drizzleIcon, background: drizzleBackground},
        "311": {icon: drizzleIcon, background: drizzleBackground},
        "312": {icon: drizzleIcon, background: drizzleBackground},
        "313": {icon: drizzleIcon, background: drizzleBackground},
        "314": {icon: drizzleIcon, background: drizzleBackground},
        "321": {icon: drizzleIcon, background: drizzleBackground},

        "500": {icon: rainIcon, background: rainBackground},
        "501": {icon: rainIcon, background: rainBackground},
        "502": {icon: rainIcon, background: rainBackground},
        "503": {icon: rainIcon, background: rainBackground},
        "504": {icon: rainIcon, background: rainBackground},
        "511": {icon: rainIcon, background: rainBackground},
        "520": {icon: rainIcon, background: rainBackground},
        "521": {icon: rainIcon, background: rainBackground},
        "522": {icon: rainIcon, background: rainBackground},
        "531": {icon: rainIcon, background: rainBackground},

        "600": {icon: snowIcon, background: snowBackground},
        "601": {icon: snowIcon, background: snowBackground},
        "602": {icon: snowIcon, background: snowBackground},
        "611": {icon: snowIcon, background: snowBackground},
        "612": {icon: snowIcon, background: snowBackground},
        "613": {icon: snowIcon, background: snowBackground},
        "615": {icon: snowIcon, background: snowBackground},
        "616": {icon: snowIcon, background: snowBackground},
        "620": {icon: snowIcon, background: snowBackground},
        "621": {icon: snowIcon, background: snowBackground},
        "622": {icon: snowIcon, background: snowBackground},

        "701": {icon: cautionIcon, background: stormBackground},
        "711": {icon: cautionIcon, background: stormBackground},
        "721": {icon: cautionIcon, background: stormBackground},
        "731": {icon: cautionIcon, background: stormBackground},
        "741": {icon: cautionIcon, background: stormBackground},
        "751": {icon: cautionIcon, background: stormBackground},
        "761": {icon: cautionIcon, background: stormBackground},
        "762": {icon: cautionIcon, background: stormBackground},
        "771": {icon: cautionIcon, background: stormBackground},
        "781": {icon: cautionIcon, background: stormBackground},

        "800": {icon: sunIcon, background: sunBackground},

        "801":{icon: cloudIcon, background: cloudsBackground},
        "802":{icon: cloudIcon, background: cloudsBackground},
        "803":{icon: cloudIcon, background: cloudsBackground},
        "804":{icon: cloudIcon, background: cloudsBackground},          
    };

    useEffect(() => {
        let newAssets = null;
        newAssets = assetsMapping[weatherData.weather[0].id] || {icon: cautionIcon, background: stormBackground};
        setCurrentIcon(newAssets.icon);
        setCurrentBackground(newAssets.background);
    }, [weatherData]);

    const TextInfoAnimation = {
        initial: { opacity: 0, y: -10 },
        animate: { opacity: 1 , y: 0},
    };
    

    return(
        <>
            <div className={`${styles.infoPanel} ${lightMode ? styles.infoPanelLightMode : ""}`}>
                <h1 className={styles.cityText }>{weatherData.name}</h1> 
                <div className={styles.mainInfo}>
                    <motion.div
                        initial= {{ opacity: 0, x: -50 }}
                        animate= {{ opacity: 1 , x: 0}}
                        transition= {{ duration: 0, type:"spring", stiffness:80 }}
                    >
                        {currentIcon}
                    </motion.div>
                    <motion.h2 
                        className={styles.mainTemp}
                        initial= {{ opacity: 0, x: 35 }}
                        animate= {{ opacity: 1 , x: 0}}
                        transition= {{ delay: .3, duration: 0, type:"spring", stiffness:80 }}
                    >
                        {(weatherData.main.temp - 273).toFixed(1)}º
                    </motion.h2>                
                </div>   
                <p className={styles.description}>
                    {weatherData.weather[0].description}
                </p>
                <div className= {`${styles.details} ${lightMode ? styles.detailsLightMode : ""}`}>
                    <motion.img 
                        className= {styles.detailIcon} 
                        src={thermometer} 
                        alt="https://icons8.com/" 
                        title="rango de temperaturas" draggable="false"
                        {...TextInfoAnimation}
                        transition= {{ delay: 0.6, duration: .6 }}
                    />
                    <motion.p className={styles.text}
                        {...TextInfoAnimation}
                        transition= {{ delay: .6, duration: .6 }}
                    >
                        Máx {(weatherData.main.temp_max - 273).toFixed(0)}º | Min {(weatherData.main.temp_min - 273).toFixed(0)}º
                    </motion.p>
                </div>
                <motion.div className={`${styles.details} ${lightMode ? styles.detailsLightMode : ""}`}>
                    <motion.img 
                        className= {styles.detailIcon} 
                        src={humidity} 
                        alt="https://icons8.com/" 
                        title="humedad" draggable="false"
                        {...TextInfoAnimation}
                        transition= {{ delay: .9, duration: .6 }}
                    />
                    <motion.p 
                        className={styles.text}
                        {...TextInfoAnimation}
                        transition= {{ delay: .9, duration: .6 }}
                    >
                        {weatherData.main.humidity}%                    
                    </motion.p>
                </motion.div>
                <div className={`${styles.details} ${lightMode ? styles.detailsLightMode : ""}`}>
                    <motion.img 
                        className= {styles.detailIcon} 
                        src={pressure} 
                        alt="https://icons8.com/" 
                        title="presion" 
                        draggable="false"
                        {...TextInfoAnimation}
                        transition= {{ delay: 1.1, duration: .6 }}
                    />
                    <motion.p 
                        className={styles.text}
                        {...TextInfoAnimation}
                        transition= {{ delay: 1.1, duration: .6 }}
                    >
                        {weatherData.main.pressure} hpa
                    </motion.p>
                </div>
            </div>
            <motion.img className = {styles.background} src={currentBackground} alt="background" draggable="false"
                key={currentBackground}
                initial= {{ opacity: 0 }}
                animate= { lightMode ? { opacity: .6} : { opacity : 0.2 }}
                transition={{duration: .8}}
            />
        </>
        
    );
}