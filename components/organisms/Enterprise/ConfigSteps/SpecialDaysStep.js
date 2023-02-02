import joinClasses from "../../../../helpers/joinClasses";

export function SpecialDaysStep({ show = false }) {
    return (
        <div className={joinClasses("", show ? "block" : "hidden")}>
            <p>Config des jours spéciaux...</p>
        </div>
    )
}