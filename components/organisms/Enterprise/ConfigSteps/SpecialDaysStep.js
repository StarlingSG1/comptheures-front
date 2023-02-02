import joinClasses from "../../../../helpers/joinClasses";
import SPECIAL_DAYS from "../../../../utils/specialsDaysList";

export function SpecialDaysStep({ show = false, selectedSpecialDays = [], onSelectSpecialDay = () => { } }) {
    return (
        <div className={joinClasses("", show ? "block" : "hidden")}>
            <ul className="flex flex-wrap gap-10 justify-center">
                {SPECIAL_DAYS.map((specialDay, index) => (
                    <li
                        key={index}
                        className="flex flex-col items-center gap-2 cursor-pointer active:opacity-50"
                        onClick={() => onSelectSpecialDay(specialDay)}
                    >
                        <div className={joinClasses(
                            "h-[65px] w-[65px]  rounded-full flex justify-center items-center shadow-lg transition-all duration-300 ease-in-out",
                            selectedSpecialDays.includes(specialDay) ? "dark:bg-blue-selected text-white" : "bg-blue dark:bg-white text-blue"
                        )}>
                            {specialDay.icon}
                        </div>
                        <p className="uppercase dark:text-white">{specialDay.name}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}