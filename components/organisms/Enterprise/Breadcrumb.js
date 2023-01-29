import joinClasses from "../../../helpers/joinClasses";

export function Breadcrumb({
  steps = [],
  currentStep = 0,
  onChooseStep = () => {},
}) {
  const selectStep = (index) => {
    console.log(index);
    if (index > currentStep) return;
    onChooseStep(index);
  };

  return (
    <div>
      <div className="flex items-center w-full justify-between mt-8">
        {steps.map((step, index) => {
          return (
            <div
              key={index}
              onClick={() => selectStep(index)}
              className={joinClasses(
                "flex items-center",
                index === currentStep
                  ? "text-primary border-b-2 border-primary"
                  : "text-gray-400"
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
