<template>
  <!-- <form @submit.prevent="handleSubmit">
    <h2>{{ formData.formName }}</h2>
    <div v-for="(field, index) in formData.inputFields" :key="index">
      <label> {{ field.labelName }}: </label>
      <select v-if="field.type === 'select'" v-model="formValues[field.name]">
        <option v-for="item in field.items" :value="item">{{ item }}</option>
      </select>
      <input
        v-else
        :type="field.type"
        :placeholder="`enter ${field.name}`"
        v-model="formValues[field.name]"
        class="border-2"
      />
    </div>
    <button type="submit" class="border">{{ formData.formName }}</button>
  </form> -->

  <!-- <form @submit.prevent="handleSubmit" class="p-4">
    <h2 class="text-lg font-semibold mb-4">{{ formData.formName }}</h2>
    <div
      v-for="(field, index) in formData.inputFields"
      :key="index"
      class="mb-4"
    >
      <label class="block mb-1"> {{ field.labelName }}: </label>
      <select
        v-if="field.type === 'select'"
        v-model="formValues[field.name]"
        class="w-full p-2 border rounded-md"
      >
        <option v-for="item in field.items" :value="item">{{ item }}</option>
      </select>
      <input
        v-else
        :type="field.type"
        :placeholder="`Enter ${field.labelName}`"
        v-model="formValues[field.name]"
        class="w-full p-2 border rounded-md"
      />
    </div>
    <button type="submit" class="w-full text-center bg-blue-500 text-white flex justify-center m-auto px-4 py-2 rounded-md">
      {{ formData.formName }}
    </button>
  </form> -->

  <form @submit.prevent="handleSubmit" class="p-4">
    <h2 class="text-lg font-semibold mb-4">{{ formData.formName }}</h2>
    <div
      v-for="(field, index) in formData.inputFields"
      :key="index"
      class="mb-4"
    >
      <label class="block mb-1 text-gray-700"> {{ field.labelName }}: </label>
      <select
        v-if="field.type === 'select'"
        v-model="formValues[field.name]"
        class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
      >
        <option v-for="item in field.items" :value="item" :key="item">
          {{ item }}
        </option>
      </select>
      <input
        v-else
        :type="field.type"
        :placeholder="`Enter ${field.labelName}`"
        v-model="formValues[field.name]"
        class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
      />
    </div>
    <button
      type="submit"
      class="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
    >
      {{ formData.formName }}
    </button>
  </form>
</template>

<script setup>
const { formData, editingEmployeeOrContact } = defineProps([
  "formData",
  "editingEmployeeOrContact",
]);
const emit = defineEmits(["formSubmitted"]);

const formValues = ref({});

onMounted(() => {
  // Populate formValues with editingEmployee data if editing
  if (editingEmployeeOrContact) {
    for (const field of formData.inputFields) {
      formValues.value[field.name] = editingEmployeeOrContact[field.name];
    }
  }
});

const handleSubmit = () => {
  emit("formSubmitted", formValues.value);
  formValues.value = {};
};
</script>
