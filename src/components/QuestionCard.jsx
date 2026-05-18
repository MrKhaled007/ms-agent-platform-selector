import { useRef } from 'react';

export default function QuestionCard({ question, value, onAnswer }) {
  const { title, subtitle, options, multi } = question;
  const optionRefs = useRef([]);

  const handleKeyDown = (e, idx) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      e.preventDefault();
      const next = (idx + 1) % options.length;
      optionRefs.current[next]?.focus();
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault();
      const prev = (idx - 1 + options.length) % options.length;
      optionRefs.current[prev]?.focus();
    }
  };

  if (multi) {
    const selected = Array.isArray(value) ? value : [];

    const toggle = (optValue) => {
      let next;
      if (optValue === 'none') {
        next = selected.includes('none') ? [] : ['none'];
      } else {
        const withoutNoneOrSelf = selected.filter(
          (v) => v !== 'none' && v !== optValue,
        );
        next = selected.includes(optValue)
          ? withoutNoneOrSelf
          : [...withoutNoneOrSelf, optValue];
      }
      onAnswer(next);
    };

    return (
      <div className="question">
        <h2 className="question__title">{title}</h2>
        {subtitle && <p className="question__subtitle">{subtitle}</p>}
        <div className="options" role="group" aria-label={title}>
          {options.map((opt, idx) => {
            const isSelected = selected.includes(opt.value);
            return (
              <button
                key={opt.value}
                ref={(el) => (optionRefs.current[idx] = el)}
                type="button"
                role="checkbox"
                aria-checked={isSelected}
                className={`option${isSelected ? ' option--selected' : ''}`}
                onClick={() => toggle(opt.value)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
              >
                <span className="option__indicator" aria-hidden="true">
                  {isSelected && <span className="option__check">✓</span>}
                </span>
                <span className="option__body">
                  <span className="option__label">{opt.label}</span>
                  {opt.hint && <span className="option__hint">{opt.hint}</span>}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="question">
      <h2 className="question__title">{title}</h2>
      {subtitle && <p className="question__subtitle">{subtitle}</p>}
      <div className="options" role="radiogroup" aria-label={title}>
        {options.map((opt, idx) => {
          const isSelected = value === opt.value;
          return (
            <button
              key={opt.value}
              ref={(el) => (optionRefs.current[idx] = el)}
              type="button"
              role="radio"
              aria-checked={isSelected}
              className={`option${isSelected ? ' option--selected' : ''}`}
              onClick={() => onAnswer(opt.value)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
            >
              <span className="option__body">
                <span className="option__label">{opt.label}</span>
                {opt.hint && <span className="option__hint">{opt.hint}</span>}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
