import { useEffect, useState } from "react";
import { getDefaultSpecialDays } from "../../../../api/enterprise/enterprise";
import { useUserContext } from "../../../../context";
import joinClasses from "../../../../helpers/joinClasses";
import SPECIAL_DAYS from "../../../../utils/specialsDaysList";
import { CongeIcon, CustomIcon, EventIcon, MaladieIcon, RecupIcon, SansSoldeIcon, SchoolIcon, SubTitle } from "../../../atoms";

export function SpecialDaysStep({ show = false, selectedSpecialDays = [], onSelectSpecialDay = () => { } }) {

    const { enterprise } = useUserContext()

    const [defaultDays, setDefaultDays] = useState([])

    const getSpecial = async () => {
        const response = await getDefaultSpecialDays()
        if (response.error === false) {
            setDefaultDays(response.data)
        }
    }

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

    useEffect(() => {
        getSpecial()
    }, [enterprise])

    return (
        <div className={joinClasses("animate__animated animate__slideInRight", show ? "block" : "hidden")}>
            <SubTitle className="text-center">Choisir les jours spéciaux qui seront sélectionnable</SubTitle>
            <ul className="grid mt-[30px] grid-cols-4 gap-5">
                {defaultDays.map((specialDay, index) => (
                    <li
                        key={index}
                        className="flex flex-col items-center gap-2 cursor-pointer active:opacity-50"
                        onClick={() => onSelectSpecialDay(specialDay)}
                    >
                        <div className={joinClasses(
                            "h-[65px] w-[65px]  rounded-full flex justify-center items-center shadow-lg transition-all duration-300 ease-in-out",
                            selectedSpecialDays?.filter(item => item.name === specialDay.name).length > 0 ? "bg-blue-selected text-white" : "bg-blue dark:bg-white dark:text-blue text-white"
                        )}>
                            {handleIcon(specialDay)}
                        </div>
                        <p className={`uppercase dark:text-white`}>{specialDay.name}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}