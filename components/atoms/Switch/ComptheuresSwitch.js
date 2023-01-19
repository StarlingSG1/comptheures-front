import { useState } from "react"
import joinClasses from "../../../helpers/joinClasses"

export function ComptheuresSwitch({ children, className="", comptheuresSwitch, setComptheuresSwitch }) {


    return (
        <div className={joinClasses(className,"h-[54px] w-full relative dark:bg-blue-dark bg-blue rounded-xl mt-10")}>
            <button onClick={() => {setComptheuresSwitch(false)}} className={`${comptheuresSwitch ? "text-gray" : "font-bold text-blue"} h-full w-1/2 relative z-10`}>Compter ses heures</button>
            <button onClick={() => {setComptheuresSwitch(true)}} className={`${comptheuresSwitch ? "font-bold text-blue" : "text-gray"} h-full w-1/2 relative z-10`}>Récapitulatif</button>
            <span className={`${comptheuresSwitch ? "translate-x-full" : "translate-x-0"} duration-200 bg-white top-[3px] left-[3px] bottom-[3px] rounded-[9px] absolute`} style={{width: "calc(50% - 3px)"}}></span>
        </div>
    )
}   