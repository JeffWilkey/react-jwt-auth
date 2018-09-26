export const getQualityColor = (quality) => {
  switch(quality) {
    case 6:
      return '#e6cc80'
    case 5:
      return '#ff8000'
    case 4:
      return '#a335ee'
    case 3:
      return '#0070dd'
    case 2:
      return '#1eff00'
    case 1:
      return '#ffffff'
    default:
      return '#9d9d9d'
  }
}
