import React from 'react'
import logo from './logo.svg'
import './App.css'
import { SeverityPieChart } from './SeverityPieChart'
import { GroupedFindingsTable } from './GroupedFindingsTable'

function App() {
  return (
    <div className="App">
      <GroupedFindingsTable></GroupedFindingsTable>
      <SeverityPieChart></SeverityPieChart>
    </div>
  )
}

export default App
