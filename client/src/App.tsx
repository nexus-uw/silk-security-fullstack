import React from 'react'
import './App.css'
import { SeverityPieChart } from './SeverityPieChart'
import { GroupedFindingsTable } from './GroupedFindingsTable'

function App() {
  return (
    <div className="App">
      <h1>simon ramsay silk security dashboard</h1>
      <h2>security findings grouped by severity</h2>
      <SeverityPieChart></SeverityPieChart>
      <h2>grouped findings list.</h2>
      <h3> click a row to see the raw findings in the group</h3>
      <GroupedFindingsTable></GroupedFindingsTable>
    </div>
  )
}

export default App
