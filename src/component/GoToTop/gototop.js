import React,{useEffect, useState} from "react";
import "./gototop.css";

export default function Gototop() {
    const [isVisible, setIsVisible] = useState(false);
    useEffect(()=>{
        const toggleVisibility=()=>{
            if(window.scrollY>200){
                setIsVisible(true);
            }
            else{
                setIsVisible(false);
            }
        };
        window.addEventListener("scroll",toggleVisibility);
        return()=> window.removeEventListener("scroll", toggleVisibility);
    },[]);

    const scrollToTop = () => {
        window.scrollTo({top: 0, behavior: "smooth",
        });
    }

    return (
        <div>
            <a
                id="toTop"
                href="#">↑</a>
        </div>
    );
}