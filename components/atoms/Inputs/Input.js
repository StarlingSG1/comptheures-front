export function Input({placeholder, type = "text", editable = true, onChange, defaultValue}) {
    return (
    <div className="flex flex-col">
        <label className="dark:text-white font-bold text-blue">{placeholder}</label>
        {editable ?
        <input defaultValue={defaultValue} onChange={onChange} type={type} className="bg-transparent pl-[15px] outline-none py-2.5 border-b dark:border-b-white placeholder:text-gray border-b-blue dark:text-white text-blue" placeholder={placeholder}/>
        :
        <input readOnly defaultValue={defaultValue} onChange={onChange} type={type} className="bg-transparent pl-[15px] outline-none py-2.5 border-b dark:border-b-white placeholder:text-gray border-b-blue dark:text-white text-blue" placeholder={placeholder}/>
        }
    </div>
    )
}