import joinClasses from "../../../helpers/joinClasses";
import { HourInput, Paragraph, ReverseParagraph } from "../../atoms";

export function TimeInput({ children, edit, onClick, className, end = false, placeholder }) {
    return (
        <div className={joinClasses(className, `flex flex-col items-center`)}>
            {edit ? <><ReverseParagraph>{end ? "Fin" : "Début"}</ReverseParagraph>
                <HourInput placeholder={placeholder} /></> : <><Paragraph>{end ? "Fin" : "Début"}</Paragraph>
                <Paragraph className={"font-bold"}>{children}</Paragraph></>}
        </div>
    )
}