<template>
  <header class="w-4/5 m-auto py-4">
    <nav>
      <ul class="flex justify-around">
        <NuxtLink v-for="{ title, to } in navLinks" :to="to" :key="title">
          <li
            class="hover:font-medium text-slate-800 hover:text-emerald-700 w-32 flex justify-center items-center transition-all duration-300 ease-in-out"
          >
            {{ title }}
          </li>
        </NuxtLink>
        <NuxtLink v-if="!isLoggedIn" to="/signup">
          <li
            class="hover:font-medium text-slate-800 hover:text-emerald-700 w-32 flex justify-center items-center transition-all duration-300 ease-in-out"
          >
            Sign up
          </li>
        </NuxtLink>
        <NuxtLink v-if="!isLoggedIn" to="/login">
          <li
            class="hover:font-medium text-slate-800 hover:text-emerald-700 w-32 flex justify-center items-center transition-all duration-300 ease-in-out"
          >
            Login
          </li>
        </NuxtLink>

        <li
          v-if="isLoggedIn"
          @click="handleLogout"
          class="hover:font-medium cursor-pointer text-slate-800 hover:text-emerald-700 w-32 flex justify-center items-center transition-all duration-300 ease-in-out"
        >
          Logout
        </li>
      </ul>
    </nav>
  </header>

  <section>
    <NuxtPage></NuxtPage>
  </section>
</template>

<script setup>
import { useAuthStore } from "~/store/auth";
const store = useAuthStore();

// using computed for tracking changes
const isLoggedIn = computed(() => store.isLoggedIn);
// Handle logout
const handleLogout = () => {
  store.logoutUser();
  navigateTo("/login");
};

const navLinks = [
  {
    title: "Home",
    to: "/",
  },
  {
    title: "Employees",
    to: "/employees",
  },
  {
    title: "Contacts",
    to: "/contacts",
  },
];
</script>
