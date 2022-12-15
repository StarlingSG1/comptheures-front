import joinClasses from "../../../helpers/joinClasses";

export function BigDesktopCard({children, className = ""}){
    return <div className={joinClasses(className,`col-span-8 min-h-[520px] h-full shadow dark:bg-blue bg-white py-10 px-[30px] rounded-2xl`)}>
        {children}
    </div>
}