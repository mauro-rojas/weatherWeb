import styles from "./SearchBar.module.scss"
import { useRef, useState } from "react";

export default function searchBar({onSubmit, lightMode}) {

    const [search, setSearch] = useState("");
    const inputRef = useRef(null);
    const buttonRef = useRef(null);

    function enter() {
        buttonRef.current.style.backgroundColor = "rgb(180, 67, 184)";
        inputRef.current.style.borderColor = "rgb(180, 67, 184)";
        
    }

    function exit(){
        buttonRef.current.style.backgroundColor = "";
        inputRef.current.style.borderColor = "";
    }

    return(
        <>
            <form className= {styles.formulario}
                onSubmit={e=>{
                    e.preventDefault();   
                    console.log(search); 
                    onSubmit(search);
                    setSearch("");
                }}
            >
                <input className={`${styles.entrada} ${lightMode ? styles.lightMode : styles.darkMode}`}
                    type = "text" 
                    name = "search" 
                    ref = {inputRef}
                    autoComplete = "off" 
                    placeholder = "ciudad o codigo postal"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}   
                >
                </input>
                <button className={styles.boton}
                    type="submit"
                    ref = {buttonRef}
                    disabled = {search.trim() === "" || !search }
                    onMouseOver={enter}
                    onMouseLeave={exit}
                >
                    Buscar
                </button>
            </form>    
        </>
    );
}