import joinClasses from "../../../helpers/joinClasses";

export function Breadcrumb({
  steps = [],
  currentStep = 0,
  onChooseStep = () => { },
}) {
  const selectStep = (index) => {
    if (index > currentStep) return;
    onChooseStep(index);
  };

  return (
    <div className="mb-[30px]">
      <div className="flex items-center w-full justify-between md:mt-8">
        {steps.map((step, index) => {
          return (
            <div
              key={index}
              onClick={() => selectStep(index)}
              className={joinClasses(
                "flex items-center transition-all duration-300 ease-in-out  border-b p-2",
                index === currentStep
                  ? "text-blue border-blue dark:text-white dark:border-white"
                  : "text-gray-400 border-transparent",
                index > currentStep ? "cursor-not-allowed" : "cursor-pointer"
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
