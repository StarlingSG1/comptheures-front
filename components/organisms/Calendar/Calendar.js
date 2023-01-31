export function Calendar(props) {
    let firstDayOfMonth = new Date(props.day.getFullYear(), props.day.getMonth(), 1);
    let weekdayOfFirstDay = firstDayOfMonth.getDay();
    let currentDays = [];


    for (let day = 0; day < 42; day++) {
        if (day === 0 && weekdayOfFirstDay === 0) {
            firstDayOfMonth.setDate(firstDayOfMonth.getDate() - 7);
        } else if (day === 0) {
            firstDayOfMonth.setDate(firstDayOfMonth.getDate() + (day - weekdayOfFirstDay));
        } else {
            firstDayOfMonth.setDate(firstDayOfMonth.getDate() + 1);
        }

        let calendarDay = {
            currentMonth: (firstDayOfMonth.getMonth() === props.day.getMonth()),
            date: (new Date(firstDayOfMonth)),
            month: firstDayOfMonth.getMonth(),
            number: firstDayOfMonth.getDate(),
            selected: (firstDayOfMonth.toDateString() === props.day.toDateString()),
            year: firstDayOfMonth.getFullYear()
        }

        currentDays.push(calendarDay);
        if (calendarDay.date.getMonth() === props.day.getMonth() && calendarDay.number === 1) {

            if (calendarDay.date.getDay() === 0) {
                props.setCurrentNumber(7)
            } else {
                props.setCurrentNumber(calendarDay.date.getDay())

            }
        }

    }

    const dayHasTimes = (day) => {
        return props?.times?.filter(stat => stat.year === day.year && stat.month === day.month && stat.day === day.number).length > 0
    }

    return (
        <table className="w-full">
            <thead className="w-full grid grid-cols-7 my-[15px]">
                {
                    props.frenchDays.map((day, index) => (
                        <tr key={index} className="flex justify-center"><th className="dark:text-white text-blue font-normal md:hidden">{day.abrev}</th><th className="dark:text-white text-blue font-normal hidden md:block">{day.french}</th></tr>
                    ))}
            </thead>
            <tbody className="grid grid-cols-7 gap-y-2.5 w-full">
                {
                    currentDays.map((day, index) => (
                        day.currentMonth && <tr style={{ "gridColumnStart": `${day.number === 1 ? props?.currentNumber : "auto"}` }} key={index} className={`col-span-1 flex justify-center calendar-day w-auto` + (day.currentMonth ? " current" : "") + (day.selected ? " " : "")}
                            onClick={() => props.changeCurrentDay(day)}>
                            <td className={`relative ${day.selected && " dark:bg-white bg-blue rounded-full !text-white dark:!text-blue"} ${day.number > 9 ? "pt-0.5 pb-1.5 px-2" : "pt-0.5 pb-1.5 px-3"} cursor-pointer text-blue dark:text-white`} >{day.number}
                            {dayHasTimes(day) && <span className={`absolute bottom-[3px] w-1 h-1 ${day.selected ? "dark:bg-blue bg-white" : "dark:bg-white bg-blue"} left-1/2 -translate-x-1/2 rounded-full`}></span>}
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}