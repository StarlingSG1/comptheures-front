import joinClasses from "../../../../helpers/joinClasses";

export function ClocksStep({ show = false }) {
    return (
        <div className={joinClasses("", show ? "block" : "hidden")}>
            <p>Config des horaires...</p>
        </div>
    )
}