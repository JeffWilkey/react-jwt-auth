export const getBossIconUrl = (bossName) => {
  switch(bossName) {
    case "Taloc":
      return 'https://wow.zamimg.com/images/wow/icons/medium/achievement_nazmir_boss_talocthecorrupted.jpg'
    case "MOTHER":
      return 'https://wow.zamimg.com/images/wow/icons/medium/achievement_nazmir_boss_mother.jpg'
    case "Fetid Devourer":
      return 'https://wow.zamimg.com/images/wow/icons/medium/achievement_nazmir_boss_fetiddevourer.jpg'
    case "Zek'voz, Herald of N'zoth":
      return 'https://wow.zamimg.com/images/wow/icons/medium/achievement_nazmir_boss_zekvoz.jpg'
    case "Vectis":
      return 'https://wow.zamimg.com/images/wow/icons/medium/achievement_nazmir_boss_bloodofghuun.jpg'
    case "Zul, Reborn":
      return 'https://wow.zamimg.com/images/wow/icons/medium/achievement_nazmir_boss_zul.jpg'
    case "Mythrax the Unraveler":
      return 'https://wow.zamimg.com/images/wow/icons/medium/achievement_nazmir_boss_mythraxtheunraveler.jpg'
    case "G'huun":
      return 'https://wow.zamimg.com/images/wow/icons/medium/achievement_nazmir_boss_ghuun.jpg'
    default:
      return false
  }
}
