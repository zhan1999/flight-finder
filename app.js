"use strict";

const response = {
   "flightData": [
      {
         "departure": "Antalya",
         "arrival": "Berlin",
         "pax": 10,
		   "price": 143,
         "date": "2023-09-01"
      },
      {
         "departure": "Antalya",
         "arrival": "London",
         "pax": 2,
		   "price": 201,
         "date": "2023-08-08"
      },
      {
         "departure": "Antalya",
         "arrival": "Madrid",
         "pax": 114,
		   "price": 236,		 
         "date": "2023-07-15"
      },
      {
         "departure": "Istanbul",
         "arrival": "Antalya",
         "pax": 56,
		   "price": 28,		 
         "date": "2023-06-10"
      },
      {
         "departure": "Berlin",
         "arrival": "Antalya",
         "pax": 8,
		   "price": 143,		 
         "date": "2023-05-07"
      },
      {
         "departure": "Warsaw",
         "arrival": "New York",
         "pax": 18,
		   "price": 943,		 
         "date": "2023-04-17"
      },
      {
         "departure": "Antalya",
         "arrival": "Stockholm",
         "pax": 3,
		   "price": 96,		 
         "date": "2023-04-07"
      },
      {
         "departure": "Berlin",
         "arrival": "Stockholm",
         "pax": 24,
		   "price": 209,		 
         "date": "2023-03-14"
      },
      {
         "departure": "Warsaw",
         "arrival": "Stockholm",
         "pax": 117,
		   "price": 29,		 
         "date": "2023-02-28"
      },
      {
         "departure": "Berlin",
         "arrival": "Istanbul",
         "pax": 24,
		   "price": 209,		 
         "date": "2023-01-08"
      },
      {
         "departure": "Antalya",
         "arrival": "Madrid",
         "pax": 24,
		   "price": 220,		 
         "date": "2023-03-09"
      },
      {
         "departure": "New York",
         "arrival": "Madrid",
         "pax": 76,
		   "price": 980,		 
         "date": "2023-06-17"
      },     
      {
         "departure": "Warsaw",
         "arrival": "Madrid",
         "pax": 24,
		   "price": 340,		 
         "date": "2023-03-19"
      },
      {
         "departure": "Warsaw",
         "arrival": "London",
         "pax": 86,
		   "price": 440,		 
         "date": "2023-10-19"
      },
      {
         "departure": "New York",
         "arrival": "London",
         "pax": 9,
		   "price": 725,		 
         "date": "2023-03-19"
      },
      {
         "departure": "Warsaw",
         "arrival": "Istanbul",
         "pax": 67,
		   "price": 149,		 
         "date": "2023-11-19"
      },
      {
         "departure": "Stockholm",
         "arrival": "Berlin",
         "pax": 97,
		   "price": 125,		 
         "date": "2023-12-03"
      },
      {
         "departure": "London",
         "arrival": "New York",
         "pax": 245,
		   "price": 1070,		 
         "date": "2023-12-31"
      },
      {
         "departure": "Istanbul",
         "arrival": "London",
         "pax": 124,
		   "price": 400,		 
         "date": "2023-05-25"
      },
      {
         "departure": "London",
         "arrival": "Istanbul",
         "pax": 54,
		   "price": 380,		 
         "date": "2023-05-25"
      },
      {
         "departure": "Stockholm",
         "arrival": "London",
         "pax": 67,
		   "price": 190,		 
         "date": "2023-08-04"
      }
   ]
}


