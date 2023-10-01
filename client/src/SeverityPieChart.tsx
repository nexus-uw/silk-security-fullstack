import React, { useEffect } from 'react'
import { PieChart } from 'react-minimal-pie-chart'
import { API_URL, severityToColor } from './common'
import { LoadingMessage } from './LoadingMessage'
import { ErrorMessage } from './ErrorMessage'
export const SeverityPieChart = () => {
  const [data, setData] = React.useState([])
  const [loadingState, setLoadingState] = React.useState({ loading: false, error: false })


  useEffect(() => {
    setLoadingState({ loading: true, error: false })

    async function fun() {
      try {
        const response = await fetch(`${API_URL}display-grouped-findings-counts`)
        const { data } = await response.json()

        setData(data)
        setLoadingState({ loading: false, error: false })
      }
      catch (e) {
        setLoadingState({ loading: false, error: true })
        console.error('failed to load piechart data: ' + e)
      }

    }
    fun()

  }, [])

  if (loadingState.loading) {
    return <LoadingMessage></LoadingMessage>
  } else if (loadingState.error) {
    return <ErrorMessage></ErrorMessage>
  }

  return (
    <PieChart
      data={data.map(({ severity, count }) => ({ title: severity, value: count, color: severityToColor(severity) }))}
      label={({ dataEntry }) => `${dataEntry.title} ${dataEntry.value}`}
      labelStyle={{
        fontSize: '5px',

      }}
      animate={true}
      style={{ maxHeight: '250px' }}
      startAngle={180}
    />
  )
}

