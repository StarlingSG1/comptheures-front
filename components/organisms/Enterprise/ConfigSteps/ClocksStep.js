import joinClasses from "../../../../helpers/joinClasses";
import { SubTitle } from "../../../atoms";

export function ClocksStep({ show = false, selectedClocks = { hour: 0, minute: 0 }, onSelectClocks = () => { } }) {
    return (
        <div className={joinClasses("flex flex-col gap-5 animate__animated animate__slideInRight mt-10 mb-20", show ? "block" : "hidden")}>
            <SubTitle>Donner la durée d’une journée de travail classique</SubTitle>
            <p className="flex gap-3 items-center mt-10 dark:text-white">
                Une journée de travail classique dure :
                <input
                    type="number"
                    min="0" max="23"
                    className="bg-blue w-[75px] py-1 px-5 rounded-md text-white dark:bg-white dark:text-black"
                    value={selectedClocks.hour}
                    onChange={(e) => onSelectClocks(e.target.value, selectedClocks.minute)}
                />
                H
                <input
                    type="number"
                    min="0" max="59"
                    className="bg-blue w-[75px] py-1 px-5 rounded-md text-white dark:bg-white dark:text-black"
                    value={selectedClocks.minute}
                    onChange={(e) => onSelectClocks(selectedClocks.hour, e.target.value)}
                />
            </p>
        </div>
    )
}