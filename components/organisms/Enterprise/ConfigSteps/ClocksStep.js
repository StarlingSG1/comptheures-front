import joinClasses from "../../../../helpers/joinClasses";
import { HourInput, SubTitle } from "../../../atoms";
import { TimeInput } from "../../../molecules";

export function ClocksStep({ show = false, onSelectTime,selectedTime }) {
    return (
        <div className={joinClasses("flex flex-col  animate__animated animate__slideInRight mt-[30px] mb-[135px]", show ? "block" : "hidden")}>
            <SubTitle>Donner la durée d’une journée de travail classique</SubTitle>
            <div className="flex items-center gap-4 mt-[30px]">
            <p className="flex gap-3 items-center  dark:text-white">
                Une journée de travail classique dure :
            </p>
                <div className="bg-blue dark:bg-white rounded-md py-1.5 px-4">
                    <input type="time" id="session-date" name="session-date" defaultValue={selectedTime} onChange={(e) => {onSelectTime(e.target.value)}} className="inline-block outline-none relative h-6 w-[55px] text-center bg-blue dark:bg-white text-white dark:text-blue" />
                </div>
            </div>
        </div>
    )
}