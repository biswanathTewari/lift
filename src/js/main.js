const noOfFloors = document.getElementById("floorsInput");
const noOfLifts = document.getElementById("liftsInput");
const form = document.getElementById("form");
const simulation = document.querySelector(".simulation");

const createFloors = (noOfFloors) => {
  const floors = document.createElement("div");
  floors.classList.add("floors");
  let html = "";

  for (let i = 1; i <= noOfFloors; i++) {
    const n = noOfFloors - i + 1;
    html += `
    <div class="floor position-relative" id="floor-${n}">
      <button class="floor__btn floor__btn--up" id="btn--up-${n}">
        <i class="fas fa-sort-up"></i>
      </button>
      <button class="floor__btn floor__btn--down" id="btn--down-${n}">
        <i class="fas fa-sort-down"></i>
      </button>
      <p
        class="floor__number position-absolute bottom-0 left-0 fst-italic"
      >
        floor ${n}
      </p>
    </div>
  `;
  }

  floors.innerHTML = html;
  return floors;
};

const createLifts = (noOfLifts) => {
  const lifts = document.createElement("div");
  lifts.classList.add("lifts");
  let html = "";

  for (let i = 1; i <= noOfLifts; i++) {
    const n = noOfLifts - i + 1;
    html += `
          <div class="lift" id="lift-${n}" style="left: ${7 * n}rem" >
            <div class="lift__door lift__door--left"></div>
            <div class="lift__door lift__door--right"></div>
          </div>
    `;
  }

  lifts.innerHTML = html;
  return lifts;
};

const createSimulationUI = (floors, lifts) => {
  //reset
  simulation.innerHTML = "";

  //create floors
  const floorsContainer = createFloors(floors);

  //create lifts
  const liftsContainer = createLifts(lifts);

  simulation.appendChild(floorsContainer);
  simulation.appendChild(liftsContainer);

  //clear extra buttons
  document.getElementById("btn--down-1").style.display = "none";
  document.getElementById(`btn--up-${floors}`).style.display = "none";
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const floors = noOfFloors.value;
  const lifts = noOfLifts.value;
  if (!floors || !lifts) return alert("Please enter a valid number");
  createSimulationUI(floors, lifts);
  window.scrollTo(0, document.body.scrollHeight);
});
