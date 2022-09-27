import { MakeFontFamily } from './fontDataHelpers.js'

const name = "Melange"

const Melange = {
  name: name,
  fontDir: `/fonts/${name}/`,
  fontFamilies: [
    MakeFontFamily(name + "Neue", 100, "Hairline"),
    MakeFontFamily(name + "Neue", 150, "Thin"),
    MakeFontFamily(name + "Neue", 200, "Light"),
    MakeFontFamily(name + "Neue", 300, "Book"),
    MakeFontFamily(name + "Neue", 400, "Regular"),
    MakeFontFamily(name + "Neue", 450, "Medium"),
    MakeFontFamily(name + "Neue", 500, "SemiBold"),
    MakeFontFamily(name + "Neue", 600, "Bold"),
    MakeFontFamily(name + "Neue", 700, "ExtraBold"),
    MakeFontFamily(name + "Neue", 800, "Black"),
    MakeFontFamily(name + "Neue", 900, "ExtraBlack"),

  ]


}

export default Melange