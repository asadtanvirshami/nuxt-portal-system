<template>
  <div class="user-form">
    <h2>Edit Profile</h2>
    <a-form layout="vertical" @submit.prevent="handleSubmit">
      <!-- First Name -->
      <a-form-item label="First Name" required>
        <a-input v-model:value="user.firstName" placeholder="Enter your first name" />
      </a-form-item>

      <!-- Last Name -->
      <a-form-item label="Last Name" required>
        <a-input v-model:value="user.lastName" placeholder="Enter your last name" />
      </a-form-item>

      <!-- Email -->
      <a-form-item label="Email" required>
        <a-input
          v-model:value="user.email"
          type="email"
          placeholder="Enter your email"
        />
      </a-form-item>

      <!-- Password -->
      <a-form-item label="Password" required>
        <a-input-password
          v-model:value="user.password"
          placeholder="Enter your password"
        />
      </a-form-item>

      <a-form-item label="Role" required>
        <a-input
          v-model:value="user.role"
          placeholder="Enter role"
        />
      </a-form-item>

      <!-- Profile Picture -->
      <a-form-item label="Profile Picture">
        <a-upload
          :action="uploadUrl"
          list-type="picture-card"
          @change="handleUpload"
          :show-upload-list="false"
        >
          <div v-if="!user.profile_picture">
            <PlusOutlined />
            <div style="margin-top: 8px">Upload</div>
          </div>
          <img
            v-else
            :src="user.profile_picture"
            alt="Profile Picture"
            style="width: 100%"
          />
        </a-upload>
      </a-form-item>

      <!-- Blocked -->
      <a-form-item label="Blocked">
        <a-switch
          :checked:value="user.blocked"
          @change="(checked) => (user.blocked = checked)"
        />
      </a-form-item>

      <!-- Submit Button -->
      <a-form-item>
        <a-button type="primary" html-type="submit">Save Changes</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { PlusOutlined } from "@ant-design/icons-vue";

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  profile_picture: string;
  blocked: boolean;
}

export default defineComponent({
  name: "UserForm",
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    // Reactive copy of user data
    const user = reactive(props.data);

    const uploadUrl = "/api/upload"; // Replace with your API endpoint

    const handleSubmit = () => {
      console.log("Updated User Data:", user);
      // Handle saving updated user data
    };

    const handleUpload = (info: any) => {
      if (info.file.status === "done") {
        user.profile_picture = info.file.response.url; // Assuming API returns a URL
      }
    };
    watch(
      () => props.data,
      (newData) => {
        console.log(newData);
      },
      { immediate: true }
    );

    return {
      user,
      uploadUrl,
      handleSubmit,
      handleUpload,
    };
  },
});
</script>
