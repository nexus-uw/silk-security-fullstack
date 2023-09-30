export const API_URL = 'http://localhost:3000/api/v1/'

export function severityToColor(severity: string): string {
  switch (severity) {
    case 'low':
      return '#ffff00'
    case 'medium':
      return '#ffa500'
    case 'high':
      return '#800000'
    case 'critical':
      return '#ff0f0f'
    default:
      console.warn(`severityToColor(): unexpected severity ${severity}`)
      return '#808080'
  }
}