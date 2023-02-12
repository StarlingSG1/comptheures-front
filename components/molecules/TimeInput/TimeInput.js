import { useCalendarContext } from "../../../context/calendar";
import joinClasses from "../../../helpers/joinClasses";
import { HourInput, Paragraph, ReverseParagraph } from "../../atoms";

export function TimeInput({ children, edit, onClick, className, end = false, placeholder, defaultValue = "", index }) {
    
    const {currentCustomTimes, setCurrentCustomTimes } = useCalendarContext();

    return (
        <div className={joinClasses(className, `flex flex-col items-center`)}>
            {edit ? <><ReverseParagraph>{end ? "Fin" : "Début"}</ReverseParagraph>
                <HourInput onChange={(e) => {
                    end ?
                    (currentCustomTimes[index].end = e.target.value,
                    setCurrentCustomTimes([...currentCustomTimes])) : (currentCustomTimes[index].start = e.target.value,
                        setCurrentCustomTimes([...currentCustomTimes]))
                }}
                    defaultValue={defaultValue} placeholder={placeholder} /></> : <><Paragraph>{end ? "Fin" : "Début"}</Paragraph>
                <Paragraph className={"font-bold"}>{children}</Paragraph></>}
        </div>
    )
}