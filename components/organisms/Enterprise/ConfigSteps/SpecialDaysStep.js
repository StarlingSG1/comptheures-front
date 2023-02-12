import joinClasses from "../../../../helpers/joinClasses";
import SPECIAL_DAYS from "../../../../utils/specialsDaysList";

export function SpecialDaysStep({ show = false, selectedSpecialDays = [], onSelectSpecialDay = () => { } }) {
    return (
        <div className={joinClasses("animate__animated animate__slideInRight", show ? "block" : "hidden")}>
            <ul className="grid grid-cols-4 gap-5">
                {SPECIAL_DAYS.map((specialDay, index) => (
                    <li
                        key={index}
                        className="flex flex-col items-center gap-2 cursor-pointer active:opacity-50"
                        onClick={() => onSelectSpecialDay(specialDay.name)}
                    >
                        <div className={joinClasses(
                            "h-[65px] w-[65px]  rounded-full flex justify-center items-center shadow-lg transition-all duration-300 ease-in-out",
                            selectedSpecialDays.includes(specialDay.name) ? "bg-blue-selected text-white" : "bg-blue dark:bg-white dark:text-blue text-white"
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