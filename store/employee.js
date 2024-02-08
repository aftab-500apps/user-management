import { defineStore } from "pinia";

export const useEmployeeStore = defineStore("employee", {
  state: () => ({
    formData: {
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
    },
    editingEmployee: null,
    employeesArr: [],
    isOpen: false,
  }),

  actions: {
    fetchEmployees() {
      const storedEmployees = localStorage.getItem("employeesDB");
      this.employeesArr = storedEmployees ? JSON.parse(storedEmployees) : [];
    },

    addEmployee(formData) {
      const newEmployee = {
        ...formData,
        id: Math.floor(100000 + Math.random() * 900000),
      };
      this.employeesArr.push(newEmployee);
      localStorage.setItem("employeesDB", JSON.stringify(this.employeesArr));
    },

    editEmployee(data) {
      this.editingEmployee = data;
    },

    updateEmployee(index, updatedEmployee) {
      this.employeesArr.splice(index, 1, updatedEmployee);
      localStorage.setItem("employeesDB", JSON.stringify(this.employeesArr));
    },

    deleteEmployee(index) {
      this.employeesArr.splice(index, 1);
      localStorage.setItem("employeesDB", JSON.stringify(this.employeesArr));
    },

    setOpenModal(value) {
      this.isOpen = value;
    },

    setFormName(name) {
      this.formData.formName = name;
    },

    resetFormName(name) {
      this.formData.formName = name;
    },
  },

  mutation: {
    setEditingEmployee(employee) {
      this.editingEmployee = employee;
    },
  },
});
