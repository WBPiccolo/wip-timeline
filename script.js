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
    while(url){            
        let response = await fetch(url);
        let json = await response.json();
        url = json.next;
        planets = planets.concat(json.results);
    }
    return planets;

}

function popolaTimeline(planets){
    const timeline = document.getElementById('timeline');
    timeline.innerHTML='';
    planets.forEach((pianeta, index) => {
        const direction = index%2? 'right' : 'left';
        const planetContainer = document.createElement('div');
        planetContainer.classList.add('container',direction);
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
}

function invertPlanets(){
    popolaTimeline(planets.reverse());
}

function searchPlanets(){
    const startValue = document.getElementById('start').value;
    const endValue = document.getElementById('end').value;
    const startDate = new Date(startValue);
    const endDate = new Date(endValue);
    startDate.setHours(23,59,59,999);
    endDate.setHours(23,59,59,999);

    if(isNaN(startDate.getTime())){
        console.log('startDate ko');
        return;
    }

    if(isNaN(endDate.getTime())){
        console.log('endDate ko');
        return;
    }

    const filteredPlanets = planets.filter((planet)=> {
        const creationDate = new Date(planet.created);
        return (creationDate.getTime()>= startDate.getTime())&&(creationDate.getTime()<= endDate.getTime());
    });

    popolaTimeline(filteredPlanets);
    
}