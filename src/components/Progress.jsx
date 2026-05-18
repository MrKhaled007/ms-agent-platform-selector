export default function Progress({ stepIndex, totalSteps, title }) {
  const stepNumber = stepIndex + 1;
  const percent = Math.min(100, Math.max(0, (stepNumber / totalSteps) * 100));

  return (
    <div className="progress">
      <div className="progress__label">
        <span className="progress__step">
          Step {stepNumber} of {totalSteps}
        </span>
        <span className="progress__title">/ {title}</span>
      </div>
      <div
        className="progress__bar"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={totalSteps}
        aria-valuenow={stepNumber}
      >
        <div className="progress__fill" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}
