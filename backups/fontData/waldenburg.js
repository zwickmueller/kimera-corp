import { MakeFontFamily } from './fontDataHelpers.js'

const name = "Waldenburg"

const Waldenburg = {
  name: name,
  fontDir: `/fonts/${name}/`,
  fontFamilies: [
    MakeFontFamily(name, 375, "Buch"),
    MakeFontFamily(name, 500, "Halbfett"),
    MakeFontFamily(name, 700, "Fett"),

  ]


}

export default Waldenburg