const noOfFloors = document.getElementById("floorsInput");
const noOfLifts = document.getElementById("liftsInput");
const form = document.getElementById("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const floors = noOfFloors.value;
  const lifts = noOfLifts.value;
  if (!floors || !lifts) return alert("Please enter a valid number");
  console.log(floors, lifts);
  //buildTheBuilding(floors, lifts);
});
