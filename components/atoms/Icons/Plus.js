import joinClasses from "../../../helpers/joinClasses";

export function Plus({ className = "", width = "32", height = "32", onClick = () => {}}) {
    return <svg className={joinClasses(className,`fill-white dark:fill-blue`)} width={width} height={height} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
    <path d="M25.3332 17.3307H17.3332V25.3307H14.6665V17.3307H6.6665V14.6641H14.6665V6.66406H17.3332V14.6641H25.3332V17.3307Z"/>
    </svg>
    
}



