"use client"

import { useEffect, useRef } from "react"

export default function BudgetView({ data }) {
  const chartRef = useRef(null)

  useEffect(() => {
    if (!chartRef.current) return

    const canvas = chartRef.current
    const ctx = canvas.getContext("2d")

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Sample data for the line chart
    const chartData = [4000, 4200, 3800, 4500, 4100, 4300, 4600, 4200, 4400, 4800, 4300, 4167]
    const maxValue = Math.max(...chartData)
    const minValue = Math.min(...chartData) * 0.8

    // Draw line chart
    ctx.beginPath()
    ctx.moveTo(0, canvas.height - ((chartData[0] - minValue) / (maxValue - minValue)) * canvas.height)

    for (let i = 1; i < chartData.length; i++) {
      const x = (i / (chartData.length - 1)) * canvas.width
      const y = canvas.height - ((chartData[i] - minValue) / (maxValue - minValue)) * canvas.height

      // Create a curved line
      if (i === 1) {
        ctx.lineTo(x, y)
      } else {
        const prevX = ((i - 1) / (chartData.length - 1)) * canvas.width
        const prevY = canvas.height - ((chartData[i - 1] - minValue) / (maxValue - minValue)) * canvas.height

        const cpX1 = prevX + (x - prevX) / 3
        const cpX2 = prevX + (2 * (x - prevX)) / 3

        ctx.bezierCurveTo(cpX1, prevY, cpX2, y, x, y)
      }
    }

    // Style the line
    ctx.strokeStyle = "white"
    ctx.lineWidth = 2
    ctx.stroke()

    // Fill area under the line
    ctx.lineTo(canvas.width, canvas.height)
    ctx.lineTo(0, canvas.height)
    ctx.closePath()

    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
    gradient.addColorStop(0, "rgba(255, 255, 255, 0.3)")
    gradient.addColorStop(1, "rgba(255, 255, 255, 0)")
    ctx.fillStyle = gradient
    ctx.fill()
  }, [])

  return (
    <div className="p-4">
      <div className="flex items-center mb-2">
        <button className="text-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <h1 className="text-xl font-bold text-white mx-auto">Budget</h1>
        <button className="text-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      <div className="text-center mt-4">
        <h2 className="text-4xl font-bold text-white">
          $4,167<span className="text-lg">.56</span>
        </h2>
        <p className="text-purple-200 text-sm">June</p>
      </div>

      <div className="mt-4 h-40">
        <canvas ref={chartRef} width={320} height={160} className="w-full h-full" />
      </div>

      <div className="flex justify-between text-xs text-purple-200 px-2 mt-1">
        <span>01</span>
        <span>05</span>
        <span>10</span>
        <span>15</span>
        <span>20</span>
        <span>25</span>
        <span>30</span>
      </div>

      <div className="mt-6 bg-white rounded-lg p-4">
        <div className="flex border-b pb-2">
          <button className="flex-1 text-center font-medium text-purple-600 border-b-2 border-purple-600 pb-2">
            CATEGORIES
          </button>
          <button className="flex-1 text-center font-medium text-gray-400">MERCHANTS</button>
        </div>

        <div className="mt-4 space-y-6">
          {data.budgetCategories.map((category) => (
            <div key={category.name} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${category.bgColor}`}>
                    {category.icon}
                  </div>
                  <div className="ml-3">
                    <h3 className="font-medium">{category.name}</h3>
                    <p className="text-xs text-gray-500">${category.perDay} Per day</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">${category.spent.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">/${category.budget.toLocaleString()}</p>
                </div>
              </div>

              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full ${category.spent > category.budget ? "bg-red-500" : "bg-purple-500"}`}
                  style={{ width: `${Math.min(100, (category.spent / category.budget) * 100)}%` }}
                ></div>
              </div>

              {category.message && <p className="text-xs text-red-500">{category.message}</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

