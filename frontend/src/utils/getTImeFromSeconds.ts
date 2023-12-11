export function getTimeFromSeconds(sec: number) {
  const hours = Math.floor(sec / 3600)
  const minutes = Math.floor((sec % 3600) / 60)
  const seconds = Math.floor(sec % 60)

  const time = [
    hours,
    minutes > 9 ? minutes : hours ? '0' + minutes : minutes || '0',
    seconds > 9 ? seconds : '0' + seconds,
  ]
    .filter(Boolean)
    .join(':')

  return time
}

export function formatDate(date: string | Date) {
  date = new Date(date)

  date = date.toLocaleDateString('en-EN', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })

  return date
}
