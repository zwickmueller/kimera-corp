export default function(to, from, savedPosition) {
  console.log(from);
  // const findEl = async (hash, x = 0) => {
  //   return (
  //     document.querySelector(hash) ||
  //     new Promise(resolve => {
  //       if (x > 50) {
  //         return resolve(document.querySelector("#app"));
  //       }
  //       setTimeout(() => {
  //         resolve(findEl(hash, ++x || 1));
  //       }, 100);
  //     })
  //   );
  // };
  // if (to.hash == '#') {
  //   if ("scrollBehavior" in document.documentElement.style) {
  //     return window.scrollTo({ left: 0, top: 0, behavior: "smooth" })
  //   } else {
  //     return window.scrollTo(0, 0);
  //   }
  //
  //
  // }
  // if (to.hash) {
  //   console.log(to.hash);
  //   let el = document.querySelector(to.hash);
  //   console.log(el.offsetTop);
  //   // let el = await findEl(to.hash);
  //   if ("scrollBehavior" in document.documentElement.style) {
  //     return window.scrollTo({ top: el.getBoundingClientRect().top, behavior: "smooth" });
  //   } else {
  //     return window.scrollTo(0, el.getBoundingClientRect().top);
  //   }
  // }
  if (from.name == "index") return false
  if (from.name.includes('-all') && to.name.includes('-all')) {
    // if (from.name == 'projects-all' && to.name == 'projects-all') {
    if (savedPosition) return savedPosition
    else return false
  } else if (savedPosition) return savedPosition
  else return { x: 0, y: 0 }
  // return false
}