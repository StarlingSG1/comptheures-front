import { useUserContext } from "../../../../context";
import { useCalendarContext } from "../../../../context/calendar";
import { Arrow, OrbitronTitle, Paragraph, ReverseParagraph } from "../../../atoms";

export function CalendarMonths({changeMonth}) {

    const { getMonth, getPrevMonth, getNextMonth, currentDay } = useCalendarContext();

    return (
        <>
            <OrbitronTitle className="!text-center  md:mt-0 mt-5 md:mb-0 mb-5">{currentDay.getFullYear()}</OrbitronTitle>
            <div className="w-full h-10 flex items-center justify-between px-[5px] md:mt-5">
                <Arrow onClick={() => {
                    changeMonth("previous")
                }} className="rotate-180" />
                <div className="flex items-center justify-center gap-6 w-full ">
                    <Paragraph onClick={() => {
                        changeMonth("previous")
                    }} className={"!text-gray select-none cursor-pointer"}>{getPrevMonth()}</Paragraph>
                    <div className=" dark:bg-white bg-blue rounded">
                        <ReverseParagraph className={"px-4 z-10 select-none py-2 font-bold"}>{getMonth()}</ReverseParagraph>
                    </div>
                    <Paragraph onClick={() => {
                        changeMonth("next")
                    }} className={"!text-gray select-none cursor-pointer"}>{getNextMonth()}</Paragraph>
                </div>
                <Arrow onClick={() => {
                    changeMonth("next");
                }} />
            </div>
        </>
    )
}