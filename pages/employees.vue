<!-- <script setup>
import Modal from "@/components/Modal.vue";

const employeeData = {
  formType: "employee",
  formName: "Add Employee",
  inputFields: [
    {
      name: "name",
      type: "text",
      labelName: "Name",
    },
    {
      name: "age",
      type: "number",
      labelName: "Age",
    },
    {
      name: "gender",
      type: "select",
      items: ["male", "female"],
      labelName: "Gender",
    },
    {
      name: "date",
      type: "date",
      labelName: "Date of joining",
    },
    {
      name: "designation",
      type: "select",
      items: ["developer", "designer", "manager", "team lead"],
      labelName: "Select Designation",
    },
  ],
};

const editingEmployee = ref(null);
const employeesArr = ref([]);
const searchQuery = ref("");

// const formValues = ref({});

onMounted(() => {
  const storedEmployees = localStorage.getItem("employeesDB");
  employeesArr.value = storedEmployees ? JSON.parse(storedEmployees) : [];
});

const handleFormSubmit = (formData) => {
  const userDB = employeesArr.value;
  const newEmployee = { ...formData, id: userDB.length + 1 };
  userDB.push(newEmployee);
  localStorage.setItem("employeesDB", JSON.stringify(userDB));
  employeesArr.value = userDB;
  // formValues.value = {};
};

const editEmployee = (data) => {
  console.log(data);
  employeeData.formName = "Edit Employee";
  // Object.assign(formValues.value, data);
};

const deleteEmployee = (index) => {
  employeesArr.value.splice(index, 1);
  localStorage.setItem("employeesDB", JSON.stringify(employeesArr.value));
};

// ! modal
const isOpen = ref(false);
const openModal = () => {
  isOpen.value = true;
};
const closeModal = () => {
  isOpen.value = false;
};

const filteredEmployees = computed(() => {
  return employeesArr.value.filter(
    (employee) =>
      employee.name &&
      employee.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});
</script> -->

<!-- <template>
  <div>
    <Heading>Employees Database</Heading>
    <div class="flex justify-around items-center m-auto mt-8 mb-8">
      <input
        type="text"
        v-model.trim="searchQuery"
        placeholder="Search Employee"
        class="border-2 px-2 rounded border-blue-300"
      />
      <button
        class="bg-blue-500 text-white px-2 py-1 rounded mr-2"
        @click="openModal"
      >
        Add Employee
      </button>
    </div>
    <Modal :isOpen="isOpen" :openModal="openModal" :closeModal="closeModal">
      <Form :formData="employeeData" @formSubmitted="handleFormSubmit" />
    </Modal>

    <div class="p-4">
      <div v-if="employeesArr.length > 0">
        <table class="w-full text-center border-collapse">
          <thead>
            <tr>
              <th class="border p-2">Name</th>
              <th class="border p-2">Age</th>
              <th class="border p-2">Gender</th>
              <th class="border p-2">Date of Joining</th>
              <th class="border p-2">Designation</th>
              <th class="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(employee, index) in filteredEmployees"
              :key="employee.id"
            >
              <td class="border p-2">{{ employee.name }}</td>
              <td class="border p-2">{{ employee.age }}</td>
              <td class="border p-2">{{ employee.gender }}</td>
              <td class="border p-2">{{ employee.date }}</td>
              <td class="border p-2">{{ employee.designation }}</td>
              <td class="border p-2">
                <button
                  class="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                  @click="editEmployee(employee)"
                >
                  Edit
                </button>
                <button
                  class="bg-red-500 text-white px-2 py-1 rounded"
                  @click="deleteEmployee(index)"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template> -->

<script setup>
import Modal from "@/components/Modal.vue";
import { ref, computed, onMounted } from "vue";
import { useEmployeeStore } from "@/store/employee";


const store = useEmployeeStore();

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
        class="border-2 px-4 py-2 rounded border-blue-300"
      />
      <CommonButton
        class="bg-blue-500 hover:bg-blue-600 focus:ring-blue-500"
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
        <!-- <table class="w-full text-center border-collapse">
          <thead>
            <tr>
              <th class="border p-2">Name</th>
              <th class="border p-2">Age</th>
              <th class="border p-2">Gender</th>
              <th class="border p-2">Date of Joining</th>
              <th class="border p-2">Designation</th>
              <th class="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(employee, index) in filteredEmployees"
              :key="employee.id"
            >
              <td class="border p-2">{{ employee.name }}</td>
              <td class="border p-2">{{ employee.age }}</td>
              <td class="border p-2">{{ employee.gender }}</td>
              <td class="border p-2">{{ employee.date }}</td>
              <td class="border p-2">{{ employee.designation }}</td>
              <td class="border p-2">
                <button
                  class="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                  @click="editEmployeeFn(employee)"
                >
                  Edit
                </button>
                <button
                  class="bg-red-500 text-white px-2 py-1 rounded"
                  @click="deleteEmployee(index)"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table> -->
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Name
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Age
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Gender
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Date of Joining
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Designation
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr
                v-for="(employee, index) in filteredEmployees"
                :key="employee.id"
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
                <td class="px-6 flex gap-2 py-4 whitespace-nowrap">
                  <CommonButton
                    @click="editEmployeeFn(employee)"
                    class="bg-blue-500 hover:bg-blue-600 focus:ring-blue-500"
                  >
                    Edit
                  </CommonButton>
                  <CommonButton
                    @click="deleteEmployee(index)"
                    class="bg-red-500 hover:bg-red-600 focus:ring-red-500"
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
