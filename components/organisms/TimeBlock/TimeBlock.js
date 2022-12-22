import joinClasses from "../../../helpers/joinClasses";
import { CoffeeIcon } from "../../atoms";
import { WorkIcon } from "../../atoms";
import { Card, Paragraph, RealArrow } from "../../atoms";
import { TimeInput } from "../../molecules/TimeInput/TimeInput";

export function TimeBlock({ className, debut, edit, fin, changeClockType, children, onClick, clock, index }) {

    return (
        <div className={joinClasses(className, `flex flex-col w-full items-center gap-[15px]`)}>
            <div className="flex w-full items-center justify-center gap-2.5">
            {clock.type === "WORK" ? <WorkIcon onClick={() => changeClockType(index, clock.type)}/> : clock.type === "BREAK" ? <CoffeeIcon onClick={() => changeClockType(index, clock.type)} /> : <WorkIcon onClick={() => changeClockType(key, clock.type)} />}
            <Paragraph className={"font-bold"}>{children}</Paragraph>
            </div>
            <Card  edit={edit} className="">
                <TimeInput defaultValue={debut} edit={edit}>{debut}</TimeInput>
                <div className={`h-full flex-col py-[5px] flex ${edit ? "justify-between" : "justify-center"} items-center`}>
                    {edit && <span className="w-[2px] rounded-full bg-white dark:bg-blue h-full ">
                    </span>}
                    <RealArrow edit={edit} className="min-w-[22px] min-h-[22px]" card={true} />
                    {edit && <span className="w-[2px] rounded-full bg-white dark:bg-blue h-full ">
                    </span>}
                </div>
                <TimeInput defaultValue={fin} edit={edit} end={true}>{fin}</TimeInput>
            </Card>
        </div>
    )
}