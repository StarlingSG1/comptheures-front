import joinClasses from "../../../helpers/joinClasses";
import { Paragraph, ReverseParagraph } from "../../atoms";

export function TimeInput({ children, edit, onClick, className, end = false }) {
    return (
        <div className={joinClasses(className, `flex flex-col items-center`)}>
            {edit ? <><ReverseParagraph>{end ? "Fin" : "Début"}</ReverseParagraph>
            <ReverseParagraph className={"font-bold"}>{children}</ReverseParagraph></> : <><Paragraph>{end ? "Fin" : "Début"}</Paragraph>
            <Paragraph className={"font-bold"}>{children}</Paragraph></>}
        </div>
    )
}