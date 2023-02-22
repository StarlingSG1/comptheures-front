import { useEffect, useState } from "react";
import { getDefaultSpecialDays } from "../../../../api/enterprise/enterprise";
import { useUserContext } from "../../../../context";
import joinClasses from "../../../../helpers/joinClasses";
import SPECIAL_DAYS from "../../../../utils/specialsDaysList";
import { Button, CongeIcon, CreateCustomIcon, CustomIcon, EventIcon, Input, MaladieIcon, Paragraph, RecupIcon, SansSoldeIcon, SchoolIcon, SubTitle } from "../../../atoms";
import { BackTitle } from "../../../molecules";

export function SpecialDaysStep({ show = false, config = false,showCreateDay, setShowCreateDay, selectedSpecialDays = [], onSelectSpecialDay = () => { }, createTheSpecialDays = () => { } }) {

    const { enterprise } = useUserContext()

    const [defaultDays, setDefaultDays] = useState([])

    const [customDay, setCustomDay] = useState({
        name: "",
        paid: "",
        work: "",
    })

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
                return <CongeIcon />
            case "Maladie":
                return <MaladieIcon />
            case "Sans solde":
                return <SansSoldeIcon />
            case "École":
                return <SchoolIcon />
            case "Évènement":
                return <EventIcon />
            case "Personnalisé":
                return <CustomIcon />
            default:
                return <CreateCustomIcon />
        }
    }

    useEffect(() => {
        getSpecial()
    }, [enterprise])

    return (
        <div className={joinClasses("animate__animated animate__slideInRight", show ? "block" : "hidden")}>
            {!showCreateDay ? <><SubTitle className="text-center">Choisir les jours spéciaux qui seront sélectionnable</SubTitle>
                <ul className="grid mt-[30px] grid-cols-4 gap-5">
                    {defaultDays?.map((specialDay, index) => (
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
                    {!config && <li
                        className="flex flex-col items-center gap-2 cursor-pointer active:opacity-50"
                        onClick={() => setShowCreateDay(true)}
                    >
                        <div className={joinClasses(
                            "h-[65px] w-[65px]  rounded-full flex justify-center items-center shadow-lg transition-all duration-300 ease-in-out bg-blue dark:bg-white dark:text-blue text-white"
                        )}>
                            {handleIcon({ name: "Personnalisé" })}
                        </div>
                        <p className={`uppercase dark:text-white`}>Personnalisé</p>
                    </li>}
                </ul> 
                {config && <Paragraph className="text-center mt-[30px]">Vous pourrez créer des jours spéciaux personnalisés dans le menu entreprise une fois la configuration terminé. </Paragraph>}</> :
                <div className="">
                    <BackTitle className="!mb-[30px]" state={true} onClick={() => setShowCreateDay(false)}>Créer un jour spécial</BackTitle>
                    <Input placeholder="Nom du jour spécial" onChange={(e) => setCustomDay({ ...customDay, name: e.target.value })} />
                    <div className="flex gap-6 items-center mt-3 mb-5 dark:text-white">
                        <label className="flex gap-1 item-center" htmlFor="user">
                            <input type="radio" className="mr-2" name="paid" id="paid"
                                onChange={(e) => setCustomDay({ ...customDay, paid: true })}
                            />
                            Payé
                        </label>

                        <label className="flex gap-1 item-center" htmlFor="superAdmin">
                            <input type="radio" className="mr-2" name="paid" id="notPaid"
                                onChange={(e) => setCustomDay({ ...customDay, paid: false })}
                            />
                            Non payé
                            <div className="m-auto relative group ml-1">
                                <div className="h-[19px] w-[19px] border flex justify-center items-center border-blue text-blue text-sm rounded-full cursor-pointer dark:bg-white">?</div>
                                <div className="absolute w-[250px] group-hover:block hidden bg-white px-2 py-2 rounded-md shadow-lg text-sm text-blue right-0 top-6 animate__animated animate__fadeIn">
                                    Choisir si la journée est payée ou non.
                                </div>
                            </div>
                        </label>
                    </div>
                    <div className="flex gap-6 items-center mt-3 mb-16 dark:text-white">
                        <label className="flex gap-1 item-center" htmlFor="user">
                            <input type="radio" className="mr-2" name="work" id="work"
                                onChange={(e) => setCustomDay({ ...customDay, work: true })}
                            />
                            Travaillé
                        </label>

                        <label className="flex gap-1 item-center" htmlFor="notWork">
                            <input type="radio" className="mr-2" name="work" id="superAdmin"
                                onChange={(e) => setCustomDay({ ...customDay, work: false })}
                            />
                            Non travaillé
                            <div className="m-auto relative group ml-1">
                                <div className="h-[19px] w-[19px] border flex justify-center items-center border-blue text-blue text-sm rounded-full cursor-pointer dark:bg-white">?</div>
                                <div className="absolute w-[250px] group-hover:block hidden bg-white px-2 py-2 rounded-md shadow-lg text-sm text-blue right-0 top-6 animate__animated animate__fadeIn">
                                    Choisir si la journée est travaillé ou non.
                                </div>
                            </div>
                        </label>
                    </div>
                    <Button onClick={() => { createTheSpecialDays(customDay) }}>créer rôle</Button>
                </div>}
        </div>
    )
}