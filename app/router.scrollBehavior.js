export default function(to, from, savedPosition) {
  console.log(from);
  if (from.name == "index") return false
  if (from.name == 'projects-all' && to.name == 'projects-all') {
    if (savedPosition) return savedPosition
    else return false
  } else if (savedPosition) return savedPosition
  else return { x: 0, y: 0 }
  // return false
}