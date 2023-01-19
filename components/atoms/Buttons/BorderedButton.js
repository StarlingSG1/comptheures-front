import joinClasses from "../../../helpers/joinClasses";

export function BorderedButton({ children, onClick = () => {}, className = "" }) {
  return <button onClick={onClick} className={joinClasses(className, "py-3 rounded-full border-2 border-blue dark:border-white font-noto font-bold uppercase dark:bg-blue-dark bg-white w-full dark:text-white text-blue")}>{children}</button>;
}