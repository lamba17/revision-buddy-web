'use client'
import { useState } from 'react'
import type { MCQQuestion } from '../types'

interface Props {
  question: MCQQuestion
  questionNumber: number
  total: number
  onAnswer: (correct: boolean) => void
  onNext: () => void
  isLast: boolean
}

const LABELS = ['A', 'B', 'C', 'D']

export default function MCQCard({ question, questionNumber, total, onAnswer, onNext, isLast }: Props) {
  const [selected, setSelected] = useState<number | null>(null)
  const answered = selected !== null

  function pick(i: number) {
    if (answered) return
    setSelected(i)
    onAnswer(i === question.correctIndex)
  }

  function optionStyle(i: number) {
    if (!answered) return 'border-border hover:border-primary/40 cursor-pointer'
    if (i === question.correctIndex) return 'border-success bg-success-light cursor-default'
    if (i === selected) return 'border-error bg-error-light cursor-default'
    return 'border-border opacity-40 cursor-default'
  }

  function optionTextStyle(i: number) {
    if (!answered) return 'text-ink'
    if (i === question.correctIndex) return 'text-success font-semibold'
    if (i === selected) return 'text-error'
    return 'text-muted'
  }

  return (
    <div className="space-y-5 animate-fade-up">
      {/* Progress */}
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm font-body text-muted">Question {questionNumber} of {total}</span>
        <span className="text-sm font-body font-medium text-primary">{question.topic}</span>
      </div>
      <div className="h-1.5 bg-border rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-500"
          style={{ width: `${(questionNumber / total) * 100}%` }}
        />
      </div>

      {/* Question */}
      <div className="rounded-2xl border border-border p-6" style={{ background: 'rgba(255,255,255,0.05)' }}>
        <p className="font-display font-semibold text-ink text-base leading-relaxed">{question.question}</p>
      </div>

      {/* Options */}
      <div className="space-y-3">
        {question.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => pick(i)}
            style={{ background: 'rgba(255,255,255,0.03)' }}
            className={`w-full flex items-start gap-3.5 p-4 rounded-xl border-2 transition-all duration-200 text-left ${optionStyle(i)}`}
          >
            <span className={`w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5 transition-colors
              ${answered && i === question.correctIndex ? 'border-success bg-success text-white' : ''}
              ${answered && i === selected && i !== question.correctIndex ? 'border-error bg-error text-white' : ''}
              ${!answered || (i !== selected && i !== question.correctIndex) ? 'border-border text-muted' : ''}
            `}>
              {LABELS[i]}
            </span>
            <span className={`font-body text-sm leading-relaxed ${optionTextStyle(i)}`}>{opt}</span>
          </button>
        ))}
      </div>

      {/* Explanation */}
      {answered && (
        <div className={`rounded-xl p-4 border-l-4 animate-fade-up ${
          selected === question.correctIndex
            ? 'bg-success-light border-success'
            : 'bg-[#FEF3C7] border-[#F59E0B]'
        }`}>
          {selected === question.correctIndex ? (
            <p className="font-body font-bold text-sm text-success mb-1">✅ Correct!</p>
          ) : (
            <p className="font-body font-bold text-sm text-[#92400e] mb-1">💡 Here's why:</p>
          )}
          <p className="font-body text-sm text-ink/80 leading-relaxed">{question.explanation}</p>
        </div>
      )}

      {answered && (
        <button
          onClick={onNext}
          className="w-full bg-primary text-white font-display font-bold py-4 rounded-xl hover:bg-primary/90 transition-all shadow-primary hover:-translate-y-px active:translate-y-0 animate-fade-up"
        >
          {isLast ? 'See Results →' : 'Next Question →'}
        </button>
      )}
    </div>
  )
}
