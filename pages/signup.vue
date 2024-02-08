<template>
  <div>
    <Form
      :formData="signupFormFields"
      editingEmployeeOrContact="null"
      @formSubmitted="handleSignupForm"
    />
  </div>
</template>

<script setup>
import { signupFormFields } from "~/data/formData.json";

const handleSignupForm = (formData) => {
  console.log(formData);
};
</script>
