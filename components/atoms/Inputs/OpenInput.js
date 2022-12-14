import { useState } from "react"
import { Arrow } from "../Icons/Arrow"

export function OpenInput({ placeholder = "placeholder", type = "text", defaultValue = "", onChange = () => {} }) {

    const [isInputOpen, setIsInputOpen] = useState(true)

    return (
        <div className="flex flex-col dark:border-white border-b border-b-blue">
            <div onClick={() => setIsInputOpen(!isInputOpen)} className={`flex cursor-pointer items-center justify-between duration-200 ${isInputOpen ? "pb-0" : "pb-2.5"}`}>
                <label className="dark:text-white font-bold text-blue">{placeholder}</label>
                <Arrow className={`${isInputOpen && "rotate-90"} duration-200`} />
            </div>
            <input onChange={onChange} defaultValue={defaultValue} type={type} className={`bg-transparent pl-[15px] outline-none ${isInputOpen ? "h-[44px]" : "h-0"} placeholder:text-gray dark:text-white text-blue duration-200`} placeholder={placeholder} />
        </div>
    )
}