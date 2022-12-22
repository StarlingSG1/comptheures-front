
import joinClasses from "../../../helpers/joinClasses";

export function CoffeeIcon({ className = "", onClick }) {
    return <svg width="22" height="22" onClick={onClick} className={joinClasses(className,`dark:fill-blue fill-white dark:stroke-white stroke-blue`)} viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg">
        <path d="M15.5833 7.33332H16.5C17.4725 7.33332 18.4051 7.71962 19.0927 8.40726C19.7804 9.09489 20.1667 10.0275 20.1667 11C20.1667 11.9724 19.7804 12.9051 19.0927 13.5927C18.4051 14.2803 17.4725 14.6667 16.5 14.6667H15.5833M5.5 1.83331V3.66665M9.16667 1.83331V3.66665M12.8333 1.83331V3.66665M2.75 7.33332H15.5833V15.5833C15.5833 16.5558 15.197 17.4884 14.5094 18.176C13.8218 18.8637 12.8891 19.25 11.9167 19.25H6.41667C5.44421 19.25 4.51158 18.8637 3.82394 18.176C3.13631 17.4884 2.75 16.5558 2.75 15.5833V7.33332Z" strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
}








