export default async function(to, from, savedPosition) {
  // console.log(from, savedPosition, savedPosition && from.name == 'info', savedPosition.y - window.innerHeight);
  if (savedPosition && from.name == 'info') {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(savedPosition)
      }, 10)
    })
  }
  if (to.name == "info") {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ x: 0, y: 0 })
      }, 10)
    })
  }
  if (from.name == "index") return false
  if (from.name.includes('-all') && to.name.includes('-all')) {
    // if (from.name == 'projects-all' && to.name == 'projects-all') {
    if (savedPosition) return savedPosition
    else return false
  } else if (savedPosition) return savedPosition
  else return { x: 0, y: 0 }
  // return false
}