const links = document.querySelectorAll(".options a");

for (link of links) {
  if (location.pathname.includes(link.pathname)) {
    link.classList.add("adminActive");
  }
}
