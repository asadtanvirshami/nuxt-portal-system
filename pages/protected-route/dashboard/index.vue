<template>
  <div>
    <!-- Pass the fetched data to the dataTable component as a prop -->
    <div>
      <dataTable :data="tableData" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { message } from "ant-design-vue"; // For showing success or error notifications
import { projectApi } from "~/service/project"; // Adjust the path to your API module

// Interface for table data
interface TableRow {
  data: any[];
}

definePageMeta({
  layout: "default", // Ensures the default layout is used
});

export default defineComponent({
  name: "DashboardPage",
  setup() {
    const tableData = ref<TableRow[]>([]);
    const loading = ref(false);

    // Fetch data from API
    const fetchTableData = async () => {
      try {
        loading.value = true;
        const response = await projectApi.get();
        tableData.value = response.data;
        message.success("Data loaded successfully!");
        console.log("Table Data:", tableData.value);
      } catch (error) {
        console.error("Error fetching table data:", error);
        message.error("Failed to load data. Please try again.");
      } finally {
        loading.value = false;
      }
    };

    // Fetch data on component mount
    onMounted(() => {
      fetchTableData();
    });

    return {
      tableData,
      loading,
    };
  },
});
</script>
