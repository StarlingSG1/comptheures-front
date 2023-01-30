import Head from "next/head";
import { useEffect, useState } from "react";
import { useCalendarContext } from "../../../context/calendar";
import joinClasses from "../../../helpers/joinClasses";
import { BigDesktopCard, CrossIcon, Paragraph, SmallDesktopCard, Title } from "../../atoms";
import { Footer } from "../../molecules";
import { MobileBurger } from "../Burger/MobileBurger";

export function NewTemplate({ children, comptheures = false, className = "" }) {

    const { currentCustomTimes, clocks, currentDay, workTotal, setWorkTotal, breakTotal, setBreakTotal, user } = useCalendarContext()


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
        <>
            
            <div className="md:py-[150px] md:flex md:dark:bg-blue-dark md:bg-blue md:w-screen md:justify-center md:items-center md:min-h-screen">
                <div className="md:w-full md:max-w-[1030px] md:grid md:grid-cols-12 md:gap-[50px] md:items-start md:gap-[50px]">
                    <CrossIcon />
                    <MobileBurger className="md:hidden" />
                    <div className={`w-screen py-10 flex flex-col justify-between px-[5%] min-h-screen dark:bg-blue bg-white relative   md:w-auto md:block md:col-span-8 md:min-h-[520px] md:h-full md:shadow md:px-[30px] md:rounded-2xl`}>
                        {children}
                        <Footer className="md:hidden" />
                    </div>

                    {comptheures && (workTotal || breakTotal) ?
                        <div className="hidden col-span-4 md:flex gap-10 flex-col">
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
        </>
    )
}