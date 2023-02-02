import joinClasses from "../../../../helpers/joinClasses";

export function InvitationsStep({ show = false }) {
    return (
        <div className={joinClasses("", show ? "block" : "hidden")}>
            <p>Invitation...</p>
        </div>
    )
}