import joinClasses from "../../../helpers/joinClasses"

export function BurgerParagraph({ children, className="" }) {
    return (
        <p className={joinClasses(className, "dark:text-white text-blue uppercase font-bold")}>{children}</p>
    )
}