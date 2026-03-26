import { NextRequest, NextResponse } from 'next/server'

const SYSTEM_PROMPT = `You are India's best JEE, NEET, Boards and CAT exam coach. You know the complete NCERT Class 10-12 syllabus and CAT syllabus by heart. Your revision notes are famous for being concise, accurate, and exam-focused. Every word you write helps students score marks. Never add unnecessary information. Always use simple English that a student understands. For formulas, always explain what each variable represents.`

function buildUserPrompt(
  examType: string,
  subject: string,
  chapterName: string,
  mode: string
): string {
  const modeInstructions: Record<string, string> = {
    quick: 'Quick mode (2 min): Return exactly 5 key concepts, 3 formulas, 2 exam tips, 1 memory trick, 1 common mistake.',
    deep: 'Deep mode (5 min): Return 8 key concepts, 5 formulas, 3 exam tips, 2 memory tricks, 3 common mistakes.',
    last_night: 'Last Night mode (exam-eve): Return only what WILL DEFINITELY come in the exam. 6 most critical concepts, 4 most-tested formulas, 3 exam tips, 2 memory tricks, 3 most common mistakes students make.',
  }

  return `Generate a revision for:
Exam: ${examType}
Subject: ${subject}
Chapter: ${chapterName}
Mode: ${modeInstructions[mode] ?? modeInstructions.quick}

Return ONLY valid JSON — no markdown, no explanation, just the JSON object.
The JSON must exactly match this structure:
{
  "keyConcepts": ["string", ...],
  "formulas": [{ "formula": "string", "meaning": "string" }, ...],
  "examTips": ["string", ...],
  "memoryTricks": ["string", ...],
  "commonMistakes": ["string", ...]
}

Make every item specific to ${chapterName} in ${subject} for ${examType}. Do not use generic examples.`
}

function buildMCQPrompt(examType: string, subject: string, chapterName: string): string {
  return `Generate 5 multiple-choice questions for:
Exam: ${examType}, Subject: ${subject}, Chapter: ${chapterName}

Style: exactly like real ${examType} exam questions.
Difficulty: 2 easy, 2 medium, 1 hard.

Return ONLY valid JSON array — no markdown, just the array:
[
  {
    "id": "q1",
    "question": "string",
    "options": ["A text", "B text", "C text", "D text"],
    "correctIndex": 0,
    "explanation": "string explaining why correct and why others are wrong",
    "topic": "subtopic within ${chapterName}"
  }
]`
}

export async function POST(req: NextRequest) {
  try {
    const { examType, subject, chapterName, mode } = await req.json()

    if (!examType || !subject || !chapterName || !mode) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const apiKey = process.env.ANTHROPIC_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: 'API key not configured' }, { status: 500 })
    }

    // Call Claude for revision content and MCQs in parallel
    const [revisionRes, mcqRes] = await Promise.all([
      fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-6',
          max_tokens: 2048,
          system: SYSTEM_PROMPT,
          messages: [{ role: 'user', content: buildUserPrompt(examType, subject, chapterName, mode) }],
        }),
      }),
      fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-6',
          max_tokens: 2048,
          system: SYSTEM_PROMPT,
          messages: [{ role: 'user', content: buildMCQPrompt(examType, subject, chapterName) }],
        }),
      }),
    ])

    if (!revisionRes.ok || !mcqRes.ok) {
      const err = await revisionRes.text()
      return NextResponse.json({ error: 'Claude API error', detail: err }, { status: 502 })
    }

    const [revisionData, mcqData] = await Promise.all([revisionRes.json(), mcqRes.json()])

    const revisionText = revisionData.content?.[0]?.text ?? '{}'
    const mcqText = mcqData.content?.[0]?.text ?? '[]'

    // Strip any markdown fences Claude might add
    const cleanJson = (s: string) => s.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim()

    const revision = JSON.parse(cleanJson(revisionText))
    const mcqs = JSON.parse(cleanJson(mcqText))

    return NextResponse.json({ revision, mcqs })
  } catch (err) {
    console.error('revise API error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
