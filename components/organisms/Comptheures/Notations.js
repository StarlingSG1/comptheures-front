import { useCalendarContext } from "../../../context/calendar";
import { BorderedButton, Button, Paragraph, SpecialDayButton, SubTitle } from "../../atoms"

export function Notations({pickAutoNotation, pickCustomNotation, notationSelected, initialNotation, autoSelected, customSelected, modalCheck, specialSelected, notationType, validateClocks,  pickedNotation, setModal = () => {}, specialDays, pickSpecialNotation}) {

    const { getMonthByIndex, getDayByIndex, currentDay } = useCalendarContext();


    return (
        <>
            <SubTitle className={`text-center font-orbitron underline capitalize  ${customSelected ? "mt-10 mb-5" : "my-10"}`}>{getDayByIndex() + " " + currentDay.getDate() + " " + getMonthByIndex()}</SubTitle>
            <div className="w-full flex flex-col items-center gap-[30px] md:mb-0 mb-20">
                <Paragraph className="font-bold uppercase">
                    Choisir une notation
                </Paragraph>
                <Button className={ notationSelected === "AUTO" && "!bg-blue-selected !text-white"} onClick={() => { pickedNotation("AUTO", {type: "AUTO"}) }}>Automatique</Button>
                <BorderedButton className={customSelected && "!bg-blue-selected"} onClick={() => { pickedNotation("CUSTOM", []); }}>Personnalisé</BorderedButton>
                <Paragraph className="font-bold uppercase">
                    Ou
                </Paragraph>
                <div className="flex w-full justify-center ">
                    <div className="grid grid-cols-3 gap-[75px]">
                        {specialDays.map((day, index) => (
                            <SpecialDayButton notationSelected={notationSelected} onClick={() => pickedNotation("SPECIAL", day)} key={index} day={day} >{day.name}</SpecialDayButton>
                        ))}
                    </div>
                </div>
                {(initialNotation !== notationSelected || initialNotation?.name !== notationSelected?.name)  &&  <Button onClick={() => modalCheck ? validateClocks(notationSelected, notationType) :  setModal(true)}>Enregistrer</Button>}
            </div>
        </>
    )
}