import joinClasses from "../../../helpers/joinClasses"
import { SystemIcon } from "../../atoms"
import { MoonIcon } from "../../atoms/Icons/MoonIcon"
import { SunIcon } from "../../atoms/Icons/SunIcon"

export function ThemePicker({item, setTheTheme, className = ""}) {
    return (
            <div className={joinClasses(className,`flex items-center gap-2.5`)}>
                <select value={item} name="theme" id="theme-select" className="bg-transparent font-orbitron outline-none md:text-white dark:text-white text-blue" onChange={(e) => setTheTheme(e.target.value)}>
                    <option value="system"  >Thème système</option>
                    <option value="dark" >Thème sombre </option>
                    <option value="light" >Thème claire</option>
                </select>
                {item === "light" ? <SunIcon /> : item === "dark" ? <MoonIcon /> : item === "system" && <SystemIcon />}
            </div>
            
       
    )
}