const months = [
  "januari",
  "februari",
  "mars",
  "april",
  "maj",
  "juni",
  "juli",
  "augusti",
  "september",
  "oktober",
  "november",
  "december",
]

export default function (d: Date) {
  const dd = d.getDate()
  const mn = d.getMonth()
  return `${dd} ${months[mn]}`
}
