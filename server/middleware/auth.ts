export default defineEventHandler(async (event) => {
  setCookie(event, "token", "hi");
  const token = getCookie(event, "token");

  if (event.path.startsWith("/api/user") && token !== "hi") {
    throw createError({
      statusCode: 401,
    });
  }
});
