const flipcards = document.querySelectorAll(".flip-card");
const body = document.body;
// flipcards.forEach((f) => {
//   const flipInner = f.firstChild;
//   flipInner.classList.toggle("flip");
// });

// body.addEventListener("click", () => {
//   flipcards.forEach((f) => {
//     f.addEventListener("click", () => {
//       const inner = f.querySelector(".flip-inner");
//       console.log(inner);
//       inner.classList.remove("flip");
//     });
//   });
// });

flipcards.forEach((f) => {
  f.addEventListener("click", () => {
    const inner = f.querySelector(".flip-inner");
    console.log(inner);
    inner.classList.toggle("flip");
  });
});

// alert(123);
