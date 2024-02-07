<template>
  <header class="w-4/5 m-auto py-4">
    <nav>
      <ul class="flex justify-around">
        <NuxtLink v-for="{ title, to } in navLinks" :to="to" :key="title">
          <li
            class="hover:font-medium hover:text-green-600 w-32 flex justify-center items-center transition-all duration-300 ease-in-out"
          >
            {{ title }}
          </li>
        </NuxtLink>
      </ul>
    </nav>
  </header>

  <section>
    <NuxtPage></NuxtPage>
  </section>
</template>

<script setup lang="ts">
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
  {
    title: "Users",
    to: "/users",
  },
];
</script>
