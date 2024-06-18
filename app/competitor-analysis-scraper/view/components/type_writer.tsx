"use client"
import React ,{useState , useEffect} from "react";
export default function TypeWriter({ text, delay ,infinite , state,setState}:{text:string,delay:number , infinite?:boolean ,state:boolean, setState:any}) {
    const [currentText, setCurrentText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(()=>{
        if(currentIndex<text.length){
            const timeout = setTimeout(()=>{
                setCurrentText(prevText =>prevText + text[currentIndex]);
                setCurrentIndex(prevIndex => prevIndex +1);
            },delay)
        }else if(infinite){
            setCurrentIndex(0);
            setCurrentText("");
        }else{
            setState(!state);
        }
    },[currentIndex , delay , text])
    return ( 
        <span>{currentText}</span>
    );
    
  }