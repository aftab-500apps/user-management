export const useAuthStore = defineStore("auth", {
  state: () => ({
    isLoggedIn: false,
    loggedInUSR: null,
    usersDataArr: [],
  }),
  actions: {
    created() {
      const isLoggedIn = localStorage.getItem("isLoggedIn");
      if (isLoggedIn !== null) {
        this.isLoggedIn = JSON.parse(isLoggedIn);
        console.log(
          "isLoggedIn initialized from localStorage:",
          this.isLoggedIn
        );
      }
    },

    fetchUsers() {
      const storedUsers = localStorage.getItem("userDB");
      this.usersDataArr = storedUsers ? JSON.parse(storedUsers) : [];
    },

    addUser(formData) {
      const newUser = {
        ...formData,
        id: Math.floor(100000 + Math.random() * 900000),
      };
      this.usersDataArr.push(newUser);
      localStorage.setItem("userDB", JSON.stringify(this.usersDataArr));
      this.isLoggedIn = true;
      this.loggedInUSR = newUser;
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("loggedInUSR", JSON.stringify(newUser));
      navigateTo("/employees");
    },

    loginUser(formData) {
      //   console.log(this.usersDataArr);
      const temp = this.usersDataArr.find(
        (ele) =>
          ele.email === formData.email && ele.password === formData.password
      );
      if (temp !== undefined) {
        this.isLoggedIn = true;
        this.loggedInUSR = temp;
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("loggedInUSR", JSON.stringify(temp));
        console.log("User logged in. isLoggedIn:", this.isLoggedIn);

        navigateTo("/employees");
      } else {
        alert("invalid user");
      }
      //   this.isLoggedIn = temp;
    },

    logoutUser() {
      this.isLoggedIn = false;
      this.loggedInUSR = null;
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("loggedInUSR");
      console.log("User logged out. isLoggedIn:", this.isLoggedIn);
    },
  },
});
