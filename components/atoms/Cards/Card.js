import { useState } from "react";
import joinClasses from "../../../helpers/joinClasses";

export function Card({children, onMouseEnter, onMouseLeave, className = "", edit}){


    return <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} className={joinClasses(className,`md:w-[73%] w-full h-[69px] relative flex items-center justify-evenly  ${edit ? `dark:bg-white bg-blue shadow` : "bg-transparent shadow-none"}  rounded-lg`)}>
        
        {children}
    </div>
}

