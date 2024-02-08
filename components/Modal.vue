<template>
  <div v-if="isOpen" class="modal">
    <div class="modal-content">
      <slot></slot>
      <button
        @click="closeModal"
        class="w-1/2 m-auto flex justify-center bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded-md"
      >
        Close
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps(["isOpen", "openModal", "closeModal"]);
</script>

<style>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  width: 50%;
}
</style>
