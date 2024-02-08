<script setup>
definePageMeta({
  middleware: "auth",
});

import Modal from "@/components/Modal.vue";
import { ref, computed, onMounted } from "vue";
import { useEmployeeStore } from "@/store/employee";
// import { employeeFormFields } from "~/data/formData.json";

const store = useEmployeeStore();
const isDeleteModal = ref(false);

onMounted(() => {
  store.fetchEmployees();
});

const handleFormSubmit = (formData) => {
  if (store.editingEmployee !== null) {
    const index = store.employeesArr.findIndex(
      (emp) => emp.id === store.editingEmployee.id
    );
    const updatedEmployee = { ...formData, id: store.editingEmployee.id };
    store.updateEmployee(index, updatedEmployee);
    store.editEmployee(null);
    store.setFormName("Add Employee");
  } else {
    store.addEmployee(formData);
  }
  store.setOpenModal(false);
};

const editEmployeeFn = (employee) => {
  // console.log(employee);
  store.editEmployee(employee);
  store.setFormName("Edit Employee");
  store.setOpenModal(true);
};

const deleteEmployee = (index) => {
  store.deleteEmployee(index);
};

const filteredEmployees = computed(() => {
  return store.employeesArr.filter(
    (employee) =>
      employee.name &&
      employee.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});
const searchQuery = ref("");

const openModal = () => store.setOpenModal(true);
const closeModal = () => {
  store.resetFormName("Add Employee");
  store.editEmployee(null);
  store.setOpenModal(false);
};
</script>

<template>
  <div>
    <Heading>Employees Database</Heading>
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
        Add Employee
      </CommonButton>
    </div>
    <Modal
      :isOpen="store.isOpen"
      :openModal="openModal"
      :closeModal="closeModal"
    >
      <Form
        :formData="store.formData"
        :editingEmployeeOrContact="store.editingEmployee"
        @formSubmitted="handleFormSubmit"
      />
    </Modal>

    <div class="p-4">
      <div v-if="store.employeesArr.length > 0">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200 text-center">
            <thead class="bg-gray-50 text-slate-800 text-sm">
              <tr>
                <th
                  scope="col"
                  class="px-6 py-3 font-medium uppercase tracking-wider"
                >
                  Name
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 font-medium uppercase tracking-wider"
                >
                  Age
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 font-medium uppercase tracking-wider"
                >
                  Gender
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 font-medium uppercase tracking-wider"
                >
                  Date of Joining
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 font-medium uppercase tracking-wider"
                >
                  Designation
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 font-medium uppercase tracking-wider"
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr
                v-for="(employee, index) in filteredEmployees"
                :key="employee.id"
                class="text-slate-700 capitalize text-sm"
              >
                <td class="px-6 py-4 whitespace-nowrap">{{ employee.name }}</td>
                <td class="px-6 py-4 whitespace-nowrap">{{ employee.age }}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                  {{ employee.gender }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">{{ employee.date }}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                  {{ employee.designation }}
                </td>
                <td
                  class="px-6 flex gap-2 py-4 whitespace-nowrap justify-center"
                >
                  <CommonButton
                    @click="editEmployeeFn(employee)"
                    class="bg-emerald-700 hover:bg-emerald-800 focus:ring-blue-500"
                  >
                    Edit
                  </CommonButton>
                  <CommonButton
                    @click="deleteEmployee(index)"
                    class="bg-red-700 hover:bg-red-800 focus:ring-red-500"
                  >
                    Delete
                  </CommonButton>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
