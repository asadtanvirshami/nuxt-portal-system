<template>
  <ag-grid-vue
    :rowData="rowData"
    :columnDefs="colData"
    style="height: 500px"
    class="ag-theme-quartz"
    @cellValueChanged="onCellValueChanged"
  />
</template>

<script lang="ts">
import { ref, defineComponent, watch } from "vue";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridVue } from "ag-grid-vue3";
import { useRouter } from "vue-router"; // Import useRouter to navigate

interface TableRow {
  id: string;
  title: string;
  description: string;
  budget: number;
  status: string;
  phase: string;
  serial_number: string;
  deadline: Date;
  approved: boolean;
  active: boolean;
  start_date: Date | null;
  end_date: Date | null;
  user: any;
  services: any;
  milestones: any;
  projectInfos: any;
  createdAt: Date;
  updatedAt: Date;
}

export default defineComponent({
  name: "DataTable",
  components: {
    AgGridVue,
  },
  props: {
    data: {
      type: Object,
      required: true,
      default: () => ({ data: [] }),
    },
  },

  setup(props) {
    const rowData = ref<TableRow[]>([]);
    const colData = ref<any[]>([]);
    const router = useRouter(); // Initialize the router

    const capitalize = (str: string) =>
      str.charAt(0).toUpperCase() + str.slice(1);

    const cellStyle = (params: any) => {
      if (
        params.colDef.field === "active" ||
        params.colDef.field === "approved"
      ) {
        return { color: params.value ? "green" : "red" };
      }
      return null;
    };

    const onCellValueChanged = (event: any) => {
      console.log(
        rowData.value,
        `Cell changed: ${event.colDef.field}, New Value: ${event.newValue}`
      );
    };

    const navigateToProject = (projectId: string) => {
      console.log("Navigating to project:", projectId);
      router.push({ path: `/protected-route/dashboard/project/${projectId}` });
    };

    watch(
      () => props.data,
      (newData) => {
        if (newData && Array.isArray(newData.data)) {
          rowData.value = newData.data.map((row: TableRow) => {
            const {
              projectInfos,
              milestones = [],
              services = [],
              ...rest
            } = row;
            return {
              ...rest,
              milestones:
                milestones.length > 0 ? milestones.length : "No milestones",
              services: services.length > 0 ? services.length : "No services",
            };
          });

          if (rowData.value.length > 0) {
            colData.value = Object.keys(rowData.value[0]).map((key) => ({
              field: key,
              headerName: capitalize(key),
              cellStyle: cellStyle,
              editable: true,
            }));

            // Add a new column for the "View" button
            colData.value.push({
              headerName: "View",
              field: "view",
              cellRenderer: (params: any) => {
                const button = document.createElement("button");
                button.className =
                  "bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 w-full";
                button.innerText = "View";
                button.onclick = () => {
                  navigateToProject(params.data.id);
                };
                return button;
              },
            });
          } else {
            colData.value = [];
          }
        } else {
          console.error(
            "Expected an array for rowData, but received:",
            newData
          );
          rowData.value = [];
          colData.value = [];
        }
      },
      { immediate: true }
    );

    return {
      rowData,
      colData,
      onCellValueChanged,
    };
  },
});
</script>
