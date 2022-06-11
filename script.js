const container = document.querySelector(".container");
const seats = document.querySelectorAll(".rows .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

//If data is saved in browser, populate
populateUI();
let ticketPrice = +movieSelect.value;

//setting selected movie and ticket price to local storage
function setMovieData(selectedMovieIndex, ticketPrice) {
  localStorage.setItem("selectedMovieIndex", selectedMovieIndex);
  localStorage.setItem("ticketPrice", ticketPrice);
}

function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".rows .seat.selected");
  // getting index of selected seats into an array
  const seatIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));
  //saving seatIndex array to local storage
  localStorage.setItem("selectedSeatsIndex", JSON.stringify(seatIndex));

  const selectedSeatsCount = selectedSeats.length;
  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;

  setMovieData(movieSelect.selectedIndex, movieSelect.value);
}
//populate UI with saved items
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeatsIndex"));
  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }
  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");

  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

//Movie select event listner
movieSelect.addEventListener("change", (e) => {
  ticketPrice = +e.target.value;
  //saving selected movie to local storage
  setMovieData(e.target.selectedIndex, +e.target.value);
  updateSelectedCount();
});

//e.target.classList returns an array of classes to which that element belongs
//e.target.classList.toggle("selected"); =>  just adds and removes class on successive events(click)

container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");
  }

  updateSelectedCount();
});
updateSelectedCount();
