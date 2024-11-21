<template>
  <a-form v-for="(project, index) in data" :key="index">
    <a-form-item label="Meeting Link">
      <a-input
        v-model:value="project.meeting_link"
        placeholder="Enter Meeting Link"
      />
    </a-form-item>
    <a-form-item label="PM Name">
      <a-input
        v-model:value="project.project_manager_name"
        placeholder="Enter PM Name"
      />
    </a-form-item>
    <a-form-item label="PM Email">
      <a-input
        v-model:value="project.project_manager_email"
        placeholder="Enter PM Email"
      />
    </a-form-item>
    <a-form-item label="PM Contact">
      <a-input
        v-model:value="project.project_manager_phone"
        placeholder="Enter PM Contact"
      />
    </a-form-item>
    <a-form-item label="Project Completion">
      <a-input
        type="number"
        v-model:value="project.completion_percentage"
        placeholder="Enter Project Completion"
      />
    </a-form-item>
    <a-form-item label="Note">
      <a-textarea
        type="text"
        v-model:value="project.note"
        placeholder="Enter Note"
      />
    </a-form-item>
  </a-form>
  <a-divider type="horizontal" />
  <div class="flex items-center">
    <div>
      <h1 class="text-xl mb-5">Links</h1>
      <a-form
        class="link flex w-full gap-5"
        @submit.prevent="addLinkToProject(selectedProjectIndex)"
      >
        <a-form-item label="Key">
          <a-input
            id="key"
            v-model:value="dynamicKey"
            placeholder="Enter key"
          />
        </a-form-item>
        <a-form-item label="Value">
          <a-input
            id="value"
            v-model:value="dynamicValue"
            placeholder="Enter value"
          />
        </a-form-item>

        <button
          class="bg-white text-blue-500 border h-fit font-semibold py-1 px-2 rounded"
          onclick="addLinkToProject(selectedProjectIndex)"
        >
          Add Link
        </button>
      </a-form>

      <div>
        <div class="mb-5">
          <label for="project-select">Select Project:</label>
          <a-select
            v-model="selectedProjectIndex"
            class="w-[200px] ml-2"
            id="project-select"
          >
            <a-select-option
              v-for="(project, index) in data"
              :key="index"
              :value="index"
            >
              Project {{ index + 1 }}
            </a-select-option>
          </a-select>
        </div>
      </div>

      <div v-for="(project, index) in data" :key="index" class="project-info">
        <h3>Project {{ index + 1 }}</h3>
        <ul>
          <li v-for="(value, key) in project.links" :key="key">
            <strong>{{ key }}</strong
            >:
            <a :href="value" target="_blank">{{ value }}</a>
            <a-button
              type="link"
              danger
              @click="removeLinkFromProject(index, key)"
              >Remove</a-button
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, ref } from "vue";

export default defineComponent({
  name: "ProjectLinks",
  props: {
    data: {
      required: true,
    },
  },
  setup(props) {
    const data = reactive(props.data);
    console.log(data);

    const dynamicKey = ref("");
    const dynamicValue = ref("");
    const selectedProjectIndex = ref(0);

    const addLinkToProject = (projectIndex) => {
      if (!dynamicKey.value || !dynamicValue.value) {
        alert("Both key and value are required.");
        return;
      }

      const project = data[projectIndex];
      project.links = {
        ...project.links,
        [dynamicKey.value]: dynamicValue.value,
      };

      dynamicKey.value = "";
      dynamicValue.value = "";
    };

    const removeLinkFromProject = (projectIndex, linkKey) => {
      const project = data[projectIndex];
      delete project.links[linkKey];
    };

    watch(
      () => props.data,
      (newData) => {
        console.log(newData);
      },
      { immediate: true }
    );

    return {
      data,
      dynamicKey,
      dynamicValue,
      selectedProjectIndex,
      addLinkToProject,
      removeLinkFromProject,
    };
  },
});
</script>