// Fill the departure and arrival airports from JSON. Also the sorter select
function fillForm() {

	const form = document.getElementById('searchForm').elements;
	const departureSelect = form.departure;
	const departureAirports = response.flightData.map(f => f.departure);
	const uniqueDepartureAirports = new Set (departureAirports);
	[...uniqueDepartureAirports].sort().map (dep => {
		const option = document.createElement('option');
		option.innerHTML = dep;
		departureSelect.appendChild(option);
	})

	const arrivalSelect = form.arrival;
	const arrivalAirports = response.flightData.map(f => f.arrival);
	const uniqueArrivalAirports = new Set (arrivalAirports);
	[...uniqueArrivalAirports].sort().map (arr => {
		const option = document.createElement('option');
		option.innerHTML = arr;
		arrivalSelect.appendChild(option);
	})

   const sorterSelect = document.getElementById('sorter');
   const sortingKeys = Object.keys(response.flightData[0]);
	sortingKeys.map(key => {
      const option = document.createElement('option');
      option.value = key;
      option.innerHTML = key.charAt(0).toUpperCase()+key.slice(1);
      sorterSelect.appendChild(option);
	});
}

fillForm();

// Sort select event handler
const sorterSelect = document.getElementById('sorter');
sorterSelect.addEventListener('change', sorterHandler);

function sorterHandler (e) {
   var value = this.value;
   const tableButtons = document.querySelectorAll('th button');
   [...tableButtons].map(b => {
      if (b.id === value)
         b.click();
      });
};

// Fill up the table 
const tableContent = document.getElementById('table-content');

const createRow = (obj) => {
	const row = document.createElement('tr');
	const objKeys = Object.keys(obj);
	objKeys.map(key => {
		const cell = document.createElement('td');
		cell.setAttribute('data-th', key.charAt(0).toUpperCase()+key.slice(1));
      cell.innerHTML = obj[key];
		row.appendChild(cell);
	});
	return row;
};

const getTableContent = (data) => {
	data.map(obj => {
		const row = createRow(obj);
		tableContent.appendChild(row);
	});
};

// Sort data and fill up the table
const sortData = (data, param, direction = 'asc') => {
	tableContent.innerHTML = '';
	const sortedData = 
		direction === 'asc' 
		?	[...data].sort(function(a,b) {
			if (a[param] < b[param]) {
				return -1;
			}
			if (a[param] > b[param]) {
				return 1;
			}
			return 0;
		})
		:	[...data].sort(function(a,b) {
			if (b[param] < a[param]) {
				return -1;
			}
			if (b[param] > a[param]) {
				return 1;
			}
			return 0;
		});

	getTableContent(sortedData);
};

// Reset direction attr of table header buttons 
const tableButtons = document.querySelectorAll('th button');
const resetButtons = (event) => {
	[...tableButtons].map (button => {
		if (button !== event.target) {
			button.removeAttribute('data-dir');
		}
	});
};

// Table header button click event handler
function sortColumn(e) {
	resetButtons(e);

	if (e.target.getAttribute('data-dir') === 'desc'){
		sortData(filteredFlightData, e.target.id, 'desc');
		e.target.setAttribute('data-dir','asc');
	}
	else
	{
		sortData(filteredFlightData, e.target.id, 'asc');
		e.target.setAttribute('data-dir','desc');
	}
};

// Search button click event handler. Filter the data and fill up the table
let filteredFlightData;

function searchFormSubmit(event) {
	
	resetButtons(event);

	const departure = this.departure.value;
	const arrival = this.arrival.value;
	const pax = Number(this.pax.value);
	const firstDate = new Date(this.firstDate.value).getTime();
	const lastDate = new Date(this.lastDate.value).getTime();

	function searchFlights (flight) {
		let date = new Date(flight.date).getTime();

		if 	(((flight.departure === departure ) || (departure === "any")) &&
			((flight.arrival === arrival ) || (arrival === "any")) &&
			((flight.pax >= pax)) && 
			(date > firstDate) &&
			(date < lastDate))
				return true;
	};
	
	filteredFlightData = response.flightData.filter(searchFlights);

	tableContent.innerHTML = '';
	getTableContent(filteredFlightData);

	[...tableButtons].map (button => {
		button.addEventListener('click', sortColumn);   
	});

   document.getElementById('result-table').style.display = 'block';
   document.getElementById('total-found').innerHTML = filteredFlightData.length + ' ';

   event.preventDefault();
};

const form = document.getElementById("searchForm");
form.addEventListener("submit", searchFormSubmit);

