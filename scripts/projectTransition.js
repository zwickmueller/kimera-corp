import { gsap, Flip } from "gsap/all";
if (process.client) {
  gsap.registerPlugin(Flip);
}

export default {
  data() {
    return {
      clickedEl: "",
    };
  },
  name: "test",
  css: false,
  mode: "out-in",
  enter(el, done) {
    // console.log("enter");
    this.$store.commit("setIsPageTransitioning", true);
    let that = this;

    const overlay = document.querySelector(".page-overlay");
    gsap.fromTo(
      overlay,
      {
        opacity: 1,
      },
      {
        opacity: 0,
        duration: 1,
        onStart: () => {
          that.$store.commit("setIsPageTransitioning", false);
        },
        onComplete: () => {
          done();
        },
      }
    );
  },
  beforeLeave(el) {
    // console.log("beforeLeave");
    this.clickedEl = el.querySelector(".grid-item.clicked");
    // console.log("ASDASD ASD ASD ASD A", el, this.clickedEl);
  },
  leave(el, done) {
    // console.log("leave");
    // const clickedEl = el.querySelector('.grid-item.clicked')
    const clickedEl = el.querySelector(".grid-item.clicked");
    // const clickedEl = this.clickedEl
    // console.log(this.clickedEl, clickedEl);
    // console.log("clickedEl ", clickedEl);
    // debugger
    this.$store.commit("setIsPageTransitioning", true);

    if (clickedEl && clickedEl.dataset.newWidth != "null") {
      // gsap.set(clickedEl, { opacity: 0 })
      this.$helpers.removeClassByPrefix(clickedEl, "project-width-");
      clickedEl.classList.add(clickedEl.dataset.newWidth);
    } else if (clickedEl) {
      this.$helpers.removeClassByPrefix(clickedEl, "project-width-");
      clickedEl.classList.add(clickedEl.dataset.originalWidth);
      // debugger
    }
    // gsap.delayedCall(0, () => {
    if (!clickedEl) {
      done();
      this.$store.commit("setIsPageTransitioning", false);
      return;
    }

    // console.log(this.$root, "this.$root");
    // console.log(this.$store, "this.$store");
    // setTimeout(() => {

    let that = this;

    let batch = Flip.batch("id");
    const inner = clickedEl.querySelector(".grid-item-inner");
    const clone = inner.cloneNode(true);
    clone.classList.add("clone");

    const innerRect = inner.getBoundingClientRect();
    // console.log(innerRect);
    gsap.set(clone, {
      position: "absolute",
      width: innerRect.width,
      height: innerRect.height,
      x: innerRect.x + "px",
      y: clickedEl.offsetTop + 13 + "px",
      opacity: 1,
    });
    clickedEl.before(clone);
    let action = batch.add({
      getState(self) {
        // const originalStyle = window.getComputedStyle(inner);
        return Flip.getState(clone);
      },
      animate(self) {
        Flip.from(self.state, {
          // duration: 5,
          duration: 0.625,
          ease: "power4.out",
          onComplete: () => {
            batch.kill();
            that.$store.commit("setIsPageTransitioning", false);

            done();
          },
        });
      },
      once: true, // removes the action from its batch when animate() is called
    });
    // console.log("BATCH ", batch);

    // const state = Flip.getState(clone);
    batch.getState();
    gsap.set(clone, {
      width: "100vw",
      height:
        window.innerWidth < 769 ? "60vh" : inner.getAttribute("target-height"),
      top: 0,
      left: 0,
      x: 0,
      y: 0,
      zIndex: 10,
      position: "fixed",
      borderRadius: 0,
      opacity: 1,
    });

    this.$nextTick(() => {
      // Flip.from(state, {
      //   duration: 5,
      //   // duration: 0.625,
      //   ease: "power4.out",
      //   onComplete: done
      // });
      batch.run(true);
      clone.classList.add("is-transitioning");
      inner.style.opacity = 0;
      const overlay = document.querySelector(".page-overlay");
      gsap.to(overlay, {
        opacity: 1,
        duration: 1,
      });
    });
    // })

    // }, 1)
    // console.log(clone);
  },
};
