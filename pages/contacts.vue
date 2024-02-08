<script setup>
definePageMeta({
  middleware: "auth",
});

import Modal from "@/components/Modal.vue";
import { ref, computed, onMounted } from "vue";
import { useContactStore } from "@/store/contact";

const store = useContactStore();

onMounted(() => {
  store.fetchContacts();
});

const handleFormSubmit = (formData) => {
  if (store.editingContact !== null) {
    const index = store.contactsArr.findIndex(
      (emp) => emp.id === store.editingContact.id
    );
    const updatedContact = { ...formData, id: store.editingContact.id };
    store.updateContact(index, updatedContact);
    store.editContact(null);
    store.setFormName("Add Contact");
  } else {
    store.addContact(formData);
  }
  store.setOpenModal(false);
};

const editContact = (contact) => {
  store.editContact(contact);
  store.setFormName("Edit Contact");
  store.setOpenModal(true);
};

const deleteContact = (index) => {
  store.deleteContact(index);
};

const filteredContacts = computed(() => {
  return store.contactsArr.filter(
    (contact) =>
      contact.name &&
      contact.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const searchQuery = ref("");

const openModal = () => store.setOpenModal(true);
const closeModal = () => {
  store.resetFormName("Add Contact");
  store.editContact(null);
  store.setOpenModal(false);
};
</script>

<template>
  <div>
    <Heading>Contacts Database</Heading>
    <div class="flex justify-around items-center m-auto mt-8 mb-8">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search Employee"
        class="border-2 px-4 py-2 rounded border-emerald-700 outline-none"
      />
      <CommonButton
        class="bg-emerald-700 hover:bg-emerald-800 focus:ring-blue-500"
        @click="openModal"
      >
        Add Contact
      </CommonButton>
    </div>
    <Modal
      :isOpen="store.isOpen"
      :openModal="openModal"
      :closeModal="closeModal"
    >
      <Form
        :formData="store.formData"
        :editingEmployeeOrContact="store.editingContact"
        @formSubmitted="handleFormSubmit"
      />
    </Modal>

    <div
      v-if="store.contactsArr.length > 0"
      class="p-4 m-auto border-2 flex justify-around flex-wrap"
    >
      <div
        v-for="(contact, index) in filteredContacts"
        :key="contact.id"
        class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-2"
      >
        <div
          class="bg-white rounded shadow-sm shadow-emerald-700 p-4 text-sm text-slate-800"
        >
          <p><strong>Name: </strong> {{ contact.name }}</p>
          <p><strong>Phone: </strong> {{ contact.phone }}</p>
          <p><strong>Country: </strong> {{ contact.country }}</p>
          <div class="mt-2">
            <CommonButton
              class="bg-emerald-700 hover:bg-emerald-800 focus:ring-blue-500 mr-2"
              @click="editContact(contact)"
            >
              Edit
            </CommonButton>
            <CommonButton
              class="bg-red-700 hover:bg-red-800 focus:ring-red-500"
              @click="deleteContact(index)"
            >
              Delete
            </CommonButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
