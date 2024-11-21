<template>
  <div>
    <!-- Milestone List -->
    <div
      v-for="(milestone, index) in milestones"
      :key="milestone.id"
      class="milestone-item"
    >
      <h3>Milestone {{ index + 1 }}</h3>
      <a-form layout="vertical">
        <a-form-item label="Project">
          <a-input
            v-model="milestone.project"
            placeholder="Enter project name"
          />
        </a-form-item>
        <a-form-item label="Title">
          <a-input
            v-model="milestone.title"
            placeholder="Enter milestone title"
          />
        </a-form-item>
        <a-form-item label="Description">
          <a-textarea
            v-model="milestone.description"
            placeholder="Enter milestone description"
            rows="3"
          />
        </a-form-item>
        <a-form-item label="Amount">
          <a-input-number
            v-model="milestone.amount"
            placeholder="Enter amount"
            :min="0"
          />
        </a-form-item>
        <a-form-item label="Due Date">
          <a-date-picker
            v-model="milestone.dueDate"
            placeholder="Select due date"
          />
        </a-form-item>
        <a-form-item label="Is Completed">
          <a-switch
            :checked="milestone.isCompleted"
            @change="(checked) => toggleCompletion(index, checked)"
          />
        </a-form-item>
        <a-button type="danger" @click="removeMilestone(index)" block>
          Remove Milestone
        </a-button>
      </a-form>
      <hr />
    </div>

    <!-- Add New Milestone -->
    <a-button type="primary" @click="addMilestone" block>
      Add Milestone
    </a-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import type { Milestone } from "../../../interface/project/project-interface"; // Replace with the correct path to your interface

export default defineComponent({
  name: "MilestoneManager",
  props: {
    initialMilestones: {
      type: Array as () => Milestone[],
      default: () => [],
    },
  },
  setup(props) {
    // Reactive milestones data
    const milestones = reactive<Milestone[]>([...props.initialMilestones]);

    // Add a new milestone
    const addMilestone = () => {
      const newMilestone: Milestone = {
        id: "",
        project: "",
        title: "",
        description: "",
        amount: 0,
        dueDate: new Date(),
        isCompleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      milestones.push(newMilestone);
    };

    // Remove a milestone by index
    const removeMilestone = (index: number) => {
      milestones.splice(index, 1);
    };

    const toggleCompletion = (index: number, checked: boolean) => {
      milestones[index].isCompleted = checked;
    };

    return {
      milestones,
      addMilestone,
      toggleCompletion,
      removeMilestone,
    };
  },
});
</script>

<style scoped>
.milestone-item {
  margin-bottom: 24px;
}
</style>
