export const getIlvlColor = (ilvl) => {
  if (ilvl >= 340) {
    return {
      backgroundColor: '#a335ee',
      color: '#fff'
    }
  } else if (ilvl >= 325) {
    return {
      backgroundColor: '#0070dd',
      color: '#fff'
    }
  } else if (ilvl >= 300) {
    return {
      backgroundColor: '#1eff00',
      color: '#fff'
    }
  } else {
    return {
      backgroundColor: '#444',
      color: '#000'
    }
  }
}
