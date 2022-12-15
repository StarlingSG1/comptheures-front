import joinClasses from "../../../helpers/joinClasses";

export function Button({ children, onClick = () => {}, className = "" }) {
  return <button onClick={onClick} className={joinClasses(className, "py-3 shadow dark:bg-white dark:text-blue rounded-lg font-noto font-bold uppercase md:dark:bg-white bg-blue w-full text-white")}>{children}</button>;
}