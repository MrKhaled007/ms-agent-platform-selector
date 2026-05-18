import { useState } from 'react';
import Header from './components/Header.jsx';
import Questionnaire from './components/Questionnaire.jsx';
import RecommendationPage from './components/RecommendationPage.jsx';

export default function App() {
  const [answers, setAnswers] = useState(null);

  return (
    <div className="app-shell">
      <Header />
      <main className="page-container">
        {answers ? (
          <RecommendationPage
            answers={answers}
            onStartOver={() => setAnswers(null)}
          />
        ) : (
          <Questionnaire onComplete={setAnswers} />
        )}
      </main>
    </div>
  );
}
