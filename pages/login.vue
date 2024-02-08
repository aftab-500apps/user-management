<template>
  <div class="w-96 m-auto">
    <Form
      :formData="loginFormFields"
      editingEmployeeOrContact="null"
      @formSubmitted="handleLoginForm"
    />
    <p class="flex justify-center items-center gap-2">
      Not a member?
      <NuxtLink to="/signup" class="text-emerald-700">Create account</NuxtLink>
    </p>
  </div>
</template>

<script setup>
import { loginFormFields } from "~/data/formData.json";
import { useAuthStore } from "~/store/auth";

const store = useAuthStore();

onMounted(() => {
  store.fetchUsers();
});

const handleLoginForm = (formData) => {
  store.loginUser(formData);
  console.log("from login", store.isLoggedIn);
  console.log("from login", store.loggedInUSR);
};
</script>
