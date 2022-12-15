import { useState } from "react"
import { Arrow } from "../Icons/Arrow"

export function OpenInputPassword({ placeholder = "Mot de passe", type = "password" }) {

    const [isInputOpen, setIsInputOpen] = useState(false)

    return (
        <div className={`flex flex-col border-b dark:border-b-white border-b-blue ${isInputOpen ? "pb-[30px]" : "pb-0"}`}>
            <div className={`flex items-center justify-between duration-200 pb-2.5`}>
                <label className="dark:text-white font-bold text-blue">{placeholder}</label>
                <Arrow className={`${isInputOpen && "rotate-90"} duration-200`} onClick={() => setIsInputOpen(!isInputOpen)} />
            </div>
            <div className={`w-full flex flex-col items-center overflow-hidden duration-200 ${isInputOpen ? "h-[135px]" : "h-0"}`}>
            <input type={type} className={`bg-transparent w-3/4 pl-[15px] outline-none py-2.5 border-b dark:border-b-white placeholder:text-gray border-b-blue dark:text-white text-blue`} placeholder="Ancien mot de passe"/>
            <input type={type} className={`bg-transparent w-3/4 pl-[15px] outline-none py-2.5 border-b dark:border-b-white placeholder:text-gray border-b-blue dark:text-white text-blue`} placeholder="Nouveau mot de passe"/>
            <input type={type} className={`bg-transparent w-3/4 pl-[15px] outline-none py-2.5 border-b dark:border-b-white placeholder:text-gray border-b-blue dark:text-white text-blue`} placeholder="Confirmer mot de passe"/>
            </div>
        </div>
    )
}