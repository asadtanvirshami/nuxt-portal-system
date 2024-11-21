import { defineNuxtPlugin } from "#app";
import Antd from "ant-design-vue";
import enUS from "ant-design-vue/es/locale/en_US"; // Locale for Ant Design Vue
import dayjs from "dayjs";
import "dayjs/locale/en"; // Locale for Day.js

// Set the locale for Day.js globally
dayjs.locale("en");

export default defineNuxtPlugin((nuxtApp) => {
  // Use Ant Design Vue globally
  nuxtApp.vueApp.use(Antd);

  // Provide the Ant Design locale globally
  nuxtApp.provide("antdLocale", enUS);
});
