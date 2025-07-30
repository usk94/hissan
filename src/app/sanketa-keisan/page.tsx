import React from "react"

export const dynamic = "force-dynamic"

type Problem = { a: number; b: number; symbol: "+" | "-" }

function generateMixedProblems(): Problem[] {
  const problems: Problem[] = []

  const pushIfValid = (a: number, b: number, symbol: "+" | "-") => {
    if (a >= b && a < 1000 && b < 1000) {
      problems.push({ a, b, symbol })
    }
  }

  // 足し算
  while (problems.length < 2) {
    const a = Math.floor(Math.random() * 900) + 100
    const b = Math.floor(Math.random() * 900) + 100
    if (a + b <= 999) {
      problems.push({ a, b, symbol: "+" })
    }
  }

  while (problems.length < 4) {
    const a = Math.floor(Math.random() * 900) + 100
    const b = Math.floor(Math.random() * 90) + 10
    if (a + b <= 999) {
      problems.push({ a, b, symbol: "+" })
    }
  }

  // 引き算：3桁 - 1桁
  while (problems.length < 6) {
    const a = Math.floor(Math.random() * 900) + 100
    const b = Math.floor(Math.random() * 9) + 1
    const a1 = a % 10
    const b1 = b % 10
    if (a1 < b1) {
      pushIfValid(a, b, "-")
    }
  }

  // 1. くり下がりなし
  while (problems.length < 7) {
    const a = Math.floor(Math.random() * 900) + 100
    const b = Math.floor(Math.random() * 90) + 10
    const a1 = a % 10
    const a10 = Math.floor(a / 10) % 10
    const b1 = b % 10
    const b10 = Math.floor(b / 10) % 10
    if (a1 >= b1 && a10 >= b10) {
      pushIfValid(a, b, "-")
    }
  }

  // 2. 10の位から借りる必要あり（1の位だけ繰り下がり）
  while (problems.length < 9) {
    const a = Math.floor(Math.random() * 900) + 100
    const b = Math.floor(Math.random() * 90) + 10
    const a1 = a % 10
    const b1 = b % 10
    if (a1 < b1) {
      pushIfValid(a, b, "-")
    }
  }

  // 3. 100の位からも借りる必要あり
  while (problems.length < 12) {
    const a = Math.floor(Math.random() * 900) + 100
    const b = Math.floor(Math.random() * 90) + 10
    const a1 = a % 10
    const a10 = Math.floor(a / 10) % 10
    const b1 = b % 10
    const b10 = Math.floor(b / 10) % 10
    if (a1 < b1 && a10 < b10) {
      pushIfValid(a, b, "-")
    }
  }

  // 1. くり下がりなし
  while (problems.length < 13) {
    const a = Math.floor(Math.random() * 900) + 100
    const b = Math.floor(Math.random() * 900) + 100
    const a1 = a % 10
    const a10 = Math.floor(a / 10) % 10
    const b1 = b % 10
    const b10 = Math.floor(b / 10) % 10
    if (a1 >= b1 && a10 >= b10 && a > b) {
      pushIfValid(a, b, "-")
    }
  }

  // 2. 1の位だけ繰り下がり
  while (problems.length < 14) {
    const a = Math.floor(Math.random() * 900) + 100
    const b = Math.floor(Math.random() * 900) + 100
    const a1 = a % 10
    const b1 = b % 10
    if (a1 < b1 && a > b) {
      pushIfValid(a, b, "-")
    }
  }

  // 3. 100の位からも借りる
  while (problems.length < 16) {
    const a = Math.floor(Math.random() * 900) + 100
    const b = Math.floor(Math.random() * 900) + 100
    const a1 = a % 10
    const a10 = Math.floor(a / 10) % 10
    const b1 = b % 10
    const b10 = Math.floor(b / 10) % 10
    if (a1 < b1 && a10 < b10 && a > b) {
      pushIfValid(a, b, "-")
    }
  }

  // シャッフル
  for (let i = problems.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[problems[i], problems[j]] = [problems[j], problems[i]]
  }

  return problems
}

function VerticalMix({ a, b, symbol }: Problem) {
  const width = Math.max(a, b).toString().length

  return (
    <div className="inline-block text-[48px] leading-tight font-mono tabular-nums">
      <div className="text-right">{a.toString().padStart(width, " ")}</div>
      <div className="text-right">{symbol + b.toString().padStart(width, " ")}</div>
      <div className="flex justify-end mt-1">
        <div className="border-t border-black" style={{ width: "2.4em" }} />
      </div>
    </div>
  )
}

export default function MixPage() {
  const problems = generateMixedProblems()

  return (
    <main className="mx-auto max-w-5xl p-8 print:p-4 print:max-w-none print:h-[1120px] print:w-[794px]">
      <h1 className="text-center text-[48px] font-bold mb-10">3けたのひっさんスタディ</h1>

      <div className="grid grid-cols-4 gap-x-10 gap-y-[80px] print:gap-x-6">
        {problems.map((p, i) => (
          <div key={i} className="min-h-[140px] print:min-h-[140px] flex items-end">
            <VerticalMix {...p} />
          </div>
        ))}
      </div>
    </main>
  )
}
