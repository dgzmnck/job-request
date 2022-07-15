const flipcards = document.querySelectorAll(".flip-card");
const body = document.body;
const personnel_img_container = document.getElementById(
  "personnel_img_container"
);
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
    inner.classList.toggle("flip");

    if (inner.classList.contains("flip")) {
      setTimeout(() => {
        if (inner.classList.contains("flip")) {
          inner.classList.remove("flip");
        }
      }, 5000);
    }
  });

  // f.addEventListener("mouseleave", () => {
  //   setTimeout(() => {
  //     if (inner.classList.contains("flip")) {
  //       inner.classList.remove("flip");
  //     }
  //   }, 5000);
  // });
});

// alert(123);
