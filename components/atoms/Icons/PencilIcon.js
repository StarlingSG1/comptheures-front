import joinClasses from "../../../helpers/joinClasses"

export function PencilIcon({className, onClick = () => {}, height = 28, width = 28}) {
    return <svg onClick={onClick} width={height} height={width} viewBox="0 0 32 32" className={joinClasses(className, "cursor-pointer dark:fill-white fill-blue")} xmlns="http://www.w3.org/2000/svg">
        <path d="M9.33366 19.92L17.4137 11.84L20.1603 14.5866L12.0803 22.6666H9.33366V19.92ZM16.0003 26.6666C18.8293 26.6666 21.5424 25.5428 23.5428 23.5424C25.5432 21.542 26.667 18.8289 26.667 16C26.667 13.171 25.5432 10.4579 23.5428 8.45749C21.5424 6.4571 18.8293 5.33329 16.0003 5.33329C13.1713 5.33329 10.4582 6.4571 8.45785 8.45749C6.45747 10.4579 5.33366 13.171 5.33366 16C5.33366 18.8289 6.45747 21.542 8.45785 23.5424C10.4582 25.5428 13.1713 26.6666 16.0003 26.6666ZM22.267 12.4666L20.9337 13.8L18.2003 11.0666L19.5337 9.73329C19.8137 9.43996 20.2803 9.43996 20.5603 9.73329L22.267 11.44C22.5603 11.72 22.5603 12.1866 22.267 12.4666ZM16.0003 2.66663C17.7513 2.66663 19.4851 3.0115 21.1028 3.68157C22.7204 4.35163 24.1903 5.33375 25.4284 6.57187C26.6665 7.80998 27.6487 9.27984 28.3187 10.8975C28.9888 12.5152 29.3337 14.249 29.3337 16C29.3337 19.5362 27.9289 22.9276 25.4284 25.4281C22.9279 27.9285 19.5365 29.3333 16.0003 29.3333C14.2494 29.3333 12.5156 28.9884 10.8979 28.3184C9.2802 27.6483 7.81035 26.6662 6.57224 25.4281C4.07175 22.9276 2.66699 19.5362 2.66699 16C2.66699 12.4637 4.07175 9.07235 6.57224 6.57187C9.07272 4.07138 12.4641 2.66663 16.0003 2.66663Z" />
    </svg>
}