<template>
  <div>
    <Project :data="projectData" />
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";
import { projectApi } from "~/service/project"; // Adjust the path to your API module
import { message } from "ant-design-vue";
import Project from "../../../../components/layout/dashboard/index.vue";
const route = useRoute();
const projectId = route.params.id; // Assumes `id` is defined in the route params
const projectData = ref<any>(null); // Allow any type for nested and complex data

// Fetch project data
const fetchProjectData = async () => {
  try {
    console.log("Fetching project data for ID:", projectId);
    const response = await projectApi.getOne(projectId.toString());
    // console.log("Fetched Data:", response.data);
    projectData.value = response.data;
  } catch (error) {
    console.error("Error fetching project data:", error);
    message.error("Failed to fetch project data.");
  }
};

// Fetch project data on component mount
onMounted(fetchProjectData);
</script>
