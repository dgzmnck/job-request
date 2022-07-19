const btnAccept = document.querySelectorAll(".btnAccept");

const modal = document.getElementById("modal");
const modal_close = document.getElementById("modal_close");
const ratingForm = document.getElementById("rating-form");

const pending = document.getElementById("pending");
const approved = document.getElementById("approved");
// const posted = document.getElementById("posted");
const torate = document.getElementById("torate");
const completed = document.getElementById("completed");
const denied = document.getElementById("denied");
const cancelled = document.getElementById("cancelled");

const table = document.getElementById("table");

const tableHead = ` <table class="fl-table">
<thead>
  <tr>
    <th>Date</th>
    <th>Time</th>
    <th>Office</th>
    <th>Category</th>
    <th>Nature of Request</th>
    <th>Status</th>
    <th>Action</th>
  </tr>
</thead>
<tbody>`;

let tableContents = ``;

function GetNumberOf(filter) {
  const length = requestData.filter((r) => r.status == filter).length;
  return length == 0
    ? ""
    : " (" + requestData.filter((r) => r.status == filter).length + ")";
}

function ShowNumbers() {
  pending.innerHTML = "Pending" + GetNumberOf("pending");
  accepted.innerHTML = "Accepted" + GetNumberOf("accepted");
  approved.innerHTML = "Approved & Posted" + GetNumberOf("approved");
  completed.innerHTML = "Completed" + GetNumberOf("completed");
  torate.innerHTML = "To Rate" + GetNumberOf("torate");
  denied.innerHTML = "Denied" + GetNumberOf("denied");
  cancelled.innerHTML = "Cancelled" + GetNumberOf("cancelled");
  SetActive(pending);
  SetContent("pending");
}

ShowNumbers();

function SetActive(active) {
  if (pending.classList.contains("active")) pending.classList.remove("active");
  // if (posted.classList.contains("active")) posted.classList.remove("active");
  if (accepted.classList.contains("active"))
    accepted.classList.remove("active");
  if (approved.classList.contains("active"))
    approved.classList.remove("active");
  if (torate.classList.contains("active")) torate.classList.remove("active");
  if (completed.classList.contains("active"))
    completed.classList.remove("active");
  if (denied.classList.contains("active")) denied.classList.remove("active");
  if (cancelled.classList.contains("active"))
    cancelled.classList.remove("active");
  active.classList.add("active");
}

function SetContent(filter) {
  tableContents = ``;
  const data = requestData.filter((r) => r.status == filter);
  data.forEach((r) => {
    tableContents += `<tr>
    <td>${new Date(Date.parse(r.createdAt)).toISOString().split("T")[0]} </td>
    <td>${new Date(Date.parse(r.createdAt)).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })}</td>
<td>${r.office_code}</td>
<td>${r.category}</td>
<td>${
      r.nature.length > 100 ? r.nature.substring(0, 100) + "..." : r.nature
    }</td>
<td>${r.status}</td>
</tr>`;
  });

  table.innerHTML = tableHead + tableContents;
}

pending.addEventListener("click", () => {
  SetActive(pending);
  SetContent("pending");
});

// posted.addEventListener("click", () => {
//   SetActive(posted);
//   SetContent("posted");
// });
approved.addEventListener("click", () => {
  SetActive(approved);
  SetContent("approved");
});
torate.addEventListener("click", () => {
  SetActive(torate);
  SetContent("to-rate");
});
accepted.addEventListener("click", () => {
  SetActive(accepted);
  SetContent("accepted");
});
completed.addEventListener("click", () => {
  SetActive(completed);
  SetContent("completed");
});
cancelled.addEventListener("click", () => {
  SetActive(cancelled);
  SetContent("cancelled");
});
denied.addEventListener("click", () => {
  SetActive(denied);
  SetContent("denied");
});

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
