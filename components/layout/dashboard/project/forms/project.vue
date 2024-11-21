<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <!-- Text Inputs -->
      <a-form-item label="Title">
        <a-input v-model:value="data.title" placeholder="Enter Title" />
      </a-form-item>

      <a-form-item label="Description">
        <a-textarea
          v-model:value="data.description"
          placeholder="Enter Description"
        />
      </a-form-item>

      <a-form-item label="Budget">
        <a-input-number
          v-model:value="data.budget"
          placeholder="Enter Budget"
          :min="0"
        />
      </a-form-item>

      <a-form-item label="Status">
        <a-input v-model:value="data.status" placeholder="Enter Status" />
      </a-form-item>

      <a-form-item label="Phase">
        <a-input v-model:value="data.phase" placeholder="Enter Phase" />
      </a-form-item>

      <a-form-item label="Serial Number">
        <a-input
          v-model:value="data.serial_number"
          placeholder="Enter Serial Number"
        />
      </a-form-item>

      <a-form-item label="Deadline">
        <a-date-picker
          v-model:value="deadline"
          placeholder="Select Deadline"
          format="YYYY/MM/DD"
        />
      </a-form-item>

      <a-form-item label="Start and End Date">
        <a-range-picker
          v-model:value="dateRange"
          :format="dateFormat"
          @change="onDateRangeChange"
        />
      </a-form-item>

      <!-- Switches -->
      <a-form-item label="Approved">
        <a-switch v-model:checked="data.approved" />
      </a-form-item>

      <a-form-item label="Active">
        <a-switch v-model:checked="data.active" />
      </a-form-item>

      <!-- Buttons -->
      <a-form-item>
        <a-button type="primary" html-type="submit">Submit</a-button>
      </a-form-item>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import dayjs, { Dayjs } from "dayjs";

export default defineComponent({
  name: "ProjectForm",
  props: {
    data: {
      type: Object,
      required: true,
    },
  },

  setup(props) {
    const dateFormat = "YYYY/MM/DD";

    // Initialize dateRange based on the incoming data
    const dateRange = ref<[Dayjs, Dayjs]>([
      dayjs(props.data.start_date),
      dayjs(props.data.end_date),
    ]);
    const deadline = ref(dayjs(props.data.deadline));

    // const logData = () => {
    //   console.log(" Updated props.data:", props.data);
    // };
    const onDateRangeChange = (dates: [Dayjs, Dayjs]) => {
      if (dates) {
        props.data.start_date = dates[0].toDate();
        props.data.end_date = dates[1].toDate();
        props.data.end_date = dates[1].toDate();
      } else {
        props.data.start_date = null;
        props.data.end_date = null;
      }

    };

    // Watch for changes in the data prop to update dateRange and deadline
    watch(
      () => props.data,
      (newData) => {
        dateRange.value = [dayjs(newData.start_date), dayjs(newData.end_date)];
        deadline.value = dayjs(newData.deadline);
        // logData();
      },
      { immediate: true } // Run immediately on component mount
    );

    const handleSubmit = () => {
      console.log("Submitted Project Detail:", props.data);
      // Add your form submission logic here
    };

    return {
      dateRange,
      deadline,
      dateFormat,
      onDateRangeChange,
      handleSubmit,
    };
  },
});
</script>
