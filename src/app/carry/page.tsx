import React from "react"

export const dynamic = "force-dynamic"

type Problem = { a: number; b: number }

function generateProblems(): Problem[] {
  const problems: Problem[] = []

  // まず、2桁＋2桁の問題を13問作成
  while (problems.length < 13) {
    const a = Math.floor(Math.random() * 90) + 10
    const b = Math.floor(Math.random() * 90) + 10
    if ((a % 10) + (b % 10) >= 10 && a + b < 100) {
      problems.push({ a, b })
    }
  }

  // 次に、1桁＋2桁の問題を3問作成
  while (problems.length < 16) {
    const b = Math.floor(Math.random() * 9) + 1 // 1–9
    const a = Math.floor(Math.random() * 90) + 10 // 10–99
    if ((a % 10) + (b % 10) >= 10 && a + b < 100) {
      problems.push({ a, b })
    }
  }

  // 最後に問題をシャッフル（ランダムな並びにする）
  for (let i = problems.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[problems[i], problems[j]] = [problems[j], problems[i]]
  }

  return problems
}

function VerticalAddition({ a, b }: Problem) {
  const width = Math.max(a, b).toString().length

  return (
    <div className="inline-block text-[48px] leading-tight font-mono tabular-nums">
      {/* 上段 */}
      <div className="text-right">{a.toString().padStart(width, " ")}</div>

      {/* 下段 */}
      <div className="text-right">{"+" + b.toString().padStart(width, " ")}</div>

      {/* 線 */}
      <div className="flex justify-end mt-1">
        <div className="border-t border-black" style={{ width: "2.4em" }} />
      </div>
    </div>
  )
}

export default function CarryAdditionPage() {
  const problems = generateProblems()

  return (
    <main className="mx-auto max-w-5xl p-8 print:p-4 print:max-w-none print:h-[1120px] print:w-[794px]">
      <h1 className="text-center text-[48px] font-bold mb-10">くり上がりひっさんスタディ</h1>

      <div className="grid grid-cols-4 gap-x-10 gap-y-[80px] print:gap-x-6">
        {problems.map((p, i) => (
          <div key={i}>
            <VerticalAddition {...p} />
          </div>
        ))}
      </div>
    </main>
  )
}
