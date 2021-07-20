function onloadFunction() {
  alert("Pagina a fost incarcata cu succes!");
}


localStorage.clear();


var el_up = document.getElementById("up");
var el_down = document.getElementById("down");
var str = "Click pentru a schimba culoarea background-ului!";
el_up.innerHTML = str;


function changeColor(color) {
  document.body.style.background = color;
}
  

function up_Run() {
  changeColor('#D3EAD9');
} 


window.APP = {};
window.mainPage = document.querySelector('#root');


APP.films = [
	{
	name: "The Superdeep",
	description: "A small research team went down below the surface to find out what secret the world's deepest borehole was hiding. What they have found turned out to be the greatest threat in history. And the future of humanity is in their hands.",
  year: 2020,
  rate: 4.9,
  dateAdd: "04.11.2020",
  img: "https://m.media-amazon.com/images/M/MV5BZjcyYjNlNTMtNDEwZC00ZmJmLTg2ZjgtY2VkMTQyMTg4MjM1XkEyXkFqcGdeQXVyODc2MzQzNTI@._V1_SX300.jpg",
	},

	{
	name: "Interstellar",
  description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
	year: 2014,
  rate: 8.6,
  dateAdd:"03.11.2014",
  img: "https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
  },

	{
	name: "The Father",
  description: "A man refuses all assistance from his daughter as he ages. As he tries to make sense of his changing circumstances, he begins to doubt his loved ones, his own mind and even the fabric of his reality",
	year: 2020,
  rate: 8.3,
  dateAdd:"26.02.2021",
  img:"https://m.media-amazon.com/images/M/MV5BZGJhNWRiOWQtMjI4OS00ZjcxLTgwMTAtMzQ2ODkxY2JkOTVlXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg",
	}
];


APP.addFilms = (films) => {
	localStorage.setItem("films", JSON.stringify(films));
}


APP.getFilms = () => {
	const films = localStorage.getItem("films");
	return JSON.parse(films);
};

if (APP.getFilms() === null){
	APP.addFilms(APP.films);
}


function startRendering() {

	APP.renderFilmList(APP.getFilms());
}


window.addEventListener('load', startRendering);





function addFormFunctionality() {

  function addFilm(nameP, descriptionP, yearP, rateP, dateAddP, imgP ) {
   
    const films = APP.getFilms();
    
    films.push({
      name: nameP,
      description: descriptionP,
      year : yearP,
      rate : rateP,
      dateAdd: dateAddP,
      img: imgP
    });

    APP.addFilms(films);

    APP.renderFilmList(films);
  }

  const form = document.querySelector('#addFilm');
  form.onsubmit = function(event) {

    event.preventDefault();

    const name = event.target.filmName.value;
    const description = event.target.filmDes.value;
    const year = event.target.filmYear.value;
    const rate = event.target.filmRate.value;
    const dateAdd = event.target.filmDate.value;
    const img = event.target.filmImg.value;

    addFilm(name, description, year, rate, dateAdd, img);
  }
}


window.addEventListener('load', addFormFunctionality);



class Film {

	constructor(name, description, year, rate, dateAdd, img) {
		this.name = name;
		this.description = description;
    this.year = year;
    this.rate = rate;
    this.dateAdd = dateAdd;
    this.img = img;
	}
	
	renderFilm() {
		const filmList = document.querySelector('#film-list');
		filmList.innerHTML += `
			<div class="film">
				<p>Nume: ${this.name}</p>
				<p>Descriere: ${this.description}</p>
        <p>An: ${this.year}</p>
        <p>Rating: ${this.rate }</p>
      	<p>Data adaugare: ${this.dateAdd}</p>
        <left><img src= ${this.img} width=200></left>
			</div>
		`;
	}
}



APP.renderFilmList = (filmArray) => {

	const filmList = document.querySelector('#film-list');
  filmList.innerHTML = '';

	filmArray.forEach( (elem) => {
   film = new Film(elem.name, elem.description, elem.year, elem.rate, elem.dateAdd, elem.img);
	 film.renderFilm();

	});
}



function sortByN(sortType) {
  switch(sortType) {

    case "sortByName":
      const sortedArray = APP.getFilms().sort((elem1, elem2) => {
        if(elem1.name < elem2.name) {
          return -1;
    
        } else if (elem1.name > elem2.name) {
          return 1;
   
        } else {
          return 0;
        }
   
      });
  
    APP.addFilms(sortedArray);
    APP.renderFilmList(sortedArray);
    break;
  }
}


const sortByName = document.querySelector('#sortByName');
sortByName.addEventListener('click', function() {
  sortByN('sortByName');
})



function sortByY(sortType) {
  switch(sortType) {

    case "sortByYear":
      const sortedArray = APP.getFilms().sort((elem1, elem2) => {
        if(elem1.year < elem2.year) {
          return -1;
        
        } else if (elem1.year > elem2.ryear) {
          return 1;
    
        } else {
          return 0;
        }
       
      });

    APP.addFilms(sortedArray);
    APP.renderFilmList(sortedArray);
    break;
  }
}


const sortByYear = document.querySelector('#sortByYear');
sortByYear.addEventListener('click', function() {
  sortByY('sortByYear');
})

function sortByR(sortType) {
  switch(sortType) {

    case "sortByRate":
      const sortedArray = APP.getFilms().sort((elem1, elem2) => {
        if(elem1.rate > elem2.rate) {
          return -1;

        } else if (elem1.rate < elem2.rate) {
          return 1;
    
        } else {
          return 0;
        }
   
      });
    
    APP.addFilms(sortedArray);
    APP.renderFilmList(sortedArray);
    break;
  }
}

const sortByRate = document.querySelector('#sortByRate');
sortByRate.addEventListener('click', function() {
  sortByR('sortByRate');
})


function sortByD(sortType) {
  switch(sortType) {
    
    case "sortByDateAdd":
      const sortedArray = APP.getFilms().sort((elem1, elem2) => {
        if(elem1.dateAdd > elem2.dateAdd) {
          return -1;
  
        } else if (elem1.dateAdd < elem2.dateAdd) {
          return 1;
      
        } else {
          return 0;
        }
    
      });
    
    APP.addFilms(sortedArray);
    APP.renderFilmList(sortedArray);
    break;
  }
}


const sortByDateAdd = document.querySelector('#sortByDateAdd');
sortByDateAdd.addEventListener('click', function() {
  sortByD('sortByDateAdd');
})
