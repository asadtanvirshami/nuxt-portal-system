<template>
  <div class="flex w-full justify-center items-center align-middle h-screen">
    <div class="w-[30rem]">
      <a-card class="w-full" title="Admin Portal">
        <a-form
          :model="formState"
          :layout="formState.layout"
          name="basic"
          autocomplete="off"
          @finish="onFinish"
          @finishFailed="onFinishFailed"
        >
          <a-form-item
            label="Email"
            name="email"
            :rules="[{ required: true, message: 'Please input your email!' }]"
          >
            <a-input v-model:value="formState.email" />
          </a-form-item>

          <a-form-item
            label="Password"
            name="password"
            :rules="[
              { required: true, message: 'Please input your password!' },
            ]"
          >
            <a-input-password v-model:value="formState.password" />
          </a-form-item>
          <div class="flex justify-between">
            <a-form-item name="remember">
              <a-checkbox v-model:checked="formState.remember"
                >Remember me</a-checkbox
              >
            </a-form-item>

            <a-form-item>
              <a-button type="ghost" html-type="submit">Sign In</a-button>
            </a-form-item>
          </div>
        </a-form>
      </a-card>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { message } from "ant-design-vue"; // For showing success or error notifications
import { authApi } from "~/service/auth"; // Adjust the path to where your API module is located

interface FormState {
  email: string;
  password: string;
  remember: boolean;
  layout: string;
}

definePageMeta({
  layout: "auth",
});

export default defineComponent({
  name: "SignInPage",
  setup() {
    const formState = reactive<FormState>({
      email: "",
      password: "",
      remember: true,
      layout: "vertical",
    });

    const onFinish = async () => {
      try {
        const response = await authApi.login(
          formState.email,
          formState.password
        );
        console.log("Success:", response.data);

        // Display a success message
        message.success("Logged in successfully!");

        // Handle further actions like navigation or storing tokens
        // Example: localStorage.setItem("token", response.data.token);
      } catch (error: any) {
        console.error("Login failed:", error);

        // Display an error message
        message.error(
          error.response?.data?.message || "Login failed, please try again."
        );
      }
    };

    const onFinishFailed = (errorInfo: any) => {
      console.log("Validation Failed:", errorInfo);
    };

    return {
      formState,
      onFinish,
      onFinishFailed,
    };
  },
});
</script>
