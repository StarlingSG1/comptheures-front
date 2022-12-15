import joinClasses from "../../../helpers/joinClasses";

export function SubTitle({ children, className }) {
  return <p className={joinClasses(className,"dark:text-white text-blue text-bigger")}>{children}</p>;
}
