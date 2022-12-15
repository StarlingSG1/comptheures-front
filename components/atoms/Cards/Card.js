import joinClasses from "../../../helpers/joinClasses";

export function Card({children, className = "", edit}){
    return <div className={joinClasses(className,`md:w-[73%] w-full h-[69px] flex items-center justify-evenly  ${edit ? "dark:bg-white bg-blue shadow" : "bg-transparent shadow-none"}  rounded-lg`)}>
        {children}
    </div>
}