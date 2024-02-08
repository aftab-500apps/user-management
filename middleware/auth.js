export default defineNuxtRouteMiddleware((to, from) => {
  if (process.server) {
    return;
  }
  const isLoggedInStr = localStorage.getItem("isLoggedIn");
  const isLoggedIn = isLoggedInStr === "true";

  if (isLoggedIn) {
    return;
  } else {
    alert("Login first");
    return {
      path: "/login",
      replace: true,
    };
  }
});
