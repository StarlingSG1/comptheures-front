import joinClasses from "../../../helpers/joinClasses"
import { SystemIcon } from "../../atoms"
import { MoonIcon } from "../../atoms/Icons/MoonIcon"
import { SunIcon } from "../../atoms/Icons/SunIcon"

export function ThemePicker({item, setTheTheme, className = ""}) {
    return (
            <div className={joinClasses(className,`flex items-center gap-2.5`)}>
                <select value={item} name="theme" id="theme-select" className="border-0  bg-transparent font-orbitron outline-none md:text-white dark:text-white text-blue" onChange={(e) => setTheTheme(e.target.value)}>
                    <option value="dark:bg-white dark:text-blue hover:dark:bg-blue bg-blue text-white hover:dark:text-white hover:bg-white hover:text-blue system"  >Thème système</option>
                    <option value="dark:bg-white dark:text-blue hover:dark:bg-blue bg-blue text-white hover:dark:text-white hover:bg-white hover:text-blue dark" >Thème sombre </option>
                    <option value="dark:bg-white dark:text-blue hover:dark:bg-blue bg-blue text-white hover:dark:text-white hover:bg-white hover:text-blue light" >Thème claire</option>
                </select>
                {item === "light" ? <SunIcon /> : item === "dark" ? <MoonIcon /> : item === "system" && <SystemIcon />}
            </div>
            
       
    )
}