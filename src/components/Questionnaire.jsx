import { useState } from 'react';
import { QUESTIONS } from '../logic/questions.js';
import Progress from './Progress.jsx';
import QuestionCard from './QuestionCard.jsx';

export default function Questionnaire({ onComplete }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});

  const total = QUESTIONS.length;
  const question = QUESTIONS[currentStep];
  const isLast = currentStep === total - 1;
  const isMulti = !!question.multi;
  const currentValue = answers[question.id];

  const handleAnswer = (value) => {
    const next = { ...answers, [question.id]: value };
    setAnswers(next);
    if (!isMulti && !isLast) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const handleNext = () => {
    if (isLast) {
      onComplete(answers);
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const hasAnswer = isMulti
    ? Array.isArray(currentValue) && currentValue.length > 0
    : currentValue !== undefined;

  const showNext = isMulti || isLast;

  return (
    <>
      <Progress
        stepIndex={currentStep}
        totalSteps={total}
        title={question.title}
      />
      <QuestionCard
        key={currentStep}
        question={question}
        value={currentValue}
        onAnswer={handleAnswer}
      />
      <div className="actions">
        {currentStep > 0 ? (
          <button
            type="button"
            className="btn btn--secondary"
            onClick={handleBack}
          >
            Back
          </button>
        ) : (
          <span />
        )}
        {showNext ? (
          <button
            type="button"
            className="btn btn--primary"
            onClick={handleNext}
            disabled={!hasAnswer}
          >
            {isLast ? 'See recommendation' : 'Next'}
          </button>
        ) : null}
      </div>
    </>
  );
}
