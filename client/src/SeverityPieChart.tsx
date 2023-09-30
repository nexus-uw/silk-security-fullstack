import React, { useEffect } from 'react'
import { PieChart } from 'react-minimal-pie-chart'
import { API_URL, severityToColor } from './common'
export const SeverityPieChart = () => {
  const [data, setData] = React.useState([])

  useEffect(() => {
    async function fun() {
      const response = await fetch(`${API_URL}display-grouped-findings-counts`)
      const { data } = await response.json()

      setData(data)
    }
    fun()

  }, [])

  return (
    <PieChart
      data={data.map(({ severity, count }) => ({ title: severity, value: count, color: severityToColor(severity) }))}
      label={({ dataEntry }) => `${dataEntry.title} ${dataEntry.value}`}
      labelStyle={{
        fontSize: '5px',
        fontFamily: 'sans-serif',
      }}
    />
  )
}

