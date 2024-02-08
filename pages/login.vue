<template>
  <div>
    <Form :formData="loginFormFields" editingEmployeeOrContact=null @formSubmitted="handleLoginForm" />
  </div>
</template>

<script setup>
import { loginFormFields } from "~/data/formData.json";

const handleLoginForm = (formData) => {
    console.log(formData);
}
</script>
