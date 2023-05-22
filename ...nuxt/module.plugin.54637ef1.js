/* eslint-disable */

import Vue from 'vue'
import { StoryblokVue, useStoryblokApi, useStoryblokBridge } from "@storyblok/nuxt-2";

import { apiPlugin } from "@storyblok/nuxt-2";

export default (ctx, inject) => {
  const { app, store } = ctx

  Vue.use(StoryblokVue, {
    accessToken: "YwkxX7UXlj9Wd7lngwwrbAtt",
    bridge: true,
    apiOptions: {},

    use: [apiPlugin]
  });

  const api = useStoryblokApi()

  inject('storyapi', api)
  inject('storybridge', useStoryblokBridge)
}
