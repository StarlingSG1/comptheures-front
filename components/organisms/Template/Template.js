import { useEffect, useState } from "react";
import { useCalendarContext } from "../../../context/calendar";
import joinClasses from "../../../helpers/joinClasses";
import { BigDesktopCard, CrossIcon, Paragraph, SmallDesktopCard, Title } from "../../atoms";
import { Footer } from "../../molecules";
import { MobileBurger } from "../Burger/MobileBurger";

export function Template({ children, comptheures = false, className = "" }) {

    const { currentCustomTimes, clocks, currentDay } = useCalendarContext()

    const [workTotal, setWorkTotal] = useState(null)
    const [breakTotal, setBreakTotal] = useState(null)
    const [canUpdate, setCanUpdate] = useState(false)

    const getClocksTotal = () => {
        if (currentCustomTimes[0].stats) {
            setWorkTotal(currentCustomTimes[0].stats[0].work)
            setBreakTotal(currentCustomTimes[0].stats[0].break)
        } else {
            setWorkTotal(null)
            setBreakTotal(null)
        }
        setCanUpdate(false)
    }

    useEffect(() => {
        if (canUpdate) {
            getClocksTotal()
        }
    }, [currentCustomTimes, clocks, currentDay])


    useEffect(() => {
        setCanUpdate(true)
    }, [clocks, currentDay])


    
    return (
        <div>
            <div className="md:hidden">
                <CrossIcon />
                <MobileBurger />
                <div className={joinClasses(className,`md:hidden w-screen py-10 flex flex-col justify-between px-[5%] min-h-screen dark:bg-blue md:dark:bg-blue-dark md:bg-blue bg-white`)}>
                    {children}
                    <Footer />
                </div>
            </div>

            <div className="hidden py-[150px] md:flex dark:bg-blue-dark bg-blue w-screen justify-center items-center min-h-screen">
                <div className="w-full max-w-[1030px] grid grid-cols-12 gap-[50px] items-start gap-[50px]">
                    <BigDesktopCard>
                        {children}
                    </BigDesktopCard>

                    {comptheures && (workTotal || breakTotal) ?
                        <div className="col-span-4 flex gap-10 flex-col">
                            <SmallDesktopCard />
                            <div className="shadow dark:bg-blue bg-white rounded-2xl py-5 px-[15px] flex flex-col items-center gap-[15px]" >
                                {workTotal && workTotal !== "0h00" && <div className="flex flex-col items-center">
                                    <Title>{workTotal}</Title>
                                    <Paragraph>de travail</Paragraph>
                                </div>}
                                {breakTotal && breakTotal !== "0h00" && <div className="flex flex-col items-center">
                                    <Title>{breakTotal}</Title>
                                    <Paragraph>de pause</Paragraph>
                                </div>}
                            </div>
                        </div>
                        : <SmallDesktopCard />}
                </div>
            </div>
        </div>
    )
}