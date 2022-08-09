import {
  gsap,
  Flip
} from "gsap/all";
if (process.client) {
  gsap.registerPlugin(Flip);
}

export default {
  name: "test",
  css: false,
  mode: 'out-in',
  enter(el, done) {
    const overlay = document.querySelector('.page-overlay')
    gsap.fromTo(overlay, {
      opacity: 1
    }, {
      opacity: 0,
      duration: 1,
      onComplete: done
    })
  },
  leave(el, done) {
    const clickedEl = el.querySelector('.grid-item.clicked')
    if (!clickedEl) {
      done()
      return
    }
    const inner = clickedEl.querySelector('.grid-item-inner')
    const clone = inner.cloneNode(true)
    const originalStyle = window.getComputedStyle(inner);
    const innerRect = inner.getBoundingClientRect()
    clone.classList.add('clone')
    gsap.set(clone, {
      position: "absolute",
      width: innerRect.width,
      height: innerRect.height,
      x: innerRect.x + 'px',
      y: clickedEl.offsetTop + 13 + 'px',
      opacity: 1
    })
    clickedEl.before(clone)
    const state = Flip.getState(clone);
    gsap.set(clone, {
      width: '100vw',
      height: inner.getAttribute("target-height"),
      top: 0,
      left: 0,
      x: 0,
      y: 0,
      zIndex: 10,
      position: 'fixed',
      borderRadius: 0,
      opacity: 1
    })
    Flip.from(state, {
      duration: 0.625,
      ease: "power4.out",
      onComplete: done
    });
    clone.classList.add('is-transitioning')
    inner.style.opacity = 0
    const overlay = document.querySelector('.page-overlay')
    gsap.to(overlay, {
      opacity: 1,
      duration: 1,

    })
    // console.log(clone);
  }
}