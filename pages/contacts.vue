<!-- <script setup>
import Modal from "@/components/Modal.vue";
import { ref } from "vue";

const contactData = {
  formType: "contact",
  formName: "Add Contact",
  inputFields: [
    {
      name: "name",
      type: "text",
      labelName: "Name",
    },
    {
      name: "phone",
      type: "number",
      labelName: "Phone",
    },
    {
      name: "country",
      type: "select",
      labelName: "Country",
      items: ["India", "Russia", "UAE", "UK", "Japan"],
    },
  ],
};

const contactsArr = ref([]);
const searchQuery = ref("");

onMounted(() => {
  const storedContacts = localStorage.getItem("contactsDB");
  contactsArr.value = storedContacts ? JSON.parse(storedContacts) : [];
});

const handleFormSubmit = (formData) => {
  const userDB = contactsArr.value;
  userDB.push(formData);
  localStorage.setItem("contactsDB", JSON.stringify(userDB));
  contactsArr.value = userDB;
  // closeModal();
};

const editContact = (contact) => {
  contactData.formName = "Edit Contact";
  isOpen.value = true;
  // Pre-fill form with contact data
  formValues.value = { ...contact };
};

const deleteContact = (index) => {
  contactsArr.value.splice(index, 1);
  localStorage.setItem("contactsDB", JSON.stringify(contactsArr.value));
};

// ! modal
const isOpen = ref(false);
const openModal = () => {
  isOpen.value = true;
};
const closeModal = () => {
  isOpen.value = false;
};

const filteredContacts = computed(() => {
  return contactsArr.value.filter(
    (contact) =>
      contact.name &&
      contact.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});
</script> -->

<!-- <template>
  <div>
    <Heading>Contacts Database</Heading>
    <div class="flex justify-around items-center m-auto mt-8 mb-8">
      <input
        type="text"
        placeholder="Search Contact"
        v-model.trim="searchQuery"
        class="border-2 px-2 rounded border-blue-300"
      />
      <button
        class="bg-blue-500 text-white px-2 py-1 rounded mr-2"
        @click="openModal"
      >
        Add Contact
      </button>
    </div>
    <Modal :isOpen="isOpen" :openModal="openModal" :closeModal="closeModal">
      <Form :formData="contactData" @formSubmitted="handleFormSubmit" />
    </Modal>

    <div class="p-4 flex flex-wrap">
      <div
        v-for="(contact, index) in filteredContacts"
        :key="contact.id"
        class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-2"
      >
        <div class="bg-white rounded shadow-md p-4">
          <p><strong>Name:</strong> {{ contact.name }}</p>
          <p><strong>Phone:</strong> {{ contact.phone }}</p>
          <p><strong>Country:</strong> {{ contact.country }}</p>
          <div class="mt-2">
            <button
              class="bg-blue-500 text-white px-2 py-1 rounded mr-2"
              @click="editContact(contact)"
            >
              Edit
            </button>
            <button
              class="bg-red-500 text-white px-2 py-1 rounded"
              @click="deleteContact(index)"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template> -->

<script setup>
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
        class="border-2 px-4 py-2 rounded border-blue-300"
      />
      <CommonButton
        class="bg-blue-500 hover:bg-blue-600 focus:ring-blue-500"
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
        <div class="bg-white rounded shadow-md shadow-green-600 p-4">
          <p><strong>Name:</strong> {{ contact.name }}</p>
          <p><strong>Phone:</strong> {{ contact.phone }}</p>
          <p><strong>Country:</strong> {{ contact.country }}</p>
          <div class="mt-2">
            <CommonButton
              class="bg-blue-500 hover:bg-blue-600 focus:ring-blue-500 mr-2"
              @click="editContact(contact)"
            >
              Edit
            </CommonButton>
            <CommonButton
              class="bg-red-500 hover:bg-red-600 focus:ring-red-500"
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
