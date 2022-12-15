import joinClasses from "../../../helpers/joinClasses";
import { Card, Paragraph, RealArrow } from "../../atoms";
import { TimeInput } from "../../molecules/TimeInput/TimeInput";

export function TimeBlock({ className, debut, edit, fin, children, onClick }) {
    return (
        <div className={joinClasses(className, `flex flex-col w-full items-center gap-[15px]`)}>
            <Paragraph className={"font-bold "}>{children}</Paragraph>
            <Card  edit={edit} className="">
                <TimeInput edit={edit}>{debut}</TimeInput>
                <div className={`h-full flex-col py-[5px] flex ${edit ? "justify-between" : "justify-center"} items-center`}>
                    {edit && <span className="w-[2px] rounded-full bg-white dark:bg-blue h-full ">
                    </span>}
                    <RealArrow edit={edit} className="min-w-[22px] min-h-[22px]" card={true} />
                    {edit && <span className="w-[2px] rounded-full bg-white dark:bg-blue h-full ">
                    </span>}
                </div>
                <TimeInput edit={edit} end={true}>{fin}</TimeInput>
            </Card>
        </div>
    )
}