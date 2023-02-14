import { useState } from "react"
import joinClasses from "../../../helpers/joinClasses"

export function ComptheuresSwitch({ children, className="", comptheuresSwitchState, setComptheuresSwitchState }) {


    return (
        <div className={joinClasses(className,"h-[54px] w-full relative dark:bg-blue-dark bg-blue rounded-xl mt-10")}>
            <button onClick={() => {setComptheuresSwitchState(false)}} className={`${comptheuresSwitchState ? "text-gray" : "font-bold text-blue"} h-full w-1/2 relative text-sm sm:text-base z-10`}>Compter ses heures</button>
            <button onClick={() => {setComptheuresSwitchState(true);}} className={`${comptheuresSwitchState ? "font-bold text-blue" : "text-gray"} h-full w-1/2 relative text-sm sm:text-base z-10`}>Récapitulatif</button>
            <span className={`${comptheuresSwitchState ? "translate-x-full" : "translate-x-0"} duration-200 bg-white top-[3px] left-[3px] bottom-[3px] rounded-[9px] absolute`} style={{width: "calc(50% - 3px)"}}></span>
        </div>
    )
}   