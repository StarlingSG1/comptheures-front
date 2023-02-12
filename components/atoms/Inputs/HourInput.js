export function HourInput({ defaultValue = "", onChange = () => {} }) {
    return <input type="time" id="session-date" name="session-date"  defaultValue={defaultValue} onChange={onChange} className="inline-block outline-none relative h-6 w-[55px] text-center bg-transparent text-white dark:text-blue"/>
}