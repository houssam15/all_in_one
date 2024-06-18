"use client"
import React ,{useState , useEffect} from "react";
export default function TypeWriter({ text, delay  ,state}:{text:string,delay:number ,  state:boolean}) {
    const [currentText, setCurrentText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [passed,setPassed] = useState(false)
    useEffect(()=>{
        if(currentIndex<text.length && !passed){
            setTimeout(()=>{
                setCurrentText(prevText =>prevText + text[currentIndex]);
                setCurrentIndex(prevIndex => prevIndex +1);
            },delay)
        }else{
            setCurrentIndex(0);       
            setPassed(true);  
        }
    },[currentIndex , delay , text])
    return ( 
        <span>{currentText}</span>
    );
    
  }