'use client'
import { useState } from 'react'
import Link from 'next/link'
import RevisionCard from '../../components/RevisionCard'
import MCQCard from '../../components/MCQCard'
import ChapterCard from '../../components/ChapterCard'
import StreakCard from '../../components/StreakCard'
import {
  EXAM_DATA, MOCK_REVISION, MOCK_MCQS,
  MOCK_HISTORY, MOCK_WEAK_TOPICS, SUBJECT_COLORS, getGreeting,
} from '../../lib/mockData'
import type { AppView, RevisionMode, HistoryItem } from '../../types'

// ─── Types ───────────────────────────────────────────────
type TabId = 'home' | 'search' | 'practice' | 'progress' | 'profile'

const TABS: { id: TabId; emoji: string; label: string }[] = [
  { id: 'home',     emoji: '🏠', label: 'Home'     },
  { id: 'search',   emoji: '🔍', label: 'Search'   },
  { id: 'practice', emoji: '✏️', label: 'Practice' },
  { id: 'progress', emoji: '📊', label: 'Progress' },
  { id: 'profile',  emoji: '👤', label: 'Profile'  },
]

const MODES: { key: RevisionMode; emoji: string; label: string; duration: string; detail: string; color: string; bg: string; premiumOnly: boolean }[] = [
  { key: 'quick',      emoji: '⚡', label: 'Quick',      duration: '2 min',   detail: 'Key concepts + formulas only. Perfect before class.',          color: '#378ADD', bg: '#EBF4FF', premiumOnly: false },
  { key: 'deep',       emoji: '📚', label: 'Deep',       duration: '5 min',   detail: 'Full concepts + examples + tips for thorough understanding.',   color: '#7F77DD', bg: '#F0EFFF', premiumOnly: false },
  { key: 'last_night', emoji: '🌙', label: 'Last Night', duration: 'All-in',  detail: 'Everything you MUST know + common mistakes. Exam-eve mode.',    color: '#E85D24', bg: '#FFF0EB', premiumOnly: true  },
]

