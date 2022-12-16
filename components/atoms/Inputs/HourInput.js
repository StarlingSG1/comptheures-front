export function HourInput({ placeholder = "10h00", type = "text", defaultValue = "" }) {
    return <input type={type} defaultValue={defaultValue} className="bg-transparent outline-none text-center text-white dark:text-blue w-[55px]" placeholder={placeholder} />
}