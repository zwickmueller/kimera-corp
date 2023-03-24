<template>
  <div ref="container" class="container">
    <div v-for="item in items" :key="item.id" class="item">
      {{ item.content }}
    </div>
    <button @click="filterItems">as</button>
  </div>
</template>

<script>
import { gsap, Flip } from "gsap/all";
if (process.client) {
  gsap.registerPlugin(Flip);
}

export default {
  data() {
    return {
      items: [
        { id: 1, content: "Item 1", visible: true },
        { id: 2, content: "Item 2", visible: true },
        { id: 3, content: "Item 3", visible: true },
        { id: 4, content: "Item 4", visible: true },
      ],
      containerHeight: null,
    };
  },
  methods: {
    filterItems() {
      const that = this;
      // Get the final height of the container
      this.$refs.container.style.height = "auto";
      this.containerHeight = this.$refs.container.offsetHeight;

      // Filter the items using a custom method
      this.items.forEach((item) => {
        item.visible = this.shouldShowItem(item);
      });

      // Start the FLIP animation inside a nextTick() call
      this.$nextTick(() => {
        this.$refs.container.querySelectorAll(".item").forEach((el) => {
          gsap.fromTo(
            el,
            { position: "relative", opacity: 1 },
            Flip({
              el,
              duration: 0.5,
              ease: "power2.out",
              scale: false,
              opacity: false,
            })
          );
        });
        gsap
          .to(this.$refs.container, {
            height: this.containerHeight,
            duration: 0.5,
            ease: "power2.out",
            onComplete: () => {
              // Restore the original positions and opacity of the filtered items
              this.$refs.container.querySelectorAll(".item").forEach((el) => {
                el.style.position = "";
                el.style.opacity = "";
              });
            },
          })
          .then(() => {
            // Restore the original positions and opacity of the filtered items
          });
      });

      // Animate the height of the container
    },
    shouldShowItem(item) {
      console.log(Boolean(item.id % 2));
      return Boolean(item.id % 2);
      //   item.style.display = item.id % 2 ? "none" : "flex";
      // Your custom logic to determine if an item should be visible or not
    },
  },
};
</script>

<style>
.container {
  display: flex;
  flex-wrap: wrap;
}
.item {
  flex: 1 1 200px;
  height: 100px;
  margin: 10px;
  background-color: #ccc;
}
</style>