// ─── Main component ───────────────────────────────────────
export default function AppPage() {
  const [tab, setTab]                 = useState<TabId>('home')
  const [view, setView]               = useState<AppView>('home')
  const [selectedChapter, setChapter] = useState('')
  const [selectedSubject, setSubject] = useState('')
  const [selectedExam, setSelectedExam] = useState('JEE Mains')
  const [selectedMode, setMode]       = useState<RevisionMode>('quick')
  const [query, setQuery]             = useState('')
  const [mcqIndex, setMcqIndex]       = useState(0)
  const [mcqScore, setMcqScore]       = useState(0)
  const [history, setHistory]         = useState<HistoryItem[]>(MOCK_HISTORY)
  const [dailyCount]                  = useState(1)
  const FREE_LIMIT = 3

  // ── Navigation helpers ────────────────────────────────
  function goTab(t: TabId) {
    setTab(t)
    setView(t === 'search' ? 'search' : t === 'practice' ? 'practice' : t === 'progress' ? 'progress' : t === 'profile' ? 'profile' : 'home')
    setQuery('')
  }

  function openChapter(chapter: string, subject: string, examName: string) {
    setChapter(chapter)
    setSubject(subject)
    setSelectedExam(examName)
    setView('modeSelect')
  }

  function startRevision(mode: RevisionMode) {
    setMode(mode)
    setHistory(prev => [{
      id: Date.now().toString(),
      chapterName: selectedChapter,
      subject: selectedSubject,
      examType: selectedExam,
      mode,
      revisedAt: new Date().toISOString(),
    }, ...prev].slice(0, 20))
    setView('revision')
  }

  function startPractice() {
    setMcqIndex(0)
    setMcqScore(0)
    setView('practice')
    setTab('practice')
  }

  // ── Search results ────────────────────────────────────
  const allChapters = Object.entries(EXAM_DATA).flatMap(([examName, exam]) =>
    Object.entries(exam.subjects).flatMap(([subject, chapters]) =>
      (chapters as string[]).map(ch => ({ chapter: ch, subject, examName, color: exam.color }))
    )
  )
  const results = query.trim().length > 1
    ? allChapters.filter(r => r.chapter.toLowerCase().includes(query.toLowerCase())).slice(0, 12)
    : []

  // ── Suggested chips for home ──────────────────────────
  const examData = EXAM_DATA[selectedExam as keyof typeof EXAM_DATA] ?? EXAM_DATA['JEE Mains']
  const suggestedChips = Object.entries(examData.subjects)
    .flatMap(([subject, chapters]) =>
      (chapters as string[]).slice(0, 2).map(ch => ({ chapter: ch, subject }))
    ).slice(0, 6)

  // ── Weak topic bar colors ────────────────────────────
  function barColor(acc: number) {
    if (acc < 50) return '#EF4444'
    if (acc < 65) return '#E85D24'
    return '#1D9E75'
  }

  // ─────────────────────────────────────────────────────
  // VIEW RENDERERS
  // ─────────────────────────────────────────────────────

  function renderHome() {
    return (
      <div className="space-y-6 animate-fade-up">
        {/* Greeting */}
        <div className="flex items-start justify-between">
          <div>
            <p className="font-body text-muted text-sm">{getGreeting()}</p>
            <h1 className="font-display font-extrabold text-ink text-2xl mt-0.5">Akash 👋</h1>
          </div>
          <div className="px-3 py-1.5 rounded-xl text-xs font-display font-bold"
               style={{ color: examData.color, backgroundColor: examData.bgColor }}>
            {selectedExam}
          </div>
        </div>

        {/* Search bar */}
        <button
          onClick={() => goTab('search')}
          className="w-full flex items-center gap-3 bg-white border-2 border-border rounded-xl px-4 py-3.5 text-left shadow-card hover:border-primary/40 hover:shadow-card-hover transition-all"
        >
          <span className="text-muted text-lg">🔍</span>
          <span className="font-body text-muted text-[15px]">Search any chapter…</span>
        </button>

        {/* Free tier notice */}
        {dailyCount >= FREE_LIMIT && (
          <div className="bg-error-light border border-red-200 rounded-xl px-4 py-3 flex items-center justify-between">
            <p className="font-body text-sm text-red-700">{dailyCount}/{FREE_LIMIT} free revisions used today</p>
            <button onClick={() => goTab('profile')} className="font-display font-bold text-sm text-primary">Upgrade →</button>
          </div>
        )}

        {/* Streak */}
        <StreakCard streak={5} />

        {/* Quick revise chips */}
        <div>
          <h2 className="font-display font-bold text-ink text-base mb-3">Quick Revise</h2>
          <div className="flex flex-wrap gap-2">
            {suggestedChips.map((s, i) => {
              const color = SUBJECT_COLORS[s.subject] ?? '#378ADD'
              return (
                <button
                  key={i}
                  onClick={() => openChapter(s.chapter, s.subject, selectedExam)}
                  className="flex items-center gap-2 bg-white border border-border rounded-full px-3.5 py-2 text-sm font-body hover:border-primary/40 hover:shadow-card-hover transition-all"
                >
                  <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
                  {s.chapter}
                </button>
              )
            })}
          </div>
        </div>

        {/* Recently revised */}
        {history.length > 0 && (
          <div>
            <h2 className="font-display font-bold text-ink text-base mb-3">Recently Revised</h2>
            <div className="flex gap-3 overflow-x-auto hide-scroll pb-1">
              {history.slice(0, 6).map(item => (
                <ChapterCard key={item.id} item={item} onClick={() => openChapter(item.chapterName, item.subject, item.examType)} />
              ))}
            </div>
          </div>
        )}

        {/* Weak topics preview */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-display font-bold text-ink text-base">Weak Topics</h2>
            <button onClick={() => goTab('progress')} className="text-sm font-body text-primary">See all →</button>
          </div>
          {MOCK_WEAK_TOPICS.filter(t => t.accuracy < 65).slice(0, 2).map((t, i) => (
            <button
              key={i}
              onClick={() => openChapter(t.chapterName, t.subject, selectedExam)}
              className="w-full flex items-center justify-between bg-white border border-red-100 rounded-xl px-4 py-3 mb-2 hover:shadow-card-hover transition-all text-left"
            >
              <div className="flex items-center gap-3">
                <span className="text-base">⚠️</span>
                <div>
                  <p className="font-display font-semibold text-sm text-ink">{t.chapterName}</p>
                  <p className="font-body text-xs text-error">{t.subject} · {t.accuracy}% accuracy</p>
                </div>
              </div>
              <span className="font-display font-bold text-sm text-primary">Revise →</span>
            </button>
          ))}
        </div>
      </div>
    )
  }

  function renderSearch() {
    return (
      <div className="space-y-4 animate-fade-up">
        <h1 className="font-display font-extrabold text-ink text-xl">Search Chapters</h1>

        {/* Search input */}
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted text-lg">🔍</span>
          <input
            autoFocus
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Type a chapter name…"
            className="w-full pl-11 pr-4 py-3.5 bg-white border-2 border-border rounded-xl font-body text-[15px] text-ink placeholder-light focus:outline-none focus:border-primary transition-colors"
          />
          {query && (
            <button onClick={() => setQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-light hover:text-muted text-sm">✕</button>
          )}
        </div>

        {/* Results */}
        {query.trim().length > 1 ? (
          results.length > 0 ? (
            <div className="bg-white rounded-2xl border border-border shadow-card overflow-hidden">
              {results.map((r, i) => (
                <button
                  key={i}
                  onClick={() => openChapter(r.chapter, r.subject, r.examName)}
                  className="w-full flex items-center gap-3 px-4 py-3.5 border-b border-border last:border-0 hover:bg-bg transition-colors text-left"
                >
                  <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: r.color }} />
                  <div className="flex-1 min-w-0">
                    <p className="font-display font-semibold text-sm text-ink truncate">{r.chapter}</p>
                    <p className="font-body text-xs text-muted">{r.subject} · {r.examName}</p>
                  </div>
                  <span className="text-light text-lg flex-shrink-0">→</span>
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-3xl mb-3">🔎</p>
              <p className="font-display font-semibold text-ink">No chapters found</p>
              <p className="font-body text-sm text-muted mt-1">Try &quot;Thermo&quot; or &quot;Kinetics&quot;</p>
            </div>
          )
        ) : (
          /* All chapters grouped by exam */
          <div className="space-y-5">
            {Object.entries(EXAM_DATA).map(([examName, exam]) => (
              <div key={examName}>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: exam.color }} />
                  <p className="font-display font-bold text-sm text-ink">{examName}</p>
                </div>
                {Object.entries(exam.subjects).map(([subject, chapters]) => (
                  <div key={subject} className="mb-4">
                    <p className="font-body text-xs font-semibold text-muted uppercase tracking-wider mb-2 pl-4">
                      {subject}
                    </p>
                    <div className="bg-white rounded-2xl border border-border overflow-hidden">
                      {(chapters as string[]).map((ch, i) => (
                        <button
                          key={i}
                          onClick={() => openChapter(ch, subject, examName)}
                          className="w-full flex items-center justify-between px-4 py-3 border-b border-border last:border-0 hover:bg-bg transition-colors text-left"
                        >
                          <span className="font-body text-sm text-ink">{ch}</span>
                          <span className="text-light text-base">›</span>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }

  function renderModeSelect() {
    return (
      <div className="space-y-5 animate-fade-up">
        <button onClick={() => setView(tab === 'search' ? 'search' : 'home')} className="font-display font-semibold text-primary text-sm">← Back</button>

        <div>
          <h1 className="font-display font-extrabold text-ink text-xl mb-1">{selectedChapter}</h1>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-1 rounded-lg text-xs font-display font-bold"
                  style={{ color: SUBJECT_COLORS[selectedSubject] ?? '#378ADD', backgroundColor: (SUBJECT_COLORS[selectedSubject] ?? '#378ADD') + '18' }}>
              {selectedSubject}
            </span>
            <span className="font-body text-xs text-muted">{selectedExam}</span>
          </div>
        </div>

        <p className="font-display font-bold text-ink text-base">Choose revision mode</p>

        <div className="space-y-3">
          {MODES.map(m => {
            const locked = m.premiumOnly
            return (
              <button
                key={m.key}
                onClick={() => !locked && startRevision(m.key)}
                className={`w-full text-left rounded-2xl p-5 border-2 transition-all ${locked ? 'opacity-60 cursor-not-allowed' : 'hover:-translate-y-0.5 hover:shadow-card-hover cursor-pointer'}`}
                style={{ borderColor: locked ? '#E5E7EB' : m.color, backgroundColor: locked ? '#fff' : m.bg }}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{m.emoji}</span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-display font-bold text-ink text-base">{m.label}</span>
                        {locked && (
                          <span className="text-[10px] font-display font-bold bg-warning-light text-warning px-2 py-0.5 rounded-full">⭐ Premium</span>
                        )}
                      </div>
                      <span className="font-body text-xs text-muted">{m.duration}</span>
                    </div>
                  </div>
                  {!locked && <span className="font-body text-sm" style={{ color: m.color }}>→</span>}
                </div>
                <p className="font-body text-sm text-muted leading-relaxed">{m.detail}</p>
                {locked && <p className="font-display font-semibold text-xs text-primary mt-2">Unlock with Premium — ₹99/month</p>}
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  function renderRevision() {
    const mode = MODES.find(m => m.key === selectedMode)!
    return (
      <div className="space-y-4 animate-fade-up">
        {/* Header */}
        <div className="flex items-center justify-between">
          <button onClick={() => setView('modeSelect')} className="font-display font-semibold text-primary text-sm">← Back</button>
          <button className="border border-border rounded-lg px-3 py-1.5 text-xs font-display font-semibold text-muted hover:bg-bg transition-colors">
            🇮🇳 HI / 🇬🇧 EN
          </button>
        </div>

        <div>
          <h1 className="font-display font-extrabold text-ink text-xl mb-2">{selectedChapter}</h1>
          <div className="flex flex-wrap gap-2">
            <span className="px-2.5 py-1 rounded-lg text-xs font-display font-bold"
                  style={{ color: SUBJECT_COLORS[selectedSubject] ?? '#378ADD', backgroundColor: (SUBJECT_COLORS[selectedSubject] ?? '#378ADD') + '18' }}>
              {selectedSubject}
            </span>
            <span className="px-2.5 py-1 rounded-lg text-xs font-body bg-bg text-muted">{selectedExam}</span>
            <span className="px-2.5 py-1 rounded-lg text-xs font-display font-bold"
                  style={{ color: mode.color, backgroundColor: mode.bg }}>
              {mode.emoji} {mode.label}
            </span>
          </div>
        </div>

        {/* Revision cards */}
        <RevisionCard title="Key Concepts"     emoji="🧠" accentColor="#378ADD" items={MOCK_REVISION.keyConcepts} />
        <RevisionCard title="Important Formulas" emoji="🔢" accentColor="#1D9E75" formulas={MOCK_REVISION.formulas} />
        <RevisionCard title="Exam Tips"        emoji="🎯" accentColor="#E85D24" items={MOCK_REVISION.examTips} />
        <RevisionCard title="Memory Tricks"    emoji="💡" accentColor="#7F77DD" items={MOCK_REVISION.memoryTricks} />
        <RevisionCard title="Common Mistakes"  emoji="⚠️" accentColor="#EF4444" items={MOCK_REVISION.commonMistakes} />

        {/* Practice CTA */}
        <div className="sticky bottom-0 bg-bg/95 backdrop-blur-sm pt-3 pb-2">
          <button
            onClick={startPractice}
            className="w-full bg-primary text-white font-display font-bold py-4 rounded-xl shadow-primary hover:bg-primary/90 hover:-translate-y-0.5 transition-all"
          >
            Practice MCQs on this chapter →
          </button>
          <p className="text-center font-body text-xs text-muted mt-1.5">5 questions · ~3 minutes</p>
        </div>
      </div>
    )
  }

  function renderPractice() {
    if (mcqIndex >= MOCK_MCQS.length) return renderScore()
    return (
      <div className="animate-fade-up">
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => { setView('revision'); setTab('home') }} className="font-display font-semibold text-primary text-sm">← Back</button>
          <span className="font-body text-xs text-muted">{selectedChapter || 'Thermodynamics'}</span>
        </div>
        <MCQCard
          key={mcqIndex}
          question={MOCK_MCQS[mcqIndex]}
          questionNumber={mcqIndex + 1}
          total={MOCK_MCQS.length}
          onAnswer={(correct) => { if (correct) setMcqScore(s => s + 1) }}
          onNext={() => setMcqIndex(i => i + 1)}
          isLast={mcqIndex === MOCK_MCQS.length - 1}
        />
      </div>
    )
  }

  function renderScore() {
    const pct = Math.round((mcqScore / MOCK_MCQS.length) * 100)
    const good = pct >= 60
    return (
      <div className="flex flex-col items-center text-center py-8 space-y-5 animate-fade-up">
        <div className="relative w-28 h-28">
          <svg className="w-28 h-28 -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" fill="none" stroke="#E5E7EB" strokeWidth="10" />
            <circle
              cx="50" cy="50" r="40" fill="none"
              stroke={good ? '#1D9E75' : '#E85D24'} strokeWidth="10"
              strokeDasharray={`${2 * Math.PI * 40}`}
              strokeDashoffset={`${2 * Math.PI * 40 * (1 - pct / 100)}`}
              strokeLinecap="round"
              className="transition-all duration-1000"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-display font-extrabold text-ink text-2xl">{pct}%</span>
          </div>
        </div>

        <div>
          <h2 className="font-display font-extrabold text-ink text-2xl mb-1">You got {mcqScore} out of {MOCK_MCQS.length}</h2>
          <p className="font-body text-muted text-sm">{good ? 'Great work! Keep it up.' : 'Revise this chapter again to improve.'}</p>
        </div>

        <div className="w-full space-y-2">
          <div className="flex items-center gap-2 bg-success-light border border-success/20 rounded-xl px-4 py-3">
            <span className="text-sm">✅</span>
            <p className="font-body text-sm text-success font-medium">Strong: First Law & Isothermal</p>
          </div>
          {!good && (
            <div className="flex items-center gap-2 bg-warning-light border border-warning/20 rounded-xl px-4 py-3">
              <span className="text-sm">📖</span>
              <p className="font-body text-sm text-warning font-medium">Needs work: Carnot & Entropy</p>
            </div>
          )}
        </div>

        <div className="w-full flex flex-col gap-3 pt-2">
          <button
            onClick={() => { setMcqIndex(0); setMcqScore(0) }}
            className="w-full bg-primary text-white font-display font-bold py-3.5 rounded-xl hover:bg-primary/90 transition-all shadow-primary"
          >
            Try Again
          </button>
          <button
            onClick={() => { setView('revision'); setTab('home') }}
            className="w-full bg-white text-primary font-display font-bold py-3.5 rounded-xl border-2 border-primary hover:bg-primary-light transition-all"
          >
            Revise Chapter Again
          </button>
        </div>
      </div>
    )
  }

  function renderProgress() {
    return (
      <div className="space-y-6 animate-fade-up">
        <h1 className="font-display font-extrabold text-ink text-xl">Your Progress</h1>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { num: '24', label: 'Chapters Revised', color: '#378ADD' },
            { num: '5',  label: 'Day Streak',        color: '#1D9E75' },
            { num: '67%', label: 'Avg Accuracy',     color: '#E85D24' },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-2xl p-4 border border-border shadow-card text-center">
              <p className="font-display font-extrabold text-2xl" style={{ color: s.color }}>{s.num}</p>
              <p className="font-body text-[11px] text-muted mt-1 leading-tight">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Bar chart */}
        <div className="bg-white rounded-2xl border border-border shadow-card p-5">
          <h2 className="font-display font-bold text-ink text-sm mb-4">Accuracy by Chapter</h2>
          <div className="space-y-3">
            {MOCK_WEAK_TOPICS.map((t, i) => (
              <div key={i} className="flex items-center gap-3">
                <p className="font-body text-xs text-ink w-32 flex-shrink-0 truncate">{t.chapterName}</p>
                <div className="flex-1 h-2.5 bg-border rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${t.accuracy}%`, backgroundColor: barColor(t.accuracy) }}
                  />
                </div>
                <p className="font-display font-bold text-xs w-8 text-right flex-shrink-0" style={{ color: barColor(t.accuracy) }}>
                  {t.accuracy}%
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Weak topics list */}
        <div>
          <h2 className="font-display font-bold text-ink text-base mb-3">Focus On These</h2>
          <div className="space-y-2">
            {MOCK_WEAK_TOPICS.filter(t => t.accuracy < 65).map((t, i) => (
              <button
                key={i}
                onClick={() => openChapter(t.chapterName, t.subject, selectedExam)}
                className="w-full flex items-center justify-between bg-white border border-border rounded-xl px-4 py-3.5 hover:shadow-card-hover transition-all text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: barColor(t.accuracy) }} />
                  <div>
                    <p className="font-display font-semibold text-sm text-ink">{t.chapterName}</p>
                    <p className="font-body text-xs text-muted">{t.subject} · {t.attempts} attempts</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-display font-bold text-sm" style={{ color: barColor(t.accuracy) }}>{t.accuracy}%</span>
                  <span className="font-display font-bold text-sm text-primary">Revise →</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  function renderProfile() {
    return (
      <div className="space-y-5 animate-fade-up">
        {/* Avatar */}
        <div className="flex flex-col items-center pt-4 pb-2">
          <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white font-display font-extrabold text-xl mb-3">
            AK
          </div>
          <h2 className="font-display font-extrabold text-ink text-lg">Akash</h2>
          <div className="flex items-center gap-2 mt-1.5">
            <span className="px-3 py-1 rounded-full text-xs font-display font-bold text-primary bg-primary-light">JEE Mains</span>
            <span className="px-3 py-1 rounded-full text-xs font-display font-bold text-muted bg-bg">Class 12</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { num: '24', label: 'Chapters Revised' },
            { num: '5',  label: 'Day Streak' },
            { num: '87', label: 'MCQs Attempted' },
            { num: '71%', label: 'Accuracy' },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-2xl p-4 border border-border shadow-card text-center">
              <p className="font-display font-extrabold text-primary text-2xl">{s.num}</p>
              <p className="font-body text-xs text-muted mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Premium card */}
        <div className="bg-ink rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">⚡</span>
            <div>
              <p className="font-display font-bold text-white text-base">Unlock Premium</p>
              <p className="font-body text-white/60 text-xs">Everything, no limits</p>
            </div>
          </div>
          <div className="space-y-2 mb-5">
            {['♾️  Unlimited revisions per day', '📋  Full 10-year PYQ bank', '🌙  Last Night mode', '🇮🇳  Hindi language mode', '📊  Advanced weak topic analysis'].map(f => (
              <p key={f} className="font-body text-sm text-white/80">{f}</p>
            ))}
          </div>
          <div className="flex gap-3 mb-4">
            <button className="flex-1 border border-white/20 rounded-xl py-3 text-white/80 font-display font-semibold text-sm hover:bg-white/10 transition-colors">₹99 / month</button>
            <button className="flex-1 bg-primary rounded-xl py-3 text-white font-display font-bold text-sm hover:bg-primary/90 transition-colors">
              ₹499 / 6 months
              <span className="block text-[10px] font-body text-white/75">Save 16%</span>
            </button>
          </div>
          <p className="text-center font-body text-xs text-white/40">🔒 Secure payment via Razorpay</p>
        </div>

        {/* Settings */}
        <div className="bg-white rounded-2xl border border-border shadow-card overflow-hidden">
          {[
            { emoji: '🌐', label: 'Language', value: 'English', action: () => {} },
            { emoji: '📚', label: 'Change Exam', value: 'JEE Mains', action: () => {} },
            { emoji: '🔔', label: 'Notifications', value: 'On', action: () => {} },
            { emoji: '⭐', label: 'Rate the App', value: '', action: () => {} },
          ].map((s, i, arr) => (
            <button
              key={s.label}
              onClick={s.action}
              className={`w-full flex items-center justify-between px-4 py-4 hover:bg-bg transition-colors ${i < arr.length - 1 ? 'border-b border-border' : ''}`}
            >
              <div className="flex items-center gap-3">
                <span className="text-lg">{s.emoji}</span>
                <div className="text-left">
                  <p className="font-display font-semibold text-sm text-ink">{s.label}</p>
                  {s.value && <p className="font-body text-xs text-muted">{s.value}</p>}
                </div>
              </div>
              <span className="text-light text-xl">›</span>
            </button>
          ))}
        </div>

        <p className="text-center font-body text-xs text-light pb-2">Revision Buddy v1.0 · Made for India 🇮🇳</p>
      </div>
    )
  }

  // ─────────────────────────────────────────────────────
  // RENDER ACTIVE VIEW
  // ─────────────────────────────────────────────────────
  function renderView() {
    switch (view) {
      case 'home':       return renderHome()
      case 'search':     return renderSearch()
      case 'modeSelect': return renderModeSelect()
      case 'revision':   return renderRevision()
      case 'practice':   return renderPractice()
      case 'score':      return renderScore()
      case 'progress':   return renderProgress()
      case 'profile':    return renderProfile()
      default:           return renderHome()
    }
  }

  // ─────────────────────────────────────────────────────
  // SHELL
  // ─────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-bg flex flex-col">

      {/* Top bar */}
      <header className="bg-white border-b border-border px-4 h-14 flex items-center justify-between flex-shrink-0 sticky top-0 z-40">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl">📖</span>
          <span className="font-display font-bold text-ink text-sm tracking-tight">Revision Buddy</span>
          <span className="text-[9px] font-display font-bold text-white bg-primary px-1.5 py-0.5 rounded-full">Beta</span>
        </Link>
        <div className="flex items-center gap-2">
          <span className="font-body text-xs text-muted hidden sm:block">Free: {dailyCount}/{FREE_LIMIT} revisions</span>
          <button
            onClick={() => goTab('profile')}
            className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-display font-bold text-xs"
          >
            AK
          </button>
        </div>
      </header>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">

        {/* Sidebar — desktop only */}
        <aside className="hidden md:flex flex-col w-56 bg-white border-r border-border flex-shrink-0 py-4 gap-1 px-3">
          {TABS.map(t => {
            const active = tab === t.id
            return (
              <button
                key={t.id}
                onClick={() => goTab(t.id)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all ${active ? 'bg-primary-light text-primary font-display font-bold' : 'text-muted font-body hover:bg-bg hover:text-ink'}`}
              >
                <span className="text-base">{t.emoji}</span>
                <span className="text-sm">{t.label}</span>
              </button>
            )
          })}
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-xl mx-auto px-4 py-6 pb-24 md:pb-6">
            {renderView()}
          </div>
        </main>
      </div>

      {/* Bottom nav — mobile only */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-border flex z-40">
        {TABS.map(t => {
          const active = tab === t.id
          return (
            <button
              key={t.id}
              onClick={() => goTab(t.id)}
              className="flex-1 flex flex-col items-center justify-center py-2.5 gap-0.5 transition-colors"
            >
              <span className={`text-xl transition-transform ${active ? 'scale-110' : 'opacity-50'}`}>{t.emoji}</span>
              <span className={`text-[10px] font-display font-semibold ${active ? 'text-primary' : 'text-light'}`}>{t.label}</span>
            </button>
          )
        })}
      </nav>
    </div>
  )
}
