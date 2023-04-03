import { useUserContext } from "../../../context";
import { useCalendarContext } from "../../../context/calendar";
import { BorderedButton, Button, Paragraph, SpecialDayButton, SubTitle } from "../../atoms"

export function Notations({ notationSelected, initialNotation, validateLoading, setValidateLoading, customSelected, modalCheck, notationType, validateTimes, pickedNotation, setModal = () => { }, specialDays }) {

    const { getMonthByIndex, getDayByIndex, currentDay } = useCalendarContext();
    const { enterprise } = useUserContext();
    return (
        <>
            <SubTitle className={`text-center font-orbitron underline capitalize  ${customSelected ? "mt-10 mb-5" : "my-10"}`}>{getDayByIndex() + " " + currentDay.getDate() + " " + getMonthByIndex()}</SubTitle>
            <div className="w-full flex flex-col items-center gap-[30px] md:mb-0 mb-20">
                <Paragraph className="font-bold uppercase">
                    Choisir une notation
                </Paragraph>
                <Button className={notationSelected === "AUTO" && "!bg-blue-selected !text-white"} onClick={() => { pickedNotation("AUTO", { type: "AUTO" }) }}>Automatique{enterprise?.configEnterprise?.workHourADay && " - " + enterprise?.configEnterprise?.workHourADay}</Button>
                <BorderedButton className={customSelected && "!bg-blue-selected"} onClick={() => { pickedNotation("CUSTOM", []); }}>Personnalisé</BorderedButton>
                <Paragraph className="font-bold uppercase">
                    Ou
                </Paragraph>
                <div className="flex w-full justify-center ">
                    <div className="grid grid-cols-3 gap-x-[75px] gap-y-5">
                        {specialDays?.map((day, index) => (
                            <SpecialDayButton notationSelected={notationSelected} onClick={() => pickedNotation("SPECIAL", day)} key={index} day={day} >{day.name}</SpecialDayButton>
                        ))}
                    </div>
                </div>
                {initialNotation?.name !== notationSelected?.name ?
                    <Button className="flex items-center justify-center gap-5" onClick={() => modalCheck ? validateTimes(notationSelected, notationType) : setModal(true)}>{validateLoading ? <><div className="flex items-center justify-center h-full"><div className="small-loader"></div></div>Chargement... </> : "Enregistrer"}</Button> :
                    (initialNotation === "AUTO" && notationSelected !== "AUTO") ?
                        <Button className="flex items-center justify-center gap-5" onClick={() => modalCheck ? validateTimes(notationSelected, notationType) : setModal(true)}>{validateLoading ? <><div className="flex items-center justify-center h-full"><div className="small-loader"></div></div>Chargement... </> : "Enregistrer"}</Button> :
                    (initialNotation?.length !== notationSelected?.length) &&
                        <Button className="flex items-center justify-center gap-5" onClick={() => { console.log("click", modalCheck), modalCheck ? validateTimes(notationSelected, notationType) : setModal(true) }}>{validateLoading ? <><div className="flex items-center justify-center h-full"><div className="small-loader"></div></div>Chargement... </> : "Enregistrer"}</Button>}
            </div>
        </>
    )
}