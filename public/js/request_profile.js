const btnAccept = document.querySelectorAll(".btnAccept");

const modal = document.getElementById("modal");
const modal_close = document.getElementById("modal_close");
const ratingForm = document.getElementById("rating-form");

btnAccept.forEach((b) => {
  b.addEventListener("click", () => {
    // alert(b.getAttribute("value"));
    modal.classList.add("show");
  });
});

modal_close.addEventListener("click", () => {
  modal.classList.remove("show");
});

ratingForm.addEventListener("submit", (e) => {
  e.preventDefault;
  alert("submit");
});
