import joinClasses from "../../../helpers/joinClasses";

export function Breadcrumb({
  steps = [],
  currentStep = 0,
  onChooseStep = () => { },
  className = "",
}) {
  const selectStep = (index) => {
    onChooseStep(index);
  };

  return (
    <div className={joinClasses(className,`mb-[30px]`)}>
      <div className="flex items-center w-full justify-between md:mt-8">
        {steps.map((step, index) => {
          return (
            <div
              key={index}
              onClick={() => selectStep(index)}
              className={joinClasses(
                "flex items-center text-center transition-all duration-300 ease-in-out cursor-pointer border-b p-2",
                index === currentStep
                  ? "text-blue border-blue dark:text-white dark:border-white"
                  : "text-gray-400 border-transparent"
              )}
            >
              {index + 1}. {step}
            </div>
          );
        })}
      </div>
    </div>
  );
}
