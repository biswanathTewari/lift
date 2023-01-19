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
          <div class="lift" id="lift-${n}" floor="1" isBusy="false" style="left: ${
      7 * n
    }rem" >
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

const getNearestLift = (targetFloor, direction) => {
  const lifts = [...document.querySelectorAll(".lift")];

  const sameFloorLift = lifts.find(
    (lift) =>
      lift.getAttribute("isBusy") === "false" &&
      lift.getAttribute("floor") === targetFloor
  );
  if (sameFloorLift) return { lift: sameFloorLift, isOnSameFloor: true };

  //& get the non busy lifts along with their distance from the target floor
  let comparisonList = [];
  lifts.forEach((lift) => {
    if (lift.getAttribute("isBusy") === "false")
      comparisonList.push({
        distance: Math.abs(lift.getAttribute("floor") - targetFloor),
        lift,
      });
  });

  const nearestLift = comparisonList.reverse().reduce((acc, curr) => {
    if (curr.distance < acc.distance) return curr;
    return acc;
  });

  return { lift: nearestLift ? nearestLift.lift : null, isOnSameFloor: false };
};

const moveLift = (lift, targetFloor, isOnSameFloor) => {
  lift.setAttribute("isBusy", "true");

  const currentFloor = lift.getAttribute("floor");
  const distance = parseInt(targetFloor) - parseInt(currentFloor);
  const absDistance = Math.abs(distance);
  const heightOfFloor = 11; //rem

  if (!isOnSameFloor) {
    const distanceInRems =
      (parseInt(currentFloor) - 1 + distance) * heightOfFloor;
    lift.style.transition = `transform ${absDistance * 2}s linear`;
    lift.style.transform = `translateY(-${distanceInRems}rem)`;
  }

  setTimeout(() => {
    lift.classList.remove("busy");
    lift.setAttribute("isBusy", "false");
    lift.setAttribute("floor", targetFloor);
    //TODO: open and close doors
  }, absDistance * 2 * 1000);
};

const liftRequestHandler = (e) => {
  if (!e.target.classList.contains("floor__btn")) return;

  const floor = e.target.id.split("-")[3];
  const direction = e.target.classList.contains("floor__btn--up")
    ? "up"
    : "down";

  // get nearest lift
  const { lift, isOnSameFloor } = getNearestLift(floor, direction);
  //console.log(lift, isOnSameFloor);

  // move lift
  if (lift) {
    moveLift(lift, floor, isOnSameFloor);
  } else {
    alert("No lift available");
    //TODO: queue request
  }
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const floors = noOfFloors.value;
  const lifts = noOfLifts.value;
  if (!floors || !lifts) return alert("Please enter a valid number");
  createSimulationUI(floors, lifts);
  window.scrollTo(0, document.body.scrollHeight);
});

simulation.addEventListener("click", liftRequestHandler);
