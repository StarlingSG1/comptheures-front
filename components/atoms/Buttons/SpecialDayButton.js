import joinClasses from "../../../helpers/joinClasses";
import { Paragraph } from "../Texts/Paragraph";

export function SpecialDayButton({ children, onClick = () => { }, className = "", day, notationSelected, specialSelected }) {
    return (
        <div onClick={onClick} className="grid-span-1 flex flex-col cursor-pointer items-center gap-2.5">
            <div className={` ${day.id === notationSelected?.id ? "bg-blue-selected" : "dark:bg-white bg-blue"} w-[65px] aspect-square rounded-full flex items-center justify-center`}><div className={`aspect-square w-5 ${day.id=== notationSelected?.id ? "bg-white" : "dark:bg-blue bg-white"}`}></div></div>
            <Paragraph className="font-bold text-center uppercase">{children}</Paragraph>
        </div>
    )
}