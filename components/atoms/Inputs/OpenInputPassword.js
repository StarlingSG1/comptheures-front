import { useState } from "react"
import { Arrow } from "../Icons/Arrow"

export function OpenInputPassword({ placeholder = "Mot de passe", type = "password", currentUser, setCurrentUser = () => {} }) {

    const [isInputOpen, setIsInputOpen] = useState(false)

    return (
        <div className={`flex flex-col border-b dark:border-b-white border-b-blue ${isInputOpen ? "pb-[30px]" : "pb-0"}`}>
            <div className={`flex items-center justify-between duration-200 pb-2.5 cursor-pointer`} onClick={() => setIsInputOpen(!isInputOpen)}>
                <label className="dark:text-white font-bold text-blue">{placeholder}</label>
                <Arrow className={`${isInputOpen && "rotate-90"} duration-200`} />
            </div>
            <div className={`w-full flex flex-col items-center overflow-hidden duration-200 ${isInputOpen ? "h-[135px]" : "h-0"}`}>
            <input type={type} onChange={(e) => {
                setCurrentUser({...currentUser, password: {...currentUser.password, old: e.target.value}})
            }} className={` ${isInputOpen ? "py-2.5 h-[45px]" : "py-0 h-0"} duration-200 bg-transparent w-3/4 pl-[15px] outline-none  border-b dark:border-b-white placeholder:text-gray border-b-blue dark:text-white text-blue`} placeholder="Ancien mot de passe"/>
            <input type={type} onChange={(e) => {setCurrentUser({...currentUser, password: {...currentUser.password, new: e.target.value}})}} className={` ${isInputOpen ? "py-2.5 h-[45px]" : "py-0 h-0"} duration-200 bg-transparent w-3/4 pl-[15px] outline-none  border-b dark:border-b-white placeholder:text-gray border-b-blue dark:text-white text-blue`} placeholder="Nouveau mot de passe"/>
            <input type={type} onChange={(e) => {setCurrentUser({...currentUser, password: {...currentUser.password, confirm: e.target.value}})}} className={` ${isInputOpen ? "py-2.5 h-[45px]" : "py-0 h-0"} duration-200 bg-transparent w-3/4 pl-[15px] outline-none  border-b dark:border-b-white placeholder:text-gray border-b-blue dark:text-white text-blue`} placeholder="Confirmer mot de passe"/>
            </div>
        </div>
    )
}