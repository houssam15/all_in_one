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
        <>
        <style jsx>{`
        @keyframes blinkTextCursor {
          from {
            border-right: transparent;
          }
          to {
            border-right:1px solid  gray;
          }
        }
      `}</style>
        <span  style={!passed?{
          animation: 'blinkTextCursor 500ms steps(2) infinite normal',
        }:{}}>{currentText}</span>
        </>
    );
    
  }