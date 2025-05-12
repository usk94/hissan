import React from "react"

export const dynamic = "force-dynamic"

type Problem = { a: number; b: number }
function generateSubtractionProblems(): Problem[] {
  const problems: Problem[] = []

  // ① 1の位が一致している繰り下がり問題を2問（a, b どちらも2桁）
  while (problems.length < 2) {
    const digit = Math.floor(Math.random() * 9) + 1 // 1〜9

    // a10: 十の位 2〜9（=> aは20〜99）
    const a10 = Math.floor(Math.random() * 8) + 2

    // b10: 十の位 1〜(a10 - 1)（=> bは10〜(a-10)）
    const b10 = Math.floor(Math.random() * (a10 - 1)) + 1

    const a = a10 * 10 + digit
    const b = b10 * 10 + digit

    if (a < 100 && b < 100 && a > b) {
      problems.push({ a, b })
    }
  }

  // ② 残り14問を「くり下がりあり」+「2桁同士」で生成
  while (problems.length < 16) {
    const a = Math.floor(Math.random() * 90) + 10 // 10〜99
    const b = Math.floor(Math.random() * 90) + 10 // 10〜99

    if (a % 10 < b % 10 && a > b) {
      problems.push({ a, b })
    }
  }

  // ③ シャッフル
  for (let i = problems.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[problems[i], problems[j]] = [problems[j], problems[i]]
  }

  return problems
}

function VerticalSubtraction({ a, b }: Problem) {
  const width = Math.max(a, b).toString().length

  return (
    <div className="inline-block text-[48px] leading-tight font-mono tabular-nums">
      <div className="text-right">{a.toString().padStart(width, " ")}</div>
      <div className="text-right">{"-" + b.toString().padStart(width, " ")}</div>
      <div className="flex justify-end mt-1">
        <div className="border-t border-black" style={{ width: "2.4em" }} />
      </div>
    </div>
  )
}

export default function SubtractionPage() {
  const problems = generateSubtractionProblems()

  return (
    <main className="mx-auto max-w-5xl p-8 print:p-4 print:max-w-none print:h-[1120px] print:w-[794px]">
      <h1 className="text-center text-[48px] font-bold mb-10">くり下がりひっさんスタディ</h1>

      <div className="grid grid-cols-4 gap-x-10 gap-y-[80px] print:gap-x-6">
        {problems.map((p, i) => (
          <div key={i} className="min-h-[140px] print:min-h-[140px] flex items-end">
            <VerticalSubtraction {...p} />
          </div>
        ))}
      </div>
    </main>
  )
}
