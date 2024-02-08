<template>
  <div>
    <Form
      :formData="signupFormFields"
      editingEmployeeOrContact="null"
      @formSubmitted="handleSignupForm"
    />
    <p class="flex justify-center items-center gap-2">
      Already a member? <NuxtLink to="/login">login</NuxtLink>
    </p>
  </div>
</template>

<script setup>
import { signupFormFields } from "~/data/formData.json";
import { useAuthStore } from "~/store/auth";

const store = useAuthStore();

onMounted(() => {
  store.fetchUsers();
});

const handleSignupForm = (formData) => {
  store.addUser(formData);
  console.log(store.usersDataArr);
};
</script>
