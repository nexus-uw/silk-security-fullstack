import Table from 'rc-table'
import React, { useEffect } from 'react'
import { Line } from 'rc-progress'
import { API_URL, severityToColor } from './common'
import { RawFindings } from './RawFindings'

declare type GroupedFindings = any // todo better typings

export const GroupedFindingsTable = () => {
  const [groupedFindings, setGroupedFindings] = React.useState([] as GroupedFindings[])
  const [expandedRowKeys, setExpandedRowKeys] = React.useState([])
  function CustomExpandIcon(props: any) {
    let text
    if (props.expanded) {
      text = '&#8679;'
    } else {
      text = '&#8681;'
    }
    return (
      <a
        className="expand-row-icon"
        onClick={e => {
          props.onExpand(props.record, e)
        }}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: text }}
        style={{ color: 'blue', cursor: 'pointer' }}
      />
    )
  }

  const onExpand = (expanded: any, record: any) => {
    // eslint-disable-next-line no-console
    console.log('onExpand', expanded, record)

  }

  const onExpandedRowsChange = (rows: readonly React.Key[]) => {
    setExpandedRowKeys(rows as any)
  }
  useEffect(() => {
    async function fun() {
      const response = await fetch(`${API_URL}display-grouped-findings`)
      const { data } = await response.json()

      setGroupedFindings(data)
    }
    fun()

  }, [])
  return (
    <Table
      caption="Grouped Findings"
      columns={[{
        title: 'Id',
        dataIndex: 'id',
        key: 'id'
      },
      // for sample data all grouping_type are remediation + grouping key are aws links,
      // so making assumption here
      // {
      //   title: 'Grouping Type',
      //   dataIndex: 'grouping_type',
      //   key: 'grouping_type'
      // },
      {
        title: 'Remediation',
        dataIndex: 'grouping_key',
        key: 'grouping_key',
        render: (gk) => <a href={gk} target='_blank'> {gk}</a>
      },
      {
        title: 'Severity',
        dataIndex: 'severity',
        key: 'severity',
        render: (severity) => <span style={{ backgroundColor: severityToColor(severity) }}> {severity}</span>
      }, {
        title: 'Finding Created',
        dataIndex: 'grouped_finding_created',
        key: 'grouped_finding_created',

      },
      {
        title: 'SLA',
        dataIndex: 'sla',
        key: 'sla',

      },
      // { // covered by Remediation
      //   title: 'description',
      //   dataIndex: 'description',
      //   key: 'description',

      // },
      {
        title: 'Security Analyst',
        dataIndex: 'security_analyst',
        key: 'security_analyst',

      },
      {
        title: 'Owner',
        dataIndex: 'owner',
        key: 'owner',

      },
      {
        title: 'Workflow',
        dataIndex: 'workflow',
        key: 'workflow',

      },
      // omitted since all are in progress
      // {
      //   title: 'Status',
      //   dataIndex: 'status',
      //   key: 'status',

      // },
      {
        title: 'Progress',
        dataIndex: 'progress',
        key: 'progress',
        render: (progress) => <Line percent={progress * 100} strokeWidth={4} strokeColor="#D3D3D3"></Line>

      }

      ]}
      expandable={{
        expandRowByClick: true,
        expandedRowKeys,
        onExpandedRowsChange,
        expandedRowRender: (record, index, indent, expanded) =>
          expanded ? <RawFindings groupedFindingsId={record.id} ></RawFindings> : null,
        onExpand,
        expandIcon: CustomExpandIcon,
      }}
      data={groupedFindings.map(f => ({ ...f, key: f.id }))}
    ></Table >
  )
}