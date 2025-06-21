import React from "react"

export const dynamic = "force-dynamic"

type UnitValue = { cm: number; mm: number }
type Problem = { a: UnitValue; b: UnitValue; symbol: "+" | "-" }

function generateUnitProblems(): Problem[] {
  function randomCmMm(): UnitValue {
    return {
      cm: Math.floor(Math.random() * 20),
      mm: Math.floor(Math.random() * 10),
    }
  }

  const additions: Problem[] = []
  while (additions.length < 8) {
    additions.push({
      a: randomCmMm(),
      b: randomCmMm(),
      symbol: "+",
    })
  }

  const subtractions: Problem[] = []
  while (subtractions.length < 8) {
    const a = randomCmMm()
    const b = randomCmMm()
    const aTotal = a.cm * 10 + a.mm
    const bTotal = b.cm * 10 + b.mm
    if (aTotal < bTotal) continue
    subtractions.push({ a, b, symbol: "-" })
  }

  const all = [...additions, ...subtractions]

  // シャッフル
  for (let i = all.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[all[i], all[j]] = [all[j], all[i]]
  }

  return all
}

function formatUnit({ cm, mm }: UnitValue): string {
  let result = ""
  if (cm > 0) result += `${cm}cm`
  if (mm > 0 || result === "") result += `${mm}mm`
  return result
}

export default function MixPage() {
  const problems = generateUnitProblems()
  const left = problems.slice(0, 8)
  const right = problems.slice(8)

  return (
    <main className="mx-auto max-w-4xl p-8 print:p-4 print:max-w-none print:h-[1120px] print:w-[794px] print:grid print:grid-rows-9 print:grid-cols-2 print:gap-y-0 print:gap-x-16 whitespace-nowrap text-[26px] font-mono leading-normal h-[1120px] grid grid-rows-9 grid-cols-2 gap-x-16">
      {/* Title */}
      <div className="col-span-2 flex justify-center items-end text-[36px] font-bold mb-2">cmとmmの計算</div>

      {/* Problems */}
      {Array.from({ length: 8 }).map((_, i) => (
        <React.Fragment key={i}>
          <div>{`${formatUnit(left[i].a)} ${left[i].symbol} ${formatUnit(left[i].b)} =`}</div>
          <div>{`${formatUnit(right[i].a)} ${right[i].symbol} ${formatUnit(right[i].b)} =`}</div>
        </React.Fragment>
      ))}
    </main>
  )
}
