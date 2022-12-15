import joinClasses from "../../../helpers/joinClasses";

export function Title({ children , className = ""}) {
  return <p className={joinClasses(className, "dark:text-white text-blue text-large font-bold")}>{children}</p>;
}
