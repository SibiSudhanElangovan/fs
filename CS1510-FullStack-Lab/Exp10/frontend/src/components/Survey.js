import React, { useCallback, useEffect, useState } from 'react';
const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';
export default function Survey() {
  const [questions, setQuestions] = useState([]); const [answers, setAnswers] = useState({}); const [status, setStatus] = useState('Loading questions…'); const [loading, setLoading] = useState(true); const [submitting, setSubmitting] = useState(false);
  const loadQuestions = useCallback(async () => {
    setLoading(true); setStatus('Loading questions…'); setAnswers({});
    try { const response = await fetch(`${API}/api/questions/random?count=5`); if (!response.ok) throw new Error('Could not load survey questions.'); const data = await response.json(); if (data.length < 5) throw new Error('The question bank has fewer than five questions. Run the backend seed command.'); setQuestions(data); setStatus(''); }
    catch (error) { setQuestions([]); setStatus(error.message); }
    finally { setLoading(false); }
  }, []);
  useEffect(() => { loadQuestions(); }, [loadQuestions]);
  const handleChange = (questionId, value) => setAnswers((current) => ({ ...current, [questionId]: value }));
  const handleSubmit = async (event) => {
    event.preventDefault(); const unanswered = questions.find((question) => !String(answers[question._id] || '').trim()); if (unanswered) { setStatus('Please answer all five questions before submitting.'); return; }
    const payload = { userId: null, answers: questions.map((question) => ({ questionId: question._id, answer: answers[question._id] })) };
    setSubmitting(true); setStatus('Submitting…');
    try { const response = await fetch(`${API}/api/responses`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }); const data = await response.json(); if (!response.ok || !data.ok) throw new Error(data.error || data.message || 'Could not save responses.'); setStatus('Thank you! Your responses have been saved.'); setQuestions([]); }
    catch (error) { setStatus(error.message); }
    finally { setSubmitting(false); }
  };
  if (loading) return <section className="survey-card"><p role="status">{status}</p></section>;
  if (questions.length === 0) return <section className="survey-card"><p role="status">{status}</p><button onClick={loadQuestions}>Try again / Load new questions</button></section>;
  return <form className="survey-card" onSubmit={handleSubmit}>
    {questions.map((question, index) => <fieldset className="question" key={question._id}><legend>{index + 1}. {question.text}</legend>
      {question.type === 'choice' ? question.choices.map((choice) => <label className="choice" key={choice}><input type="radio" name={question._id} value={choice} checked={answers[question._id] === choice} onChange={() => handleChange(question._id, choice)} />{choice}</label>) : <textarea rows="3" value={answers[question._id] || ''} onChange={(event) => handleChange(question._id, event.target.value)} placeholder="Write your answer…" />}
    </fieldset>)}
    <button type="submit" disabled={submitting}>{submitting ? 'Submitting…' : 'Submit responses'}</button><p className="status" role="status">{status}</p>
  </form>;
}
