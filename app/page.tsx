import Link from 'next/link'
import { EXAM_DATA } from '../lib/mockData'

const EXAM_ICONS: Record<string, string> = {
  'JEE Mains':      '⚛️',
  'JEE Advanced':   '🔬',
  'NEET':           '🧬',
  'Class 10 Boards':'📚',
  'Class 12 Boards':'🎓',
  'CAT':            '💼',
}

const FEATURES = [
  { icon: '📖', label: 'Quick Revision' },
  { icon: '🧠', label: 'AI-Powered MCQs' },
  { icon: '⚡', label: 'Tricks & Shortcuts' },
]

const STEPS = [
  { num: '01', title: 'Choose Your Exam', desc: 'Select from JEE, NEET, Boards, CAT and more.' },
  { num: '02', title: 'Pick a Chapter',   desc: 'Search any chapter from the full syllabus.' },
  { num: '03', title: 'Revise in 2 Min',  desc: 'Get AI notes, formulas, tips and MCQs instantly.' },
]

const TESTIMONIALS = [
  { quote: 'Revised Thermodynamics the night before JEE Mains. Got 2 questions right. Insane.',  name: 'Rohit Agarwal', exam: 'JEE Mains 2024', score: '97.8 %ile', color: '#6366F1' },
  { quote: 'Blanked on Genetics 10 min before NEET. Quick mode gave me exactly what I needed.',   name: 'Priya Sharma',   exam: 'NEET 2024',     score: '720/720',   color: '#22D3EE' },
  { quote: 'The formula cards are the best feature. Saved me hours of flipping through NCERT.',   name: 'Arjun Mehta',    exam: 'JEE Advanced',  score: 'AIR 847',   color: '#A78BFA' },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-bg text-ink overflow-x-hidden">

      {/* ── Navbar ─────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border backdrop-blur-xl"
           style={{ background: 'rgba(11,11,26,0.85)' }}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="text-xl">📖</span>
            <span className="font-display font-bold text-white text-base">Revision Buddy</span>
            <span className="text-[10px] font-display font-bold text-primary border border-primary/30 px-2 py-0.5 rounded-full">Beta</span>
          </div>
          <Link href="/app"
                className="btn-gradient text-white font-display font-bold text-sm px-5 py-2.5 rounded-xl">
            Start Revising →
          </Link>
        </div>
      </nav>

      {/* ── Hero ───────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20">
        {/* Glow orbs */}
        <div className="glow-orb w-[500px] h-[500px] top-10 left-1/2 -translate-x-1/2 -translate-y-1/4"
             style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%)' }} />
        <div className="glow-orb w-[300px] h-[300px] bottom-20 left-10"
             style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.1) 0%, transparent 70%)' }} />

        <div className="relative z-10 max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 border border-primary/30 rounded-full px-4 py-1.5 mb-8"
               style={{ background: 'rgba(99,102,241,0.1)' }}>
            <span>🚀</span>
            <span className="font-display font-semibold text-sm text-primary tracking-wide uppercase">AI-Powered Revision</span>
          </div>

          {/* Headline */}
          <h1 className="font-display font-extrabold text-white leading-[1.05] tracking-tight mb-6"
              style={{ fontSize: 'clamp(2.8rem, 7vw, 5.5rem)' }}>
            Revise Any Chapter in{' '}
            <span className="text-gradient">2 Minutes</span>{' '}
            Before Your Exam
          </h1>

          <p className="font-body text-muted text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
            Just type your chapter → Get instant revision, PYQs, and practice questions powered by AI
          </p>

          {/* CTA */}
          <Link href="/app"
                className="btn-gradient inline-flex items-center gap-2 text-white font-display font-bold text-lg px-10 py-4 rounded-2xl">
            <span>⚡</span> Start Revising
          </Link>

          {/* Feature chips */}
          <div className="flex flex-wrap gap-3 justify-center mt-10">
            {FEATURES.map(f => (
              <div key={f.label}
                   className="flex items-center gap-2 border border-border rounded-full px-4 py-2"
                   style={{ background: 'rgba(255,255,255,0.04)' }}>
                <span className="text-sm">{f.icon}</span>
                <span className="font-body text-sm text-muted">{f.label}</span>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="mt-16 flex flex-wrap gap-10 justify-center">
            {[
              { num: '10K+',   label: 'Students' },
              { num: '6',      label: 'Exams Covered' },
              { num: '2 min',  label: 'To Revise' },
              { num: '500+',   label: 'Chapters' },
            ].map(s => (
              <div key={s.label} className="text-center">
                <p className="font-display font-extrabold text-white text-3xl">{s.num}</p>
                <p className="font-body text-muted text-xs mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Exams ──────────────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="font-display font-semibold text-primary text-sm uppercase tracking-widest mb-3">Choose your exam</p>
            <h2 className="font-display font-extrabold text-white text-3xl md:text-4xl tracking-tight">
              Built for India&apos;s toughest exams
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Object.entries(EXAM_DATA).map(([name, data]) => (
              <Link key={name} href="/app"
                    className="group relative rounded-2xl p-5 border border-border hover:border-primary/40 transition-all hover:-translate-y-1"
                    style={{ background: 'rgba(255,255,255,0.03)' }}>
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                     style={{ background: `radial-gradient(circle at top left, ${data.color}10, transparent 60%)` }} />
                <div className="relative">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl mb-4 border border-border"
                       style={{ background: data.color + '15' }}>
                    {EXAM_ICONS[name]}
                  </div>
                  <h3 className="font-display font-bold text-white text-base mb-1">{name}</h3>
                  <p className="font-body text-xs mb-3" style={{ color: data.color }}>{data.studentCount}</p>
                  <div className="flex flex-wrap gap-1">
                    {Object.keys(data.subjects).slice(0, 3).map(s => (
                      <span key={s} className="text-[10px] font-display font-semibold px-2 py-0.5 rounded-lg"
                            style={{ color: data.color, background: data.color + '15' }}>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ───────────────────────────────────── */}
      <section className="py-24 px-6 border-t border-border">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <p className="font-display font-semibold text-primary text-sm uppercase tracking-widest mb-3">How it works</p>
            <h2 className="font-display font-extrabold text-white text-3xl md:text-4xl tracking-tight">
              3 steps to a better score
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {STEPS.map((s, i) => (
              <div key={s.num} className="relative rounded-2xl p-6 border border-border"
                   style={{ background: 'rgba(255,255,255,0.03)' }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center font-display font-extrabold text-sm text-white mb-5 btn-gradient">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 className="font-display font-bold text-white text-lg mb-2">{s.title}</h3>
                <p className="font-body text-muted text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ───────────────────────────────────── */}
      <section className="py-24 px-6 border-t border-border">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="font-display font-semibold text-primary text-sm uppercase tracking-widest mb-3">Testimonials</p>
            <h2 className="font-display font-extrabold text-white text-3xl md:text-4xl tracking-tight">
              Students who scored
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {TESTIMONIALS.map(t => (
              <div key={t.name} className="rounded-2xl p-6 border border-border"
                   style={{ background: 'rgba(255,255,255,0.03)' }}>
                <div className="flex mb-4">
                  {[1,2,3,4,5].map(i => <span key={i} className="text-yellow-400 text-sm">★</span>)}
                </div>
                <p className="font-body text-sm text-muted leading-relaxed mb-5 italic">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-display font-bold text-white"
                       style={{ background: t.color + '30', border: `1px solid ${t.color}40` }}>
                    {t.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-display font-semibold text-white text-sm">{t.name}</p>
                    <p className="font-body text-xs text-muted">{t.exam}</p>
                  </div>
                  <div className="text-xs font-display font-bold px-2.5 py-1 rounded-lg"
                       style={{ color: t.color, background: t.color + '18' }}>
                    {t.score}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ─────────────────────────────────────── */}
      <section className="py-24 px-6 border-t border-border">
        <div className="relative max-w-3xl mx-auto text-center rounded-3xl p-12 border border-primary/20 overflow-hidden"
             style={{ background: 'rgba(99,102,241,0.08)' }}>
          <div className="glow-orb w-64 h-64 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
               style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 70%)' }} />
          <div className="relative z-10">
            <h2 className="font-display font-extrabold text-white text-3xl md:text-4xl tracking-tight mb-4">
              Start revising tonight.<br />Your exam doesn&apos;t wait.
            </h2>
            <p className="font-body text-muted text-lg mb-8">Free for 3 revisions/day. No sign-up needed.</p>
            <Link href="/app"
                  className="btn-gradient inline-block text-white font-display font-bold text-base px-10 py-4 rounded-xl">
              Open Revision Buddy →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────── */}
      <footer className="border-t border-border py-8 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <span className="text-xl">📖</span>
            <span className="font-display font-bold text-white text-base">Revision Buddy</span>
            <span className="text-[10px] font-display font-bold text-primary border border-primary/30 px-2 py-0.5 rounded-full">Beta</span>
          </div>
          <p className="font-body text-sm text-muted">AI revision for JEE, NEET, Boards & CAT students</p>
          <p className="font-body text-sm text-muted">Made for India 🇮🇳</p>
        </div>
      </footer>
    </div>
  )
}
