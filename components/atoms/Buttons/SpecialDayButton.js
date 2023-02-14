import joinClasses from "../../../helpers/joinClasses";
import { CongeIcon } from "../Icons/CongeIcon";
import { CustomIcon } from "../Icons/CustomIcon";
import { EventIcon } from "../Icons/EventIcon";
import { MaladieIcon } from "../Icons/MaladieIcon";
import { RecupIcon } from "../Icons/Recupcon";
import { SansSoldeIcon } from "../Icons/SansSoldeIcon";
import { SchoolIcon } from "../Icons/SchoolIcon";
import { Paragraph } from "../Texts/Paragraph";

export function SpecialDayButton({ children, onClick = () => { }, className = "", day, notationSelected, specialSelected }) {

    const handleIcon = (specialDay) => {
        switch (specialDay.name) {
            case "Récup":
                return <RecupIcon />
            case "Congé":
                return <CongeIcon/>
            case "Maladie":
                return <MaladieIcon/>
            case "Sans solde":
                return <SansSoldeIcon/>
            case "École":
                return <SchoolIcon/>
            case "Évènement":
                return <EventIcon/>
            default:
                return <CustomIcon/>
        }
    }

    return (
        <button onClick={onClick} className="grid-span-1 flex flex-col cursor-pointer items-center gap-2.5">
            <div className={` ${day.id === notationSelected?.id ? "bg-blue-selected text-white" : "dark:bg-white bg-blue text-white dark:text-blue"} w-[65px] aspect-square rounded-full flex items-center justify-center`}>
                {handleIcon(day)}
            </div>
            <Paragraph className="font-bold text-center uppercase">{children}</Paragraph>
        </button>
    )
}