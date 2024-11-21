<template>
  <a-config-provider :locale="locale">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout> 
  </a-config-provider>
</template>

<script>
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css";
import zhCN from 'ant-design-vue/es/locale/en_US';
import localeData from 'dayjs/plugin/localeData';
import dayjs from 'dayjs';
dayjs.extend(localeData);
// Set the global locale for dayjs
dayjs.locale('zh-cn');

export default {
  data() {
    return {
      locale: zhCN, // This is passed to the Ant Design Vue ConfigProvider
    };
  },
};
</script>
 