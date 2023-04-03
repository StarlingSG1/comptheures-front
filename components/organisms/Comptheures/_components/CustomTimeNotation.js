import { useState } from "react";
import { useCalendarContext } from "../../../../context/calendar";
import { Button, Card, CoffeeIcon, Paragraph, Plus, RealArrow, SubTitle, WorkIcon } from "../../../atoms"
import { TimeInput } from "../../../molecules"

export function CustomTimeNotation({ customSelected, setCustomSelected, validateLoading, setValidateLoading, edit, changeClockType, displayAddOneTimeButton, validateTimes, notationType }) {

    const { getMonthByIndex, getDayByIndex, currentDay, currentCustomTimes, setCurrentCustomTimes } = useCalendarContext();

    const [deleteIcon, setDeleteIcon] = useState(false)

    // add a new empty custom time if previous are filled
    const addTime = () => {
        const newClock = [...currentCustomTimes]
        newClock.push({
            name: "Travail supplémentaire",
            order: currentCustomTimes?.length + 1,
            type: "WORK",
            start: "",
            end: "",
        })
        setCurrentCustomTimes(newClock)
    }

    const handleDelete = (index) => {
        const newClock = [...currentCustomTimes]
        newClock.splice(index, 1)
        newClock.map((clock, idx) => {
            (clock.order > index) && (clock.order = clock.order + 1)
        }
        )
        setCurrentCustomTimes(newClock)
    }



    return (
        <>
            <SubTitle className={`text-center font-orbitron underline capitalize  ${customSelected ? "mt-10 mb-5" : "my-10"}`}>{getDayByIndex() + " " + currentDay.getDate() + " " + getMonthByIndex()}</SubTitle>
            <div onClick={() => { setCustomSelected(false) }} className="flex items-center gap-1.5 mb-5 cursor-pointer">
                <RealArrow className="min-w-[30px] rotate-180 min-h-[30px]" card={true} />
                <Paragraph className="uppercase font-bold">Retour</Paragraph>
            </div>
            <div className="flex flex-col w-full items-center gap-10">
                {currentCustomTimes?.sort((a, b) => a.order > b.order ? 1 : -1).map((time, index) => (
                    ((!edit && time?.start?.length > 0) || edit) && <div key={index} className={`flex flex-col w-full items-center gap-[15px]`}>
                        <div className="flex w-full items-center justify-center gap-2.5">
                            {time.type === "WORK" ? <WorkIcon className={edit && "cursor-pointer"} onClick={() => edit && changeClockType(index, time.type)} /> : time.type === "BREAK" ? <CoffeeIcon className={edit && "cursor-pointer"} onClick={() => edit && changeClockType(index, time.type)} /> : <WorkIcon onClick={() => changeClockType(key, time.type)} />}
                            {edit ? <input id="txt" type="text" defaultValue={time.name} className="bg-transparent font-bold outline-none text-center text-blue dark:text-white w-[55px]" onChange={(e) =>
                                setCurrentCustomTimes(currentCustomTimes.map((time, i) =>
                                    i === index ? { ...time, name: e.target.value } : time
                                ))}
                                style={{ width: ((time.name.length + 3) * 8) + 'px' }}
                            /> : <Paragraph className={"font-bold"}>{time.name}</Paragraph>
                            }
                        </div>
                        <Card onMouseEnter={() => setDeleteIcon(index)} onMouseLeave={() => setDeleteIcon(false)} edit={edit}>
                            {deleteIcon === index && edit &&
                                <button onClick={() => handleDelete(index)} className="absolute top-0 translate-x-1/4 -translate-y-1/2  rounded-md right-0 w-6 bg-white shadow-sm h-6">
                                    X
                                </button>}
                            <TimeInput index={index} defaultValue={time.start} edit={edit}>{time.start}</TimeInput>
                            <div className={`h-full flex-col py-[5px] flex ${edit ? "justify-between" : "justify-center"} items-center`}>
                                {edit && <span className="w-[2px] rounded-full bg-white dark:bg-blue h-full ">
                                </span>}
                                <RealArrow edit={edit} className="min-w-[22px] min-h-[22px]" card={true} />
                                {edit && <span className="w-[2px] rounded-full bg-white dark:bg-blue h-full ">
                                </span>}
                            </div>
                            <TimeInput index={index} defaultValue={time.end} edit={edit} end={true}>{time.end}</TimeInput>
                        </Card>
                    </div>
                ))}
                {edit && displayAddOneTimeButton() && <div onClick={addTime} className="dark:bg-white bg-blue cursor-pointer rounded-full flex justify-center items-center w-10 h-10"><Plus /></div>}
                <Button className="md:mb-0 mb-10 flex justify-center items-center gap-5" onClick={() => { validateTimes(currentCustomTimes, notationType) }}> {validateLoading ?  <><div className="flex items-center justify-center h-full"><div className="small-loader"></div></div>Chargement... </>: edit ? "Enregistrer" : "Modifier"}</Button>
            </div>
        </>
    )
}