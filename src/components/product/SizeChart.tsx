'use client'

import { useState } from 'react'

// Gelato Unisex Staple T-Shirt (Bella + Canvas 3001 / Stanley/Stella STTU755)
// Measurements in inches (chest = full circumference / 2, i.e. half-chest)
// Source: Gelato product spec sheet
const SIZES = [
  { size: 'XS',   chest: '16.5', length: '27',   sleeve: '15.5' },
  { size: 'S',    chest: '18',   length: '28',   sleeve: '16.5' },
  { size: 'M',    chest: '20',   length: '29',   sleeve: '17.5' },
  { size: 'L',    chest: '22',   length: '30',   sleeve: '18.5' },
  { size: 'XL',   chest: '24',   length: '31',   sleeve: '19.5' },
  { size: '2XL',  chest: '26',   length: '32',   sleeve: '20.5' },
  { size: '3XL',  chest: '28',   length: '33',   sleeve: '21.5' },
]

type Unit = 'in' | 'cm'

function inToCm(val: string): string {
  return (parseFloat(val) * 2.54).toFixed(1)
}

export default function SizeChart() {
  const [open, setOpen] = useState(false)
  const [unit, setUnit] = useState<Unit>('in')

  const convert = (val: string) => unit === 'cm' ? inToCm(val) : val

  return (
    <div className="mt-4">
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-2 text-sm font-medium transition-colors"
        style={{ color: 'var(--color-primary)' }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 6h18M3 12h18M3 18h18"/>
        </svg>
        Size Guide
        <span style={{ fontSize: 11, color: 'var(--color-text-muted)' }}>
          {open ? '▲' : '▼'}
        </span>
      </button>

      {open && (
        <div className="mt-3 rounded-xl overflow-hidden border"
          style={{ borderColor: 'var(--color-border)' }}>

          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3"
            style={{ backgroundColor: 'var(--color-surface)' }}>
            <span className="text-xs font-semibold tracking-wider uppercase"
              style={{ color: 'var(--color-text-muted)' }}>
              All measurements are half-chest
            </span>
            {/* Unit toggle */}
            <div className="flex rounded-full overflow-hidden border text-xs"
              style={{ borderColor: 'var(--color-border)' }}>
              {(['in', 'cm'] as Unit[]).map(u => (
                <button
                  key={u}
                  onClick={() => setUnit(u)}
                  className="px-3 py-1 transition-colors"
                  style={{
                    background: unit === u ? 'var(--color-primary)' : 'transparent',
                    color: unit === u ? 'var(--color-canvas)' : 'var(--color-text-muted)',
                    fontWeight: unit === u ? 600 : 400,
                  }}
                >
                  {u}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface)' }}>
                  {['Size', `Chest (${unit})`, `Length (${unit})`, `Sleeve (${unit})`].map(h => (
                    <th key={h} className="px-4 py-2 text-left text-xs font-semibold tracking-wide"
                      style={{ color: 'var(--color-text-muted)', whiteSpace: 'nowrap' }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {SIZES.map((row, i) => (
                  <tr key={row.size}
                    style={{
                      borderBottom: i < SIZES.length - 1 ? '1px solid var(--color-border)' : 'none',
                      backgroundColor: i % 2 === 0 ? 'transparent' : 'rgba(0,0,0,0.02)',
                    }}>
                    <td className="px-4 py-2.5 font-semibold text-xs"
                      style={{ color: 'var(--color-text-dark)' }}>{row.size}</td>
                    <td className="px-4 py-2.5 text-xs"
                      style={{ color: 'var(--color-text-dark)' }}>{convert(row.chest)}</td>
                    <td className="px-4 py-2.5 text-xs"
                      style={{ color: 'var(--color-text-dark)' }}>{convert(row.length)}</td>
                    <td className="px-4 py-2.5 text-xs"
                      style={{ color: 'var(--color-text-dark)' }}>{convert(row.sleeve)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* How to measure */}
          <div className="px-4 py-3 text-xs leading-relaxed"
            style={{ borderTop: '1px solid var(--color-border)', color: 'var(--color-text-muted)', backgroundColor: 'var(--color-surface)' }}>
            <span className="font-semibold" style={{ color: 'var(--color-text-dark)' }}>How to measure: </span>
            <span className="mr-4"><strong>Chest</strong> — measure across your chest just below the armpits.</span>
            <span className="mr-4"><strong>Length</strong> — from the back of the neck to the hem.</span>
            <span><strong>Sleeve</strong> — from the shoulder seam to the cuff.</span>
          </div>
        </div>
      )}
    </div>
  )
}
