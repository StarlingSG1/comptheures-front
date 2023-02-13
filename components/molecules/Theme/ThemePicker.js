import joinClasses from "../../../helpers/joinClasses"
import { SystemIcon } from "../../atoms"
import { MoonIcon } from "../../atoms/Icons/MoonIcon"
import { SunIcon } from "../../atoms/Icons/SunIcon"

export function ThemePicker({ item, setTheTheme, className = "" }) {
    return (
        <div className={joinClasses(className, `flex items-center gap-2.5`)}>
            <select value={item} name="theme" id="theme-select" className="border-0  bg-transparent font-orbitron outline-none md:text-white dark:text-white text-blue" onChange={(e) => setTheTheme(e.target.value)}>
                <option className="dark:bg-white dark:text-blue hover:dark:bg-blue bg-blue text-white hover:dark:text-white hover:bg-white hover:text-blue" value="system"  >Thème système</option>
                <option className="dark:bg-white dark:text-blue hover:dark:bg-blue bg-blue text-white hover:dark:text-white hover:bg-white hover:text-blue" value="dark" >Thème sombre </option>
                <option className="dark:bg-white dark:text-blue hover:dark:bg-blue bg-blue text-white hover:dark:text-white hover:bg-white hover:text-blue" value="light" >Thème claire</option>
            </select>
            {item === "light" ? <SunIcon /> : item === "dark" ? <MoonIcon /> : item === "system" && <SystemIcon />}
        </div>
    )
}