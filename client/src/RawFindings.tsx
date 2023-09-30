import Table from 'rc-table'
import React, { useEffect } from 'react'
import { API_URL, severityToColor } from './common'

declare type RawFinding = any // todo types

export const RawFindings = ({ groupedFindingsId }: { groupedFindingsId: string }) => {
  const [data, setData] = React.useState([] as RawFinding[])

  useEffect(() => {
    async function fun() {
      const response = await fetch(`${API_URL}display-findings/${groupedFindingsId}`)
      const { data } = await response.json()

      setData(data)
    }
    fun()

  }, [])

  return (
    <Table
      caption="Raw Findings"
      columns={[{
        title: 'Id',
        dataIndex: 'id',
        key: 'id'
      },
      {
        title: 'Source Name',
        dataIndex: 'source_security_tool_name',
        key: 'source_security_tool_name'
      },
      {
        title: 'Source Id',
        dataIndex: 'source_security_tool_id',
        key: 'source_security_tool_id'
      },

      {
        title: 'Source Collaboration Tool Name',
        dataIndex: 'source_collaboration_tool_name',
        key: 'source_collaboration_tool_name'
      },
      {
        title: 'Source Collaboration Tool Id',
        dataIndex: 'source_collaboration_tool_id',
        key: 'source_collaboration_tool_id'
      },
      {
        title: 'Severity',
        dataIndex: 'severity',
        key: 'severity',
        render: (severity) => <span style={{ backgroundColor: severityToColor(severity) }}> {severity}</span>
      }, {
        title: 'Finding Created',
        dataIndex: 'finding_created',
        key: 'finding_created',
      },
      {
        title: 'Ticket Created',
        dataIndex: 'ticket_created',
        key: 'ticket_created',
      },
      {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
      },
      {
        title: 'Asset',
        dataIndex: 'asset',
        key: 'asset',
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
      },
      { // covered by Remediation
        title: 'Remediation',
        key: 'description',
        render: (value, record, index) => (<a href={value['remediation_url']} target='_href'>{value['remediation_text']}</a >)


      },


      ]}

      data={data.map(f => ({ ...f, key: f.id }))}
    ></Table >
  )

}