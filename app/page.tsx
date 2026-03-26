import Link from 'next/link'
import Navbar from '../components/Navbar'
import { EXAM_DATA } from '../lib/mockData'

const FEATURES = [
  {
    emoji: '⚡',
    title: 'Quick Revision',
    desc: 'Get focused notes on any chapter in under 2 minutes. Key concepts, formulas, and exam tips — nothing extra.',
    color: '#378ADD',
    bg: '#EBF4FF',
  },
  {
    emoji: '🎯',
    title: 'MCQ Practice',
    desc: 'Practice real JEE and NEET-style questions. Wrong answer? Get AI explanation on exactly why and what to remember.',
    color: '#1D9E75',
    bg: '#E8F7F2',
  },
  {
    emoji: '📊',
    title: 'Weak Topic Tracker',
    desc: 'See your accuracy per chapter. Focus your last days of prep exactly where it matters most.',
    color: '#E85D24',
    bg: '#FFF0EB',
  },
]

const TESTIMONIALS = [
  {
    quote: "Revised Thermodynamics the night before JEE Mains. Got 2 questions from it right. This app is insane.",
    name: 'Rohit Agarwal',
    exam: 'JEE Mains 2024',
    city: 'Kota',
    score: '97.8 percentile',
    initials: 'RA',
    color: '#378ADD',
  },
  {
    quote: "I was blanking on Genetics 10 minutes before NEET. Quick mode gave me exactly what I needed. Scored 720.",
    name: 'Priya Sharma',
    exam: 'NEET 2024',
    city: 'Jaipur',
    score: '720/720',
    initials: 'PS',
    color: '#1D9E75',
  },
  {
    quote: "The formula cards are the best feature. Instead of flipping through NCERT, just open this. Saved me hours.",
    name: 'Arjun Mehta',
    exam: 'JEE Advanced 2024',
    city: 'Dehradun',
    score: 'AIR 847',
    initials: 'AM',
    color: '#7F77DD',
  },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-bg">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        {/* Dot grid bg */}
        <div className="absolute inset-0 dot-grid opacity-40" />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-bg via-bg/95 to-bg" />
        {/* Glow */}
        <div className="absolute top-24 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/8 rounded-full blur-3xl" />

        <div className="relative max-w-4xl mx-auto px-6 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white border border-border rounded-full px-4 py-2 mb-8 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="font-body text-sm text-muted">Trusted by 10,000+ JEE & NEET aspirants</span>
          </div>

          {/* Headline */}
          <h1 className="font-display font-extrabold text-ink mb-6 leading-[1.05] tracking-tight"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}>
            Revise any chapter
            <br />
            <span className="text-primary">in 2 minutes.</span>
          </h1>

          <p className="font-body text-muted text-lg md:text-xl mb-10 max-w-xl mx-auto leading-relaxed">
            AI-powered revision notes for{' '}
            <span className="text-primary font-semibold">JEE</span>,{' '}
            <span className="text-accent font-semibold">NEET</span>,{' '}
            <span className="text-[#EC4899] font-semibold">Boards</span> &{' '}
            <span className="text-[#DC2626] font-semibold">CAT</span>.
            Key concepts, formulas, exam tips — in one place.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/app"
              className="bg-primary text-white font-display font-bold text-base px-8 py-4 rounded-xl shadow-primary hover:bg-primary/90 hover:-translate-y-0.5 active:translate-y-0 transition-all"
            >
              Start for Free →
            </Link>
            <a
              href="#how-it-works"
              className="bg-white text-ink font-display font-semibold text-base px-8 py-4 rounded-xl border border-border shadow-sm hover:shadow-card-hover hover:-translate-y-0.5 transition-all"
            >
              See how it works
            </a>
          </div>

          {/* Social proof numbers */}
          <div className="mt-14 flex flex-wrap gap-6 justify-center">
            {[
              { num: '10K+', label: 'Students' },
              { num: '6 exams', label: 'Covered' },
              { num: '2 min', label: 'To revise' },
              { num: '500+', label: 'Chapters' },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-display font-extrabold text-ink text-2xl">{s.num}</p>
                <p className="font-body text-muted text-xs mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Exam cards */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="font-display font-semibold text-primary text-sm uppercase tracking-widest mb-3">Choose your exam</p>
            <h2 className="font-display font-extrabold text-ink text-3xl md:text-4xl tracking-tight">
              Built for India&apos;s toughest exams
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {Object.entries(EXAM_DATA).map(([name, data]) => (
              <Link
                key={name}
                href="/app"
                className="group relative bg-bg rounded-2xl p-6 border border-border hover:border-transparent hover:shadow-card-hover transition-all hover:-translate-y-1"
              >
                <div
                  className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
                  style={{ backgroundColor: data.color }}
                />
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4"
                  style={{ backgroundColor: data.bgColor }}
                >
                  {name === 'JEE Mains' ? '⚛️' : name === 'JEE Advanced' ? '🔬' : name === 'NEET' ? '🧬' : name === 'Class 10 Boards' ? '📚' : name === 'Class 12 Boards' ? '🎓' : '💼'}
                </div>
                <h3 className="font-display font-bold text-ink text-lg mb-1">{name}</h3>
                <p className="font-body text-sm mb-4" style={{ color: data.color }}>
                  {data.studentCount}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {Object.keys(data.subjects).map((s) => (
                    <span
                      key={s}
                      className="text-[11px] font-display font-semibold px-2.5 py-1 rounded-lg"
                      style={{ color: data.color, backgroundColor: data.bgColor }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="font-display font-semibold text-primary text-sm uppercase tracking-widest mb-3">Features</p>
            <h2 className="font-display font-extrabold text-ink text-3xl md:text-4xl tracking-tight">
              Everything you need, nothing you don&apos;t
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="bg-white rounded-2xl p-7 border border-border shadow-card hover:shadow-card-hover transition-all hover:-translate-y-0.5"
              >
                <div
                  className="w-13 h-13 rounded-xl flex items-center justify-center text-2xl mb-5 w-12 h-12"
                  style={{ backgroundColor: f.bg }}
                >
                  {f.emoji}
                </div>
                <h3 className="font-display font-bold text-ink text-lg mb-2">{f.title}</h3>
                <p className="font-body text-muted text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="font-display font-semibold text-primary text-sm uppercase tracking-widest mb-3">How it works</p>
            <h2 className="font-display font-extrabold text-ink text-3xl md:text-4xl tracking-tight">
              3 steps to a better score
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Type a chapter', desc: 'Search any chapter from JEE or NEET syllabus — Thermodynamics, Integration, Cell Biology…', color: '#378ADD' },
              { step: '02', title: 'Pick your mode', desc: 'Quick (2 min), Deep (5 min), or Last Night mode for exam-eve panic revision.', color: '#7F77DD' },
              { step: '03', title: 'Revise & practice', desc: 'Read AI notes then drill MCQs. Wrong answers? Get instant explanations.', color: '#1D9E75' },
            ].map((s) => (
              <div key={s.step} className="relative">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center font-display font-extrabold text-sm text-white mb-5"
                  style={{ backgroundColor: s.color }}
                >
                  {s.step}
                </div>
                <h3 className="font-display font-bold text-ink text-lg mb-2">{s.title}</h3>
                <p className="font-body text-muted text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="font-display font-semibold text-primary text-sm uppercase tracking-widest mb-3">Testimonials</p>
            <h2 className="font-display font-extrabold text-ink text-3xl md:text-4xl tracking-tight">
              Students who scored
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="bg-white rounded-2xl p-6 border border-border shadow-card">
                <div className="flex mb-4">
                  {[1,2,3,4,5].map((i) => (
                    <span key={i} className="text-[#F59E0B] text-sm">★</span>
                  ))}
                </div>
                <p className="font-body text-sm text-ink leading-relaxed mb-5 italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-display font-bold text-white"
                    style={{ backgroundColor: t.color }}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-display font-semibold text-ink text-sm">{t.name}</p>
                    <p className="font-body text-xs text-muted">{t.exam} · {t.city}</p>
                  </div>
                  <div
                    className="ml-auto text-xs font-display font-bold px-2.5 py-1 rounded-lg"
                    style={{ color: t.color, backgroundColor: t.color + '18' }}
                  >
                    {t.score}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 bg-primary">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-display font-extrabold text-white text-3xl md:text-4xl tracking-tight mb-4">
            Start revising tonight.
            <br />
            Your exam doesn&apos;t wait.
          </h2>
          <p className="font-body text-white/75 text-lg mb-8">
            Free for 3 revisions/day. No sign-up needed.
          </p>
          <Link
            href="/app"
            className="inline-block bg-white text-primary font-display font-bold text-base px-10 py-4 rounded-xl hover:bg-white/95 hover:-translate-y-0.5 transition-all shadow-lg"
          >
            Open Revision Buddy →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-ink py-10">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <span className="text-xl">📖</span>
            <span className="font-display font-bold text-white text-base">Revision Buddy</span>
            <span className="text-[10px] font-display font-bold text-primary/80 border border-primary/30 px-2 py-0.5 rounded-full">Beta</span>
          </div>
          <p className="font-body text-sm text-white/40">
            AI revision for JEE & NEET students
          </p>
          <p className="font-body text-sm text-white/40">Made for India 🇮🇳</p>
        </div>
      </footer>
    </div>
  )
}
