import joinClasses from "../../../../helpers/joinClasses";
import { Button, Paragraph, SubTitle } from "../../../atoms";

export function MonthStep({ show = false, onSelectedMonths = () => { }, months = { start: 0, end: 0 } }) {
    return (
        <div className={joinClasses("flex flex-col gap-[30px] animate__animated animate__fadeIn", show ? "block" : "hidden")}>
            <SubTitle>Donner la date de début et de fin d'un mois</SubTitle>
            <div className="flex items-center gap-2 dark:text-white">
                <p>Les mois <strong>commence</strong> le :</p>
                <input
                    type="number"
                    min="1" max="31"
                    value={months.start}
                    onChange={(e) => onSelectedMonths(e.target.value, months.end)}
                    className="bg-blue w-[133px] py-1.5 px-4 rounded-md text-white dark:bg-white dark:text-black"
                />
            </div>
            <div className="flex items-center gap-2 dark:text-white">
                <p>Les mois <strong>se termine</strong> le :</p>
                <input
                    type="number"
                    min="1" max="31"
                    value={months.end}
                    onChange={(e) => onSelectedMonths(months.start, e.target.value)}
                    className="bg-blue w-[133px] py-1.5 px-4 rounded-md text-white dark:bg-white dark:text-black"
                />
            </div>

            <p className="dark:text-white">Les données pour un mois seront calculés du <strong>{months.start}</strong> au <strong>{months.end}</strong>.</p>

        </div>
    )
}