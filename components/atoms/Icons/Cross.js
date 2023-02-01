import { useEffect, useState } from "react";
import { useUserContext } from "../../../context";
import joinClasses from "../../../helpers/joinClasses";

export function Cross({onClick, width = "24", height = "24", color = "currentColor"}){

    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} className={`dark:stroke-white stroke-blue cursor-pointer`} onClick={onClick} viewBox="0 0 16 16"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m11.25 4.75l-6.5 6.5m0-6.5l6.5 6.5"/></svg>

    )
}