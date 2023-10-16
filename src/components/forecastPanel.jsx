import caution from "../assets/caution.png"
import cloud from "../assets/cloud.png"
import drizzle from "../assets/drizzle.png"
import rain from "../assets/rain.png"
import snow from "../assets/snow.png"
import storm from "../assets/storm.png"
import sun from "../assets/sun.png"

import {v4 as uuidv4} from "uuid"
import styles from "./forecastPanel.module.scss"
import { useEffect, useState } from "react"


export default function forecastPanel({forecastData, dias, resetWeatherData, changeWeatherData, lightMode}) {


    

    const assetsMapping = {
        "200": {icon: storm},
        "201": {icon: storm},
        "202": {icon: storm},
        "210": {icon: storm},
        "211": {icon: storm},
        "212": {icon: storm},
        "221": {icon: storm},
        "230": {icon: storm},
        "231": {icon: storm},
        "232": {icon: storm},

        "300": {icon: drizzle},
        "301": {icon: drizzle},
        "302": {icon: drizzle},
        "310": {icon: drizzle},
        "311": {icon: drizzle},
        "312": {icon: drizzle},
        "313": {icon: drizzle},
        "314": {icon: drizzle},
        "321": {icon: drizzle},

        "500": {icon: rain},
        "501": {icon: rain},
        "502": {icon: rain},
        "503": {icon: rain},
        "504": {icon: rain},
        "511": {icon: rain},
        "520": {icon: rain},
        "521": {icon: rain},
        "522": {icon: rain},
        "531": {icon: rain},

        "600": {icon: snow},
        "601": {icon: snow},
        "602": {icon: snow},
        "611": {icon: snow},
        "612": {icon: snow},
        "613": {icon: snow},
        "615": {icon: snow},
        "616": {icon: snow},
        "620": {icon: snow},
        "621": {icon: snow},
        "622": {icon: snow},

        "701": {icon: caution},
        "711": {icon: caution},
        "721": {icon: caution},
        "731": {icon: caution},
        "741": {icon: caution},
        "751": {icon: caution},
        "761": {icon: caution},
        "762": {icon: caution},
        "771": {icon: caution},
        "781": {icon: caution},

        "800": {icon: sun},

        "801":{icon: cloud},
        "802":{icon: cloud},
        "803":{icon: cloud},
        "804":{icon: cloud},          
    };

    const positionForecastDataMapping = {
        "0": 1,
        "1": 9,
        "2": 17,
        "3": 25,
        "4": 33
    }

    const [forecastCardsInformation, setForecastCardsInformation] = useState(
        [
            {
                temp: ((forecastData.list[1].main.temp) - 273).toFixed(1),
                icon: assetsMapping[forecastData.list[1].weather[0].id] || {icon: caution},
                day: dias[1],
                id : uuidv4(),
                selected: false,
                pos: 0,
            },
            {
                temp: ((forecastData.list[9].main.temp) - 273).toFixed(1),
                icon: assetsMapping[forecastData.list[9].weather[0].id] || {icon: caution},
                day: dias[2],
                id : uuidv4(),
                selected: false,
                pos: 1,
            },
            {
                temp: ((forecastData.list[17].main.temp) - 273).toFixed(1),
                icon: assetsMapping[forecastData.list[17].weather[0].id] || {icon: caution},
                day: dias[3],
                id : uuidv4(),
                selected: false,
                pos: 2,
            },
            {
                temp: ((forecastData.list[25].main.temp) - 273).toFixed(1),
                icon: assetsMapping[forecastData.list[25].weather[0].id] || {icon: caution},
                day: dias[4],
                id : uuidv4(),
                selected: false,
                pos: 3,
            },
            {
                temp: ((forecastData.list[33].main.temp) - 273).toFixed(1),
                icon: assetsMapping[forecastData.list[33].weather[0].id] || {icon: caution},
                day: dias[5],
                id : uuidv4(),
                selected: false,
                pos: 4,
            }
        ]
    ); 

    
        

    const [currentSelected, setCurrentSelected] = useState(null);

    
    function addCityNameToForecastData(index){
        const newData = {...forecastData.list[positionForecastDataMapping[index]], name: forecastData.city.name}
        return newData;
    }

    const handleCardClick = (index) => {

        if(currentSelected === null){
            console.log("no hay currentSelect");        
            console.log("Tarjeta clickeada en el índice", index);        
            const updatedForecastCards = [...forecastCardsInformation];
            updatedForecastCards[index].selected = !updatedForecastCards[index].selected;
            console.log("Tarjetas actualizadas:", updatedForecastCards);
            setForecastCardsInformation(updatedForecastCards);
            setCurrentSelected(index);
            changeWeatherData(addCityNameToForecastData(index));
        }
        else{
            if(index === currentSelected){
                console.log("hay currentselect y clickeo la misma");        
                console.log("Tarjeta clickeada en el índice", index);
                const updatedForecastCards = [...forecastCardsInformation];
                updatedForecastCards[index].selected = !updatedForecastCards[index].selected;
                console.log("Tarjetas actualizadas:", updatedForecastCards);
                setForecastCardsInformation(updatedForecastCards);
                setCurrentSelected(null);
                resetWeatherData();
            }
            else{
                console.log("hay currentselect y clickeo otra");        
                console.log("Tarjeta clickeada en el índice", index);
                const updatedForecastCards = [...forecastCardsInformation];
                updatedForecastCards[index].selected = !updatedForecastCards[index].selected;
                updatedForecastCards[currentSelected].selected = !updatedForecastCards[currentSelected].selected;
                console.log("Tarjetas actualizadas:", updatedForecastCards);
                setForecastCardsInformation(updatedForecastCards);
                setCurrentSelected(index);
                changeWeatherData(addCityNameToForecastData(index));
                
            }
            
        }
        
        
        
    }

    return(
        
        <div className= {styles.container}
            draggable="false"
        >
           {
                forecastCardsInformation.map( (card) => (
                    
                    <div className= {`${styles.card} ${card.selected ? styles.selected : ""} ${lightMode ? styles.cardLightMode :""}` } 
                        key={card.id}
                        onClick={()=>{                            
                            handleCardClick(card.pos);
                        }}
                        
                    >
                        <div className={styles.iconTemp}>
                            <img
                                className= {styles.icon} src={card.icon.icon} alt="https://icons8.com/" draggable="false"    
                            />
                            <p className={styles.temp}>{card.temp}º</p>    
                        </div>
                        
                        <p className={styles.day}>{card.day}</p>
                    </div>
                ))
           } 
        </div>
    );
    
} 