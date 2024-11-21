<template>
  <div>
    <a-tabs v-model:activeKey="activeKey" :size="size">
      <a-tab-pane key="1" tab="Detail">
        <project v-model:data="projectDetail" />
      </a-tab-pane>
      <a-tab-pane key="2" tab="Information">
        <projectInfo v-model:data="projectDetail.projectInfos" />
      </a-tab-pane>
      <a-tab-pane key="3" tab="Milestone">
        <milestoneForm v-model:data="projectDetail.milestones" />
      </a-tab-pane>
      <a-tab-pane key="4" tab="User">
        <userForm v-model:data="projectDetail.user" />
      </a-tab-pane>
    </a-tabs>
    <button @click="handleSubmit">Save</button>
  </div>
</template>

<script lang="ts">
import { reactive, defineComponent, watch } from "vue";
import type { Project, TabsProps } from "../interface/project/project-interface";
import projectInfo from "./project/forms/project-info.vue";
import project from "./project/forms/project.vue";
import milestoneForm from "./project/forms/milestone-form.vue";
import userForm from "./project/forms/user-form.vue";

export default defineComponent({
  name: "Project",
  components: {
    projectInfo,
    project,
    milestoneForm,
    userForm,
  },
  props: {
    data: {
      type: Object as () => Project,
      required: true,
    },
  },
  setup(props) {
    const size = ref<TabsProps["size"]>("small");
    const activeKey = ref("1");

    const projectDetail = reactive<Project>({
      id: "",
      title: "",
      description: "",
      budget: 0,
      status: "",
      phase: "",
      serial_number: "",
      deadline: new Date(),
      approved: false,
      active: false,
      start_date: null,
      end_date: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      services: [],
      milestones: [],
      projectInfos: [],
      user: [],
    });

    watch(
      () => props.data,
      (project) => {
        if (project) {
          Object.assign(projectDetail, project); // Deep merge new data
        }
      },
      { immediate: true, deep: true }
    );

    const handleSubmit = () => {
      console.log("Updated Project Detail:", projectDetail);
      // Add logic to save projectDetail to the server
    };

    return {
      projectDetail,
      activeKey,
      size,
      handleSubmit,
    };
  },
});
</script>

