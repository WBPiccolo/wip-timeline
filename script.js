//import {PlanetElement} from './planetElement.js'
let planets = [];
init();

async function init() {
    const plantesURL = 'https://swapi.dev/api/planets';
    getPlanets(plantesURL).then((resPlanets) => {
        planets = resPlanets;
        popolaTimeline(resPlanets)
    });
}

async function getPlanets(apiURL) {

    let planets = [];
    let url = apiURL;
    while (url) {
        let response = await fetch(url);
        let json = await response.json();
        url = json.next;
        planets = planets.concat(json.results);
    }
    planets.sort((a, b) => {
        const aDate = new Date(a.created);
        const bDate = new Date(b.created);
        return aDate.getTime() >= bDate.getTime() ? 1 : -1;
    });
    return planets;

}

function popolaTimeline(planets) {
    const noPlanetsFound = document.getElementById('noPlanetsFound');
    noPlanetsFound.style.display = 'none';
    const timeline = document.getElementById('timeline');
    timeline.innerHTML = '';
    if (planets.length > 0) {
        planets.forEach((pianeta, index) => {
            const direction = index % 2 ? 'right' : 'left';
            const planetContainer = document.createElement('div');
            planetContainer.classList.add('container', direction);
            const planetContent = document.createElement('div');
            planetContent.classList.add('content');
            const planetLine = document.createElement('h2');
            planetLine.innerText = pianeta.name;
            const planetDate = document.createElement('p');
            planetDate.innerText = pianeta.created;

            planetContent.appendChild(planetLine);
            planetContent.appendChild(planetDate);
            planetContainer.appendChild(planetContent);
            timeline.appendChild(planetContainer);

        });
    } else {
        noPlanetsFound.style.display = 'block';
    }
}

function invertPlanets() {
    popolaTimeline(planets.reverse());
}

function searchPlanets() {
    const startValue = document.getElementById('start').value;
    const endValue = document.getElementById('end').value;
    let startDate = new Date(startValue);
    let endDate = new Date(endValue);
    
    if (isNaN(startDate.getTime())) {
        startDate = new Date();
        //document.getElementById('startDateError').innerHTML = 'La data non è valorizzata correttamente';
        //return;
    }

    if (isNaN(endDate.getTime())) {
        endDate = new Date();
        //document.getElementById('endDateError').innerHTML = 'La data non è valorizzata correttamente';
        //return;
    }

    startDate.setHours(23, 59, 59, 999);
    endDate.setHours(23, 59, 59, 999);

    const filteredPlanets = planets.filter((planet) => {
        const creationDate = new Date(planet.created);
        return(creationDate.getTime() >= startDate.getTime()) && (creationDate.getTime() <= endDate.getTime());
    });

    popolaTimeline(filteredPlanets);

}
