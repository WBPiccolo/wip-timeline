const plantesURL = 'https://swapi.dev/api/planets';
let planets = [];
init();

async function init() {
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
            const planetColor = getColorByClimate(pianeta.climate)
            const timelineElement = document.createElement('div')
            timelineElement.classList.add('container', direction);
            const elementTemplate = `
                <div class="content">
                    <span class="planetTitle"><i class="fas fa-globe planetIcon" style="color: ${planetColor}"></i> ${pianeta.name}</span>
                    <p class="planetText">${formatDate(pianeta.created)}</p>
                    <div class="planetBottomText">
                        <i class="far fa-user planetInfo"></i> ${formatPopulation(pianeta.population)} 
                        <i class="far fa-clock planetInfo"></i> ${pianeta.rotation_period} h 
                        <i class="far fa-circle planetInfo"></i> ${pianeta.orbital_period} days 
                        <i class="far fa-map planetInfo"></i> ${pianeta.diameter} km
                    </div>
                </div>
            `;
            timelineElement.innerHTML = elementTemplate;
            timeline.appendChild(timelineElement);
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
    }

    if (isNaN(endDate.getTime())) {
        endDate = new Date();
    }

    startDate.setHours(23, 59, 59, 999);
    endDate.setHours(23, 59, 59, 999);

    getPlanets(plantesURL).then((resPlanets) => {
        planets = resPlanets;
        const filteredPlanets = planets.filter((planet) => {
            const creationDate = new Date(planet.created);
            return(creationDate.getTime() >= startDate.getTime()) && (creationDate.getTime() <= endDate.getTime());
        });
        popolaTimeline(filteredPlanets)
    });

}

function formatDate(dateString) {
    const formattedDate = new Date(dateString);
    if (isNaN(formattedDate.getTime())) {
        return '';
    }
    return formattedDate.toLocaleString();
}

function formatPopulation(x) {
    if (isNaN(x)) {
        return x + '';
    }

    if (x < 9999) {
        return x;
    }

    if (x < 1000000) {
        return Math.round(x / 1000) + "K";
    }
    if (x < 10000000) {
        return(x / 1000000).toFixed(2) + "M";
    }

    if (x < 1000000000) {
        return Math.round((x / 1000000)) + "M";
    }

    if (x < 1000000000000) {
        return Math.round((x / 1000000000)) + "B";
    }

    if (x < 1000000000000000000) {
        return Math.round((x / 1000000000000)) + "T";
    }

    if (x < 1000000000000000000000000) {
        return Math.round((x / 1000000000000000000)) + "Q";
    }

    return '>10^24'
}


function getColorByClimate(climate){
    const climatesMap = {
        arid: 'BlanchedAlmond', 
        temperate: 'DarkGreen', 
        frozen: 'CadetBlue',
        murky: 'Cornsilk', 
        hot: 'Coral', 
        tropical: 'MediumAquaMarine', 
        artificial: 'AliceBlue', 
        frigid: 'CornflowerBlue', 
        polluted: 'DarkSlateBlue', 
        unknown: 'Black', 
        superheated: 'Tomato'
    };
    if(climatesMap[climate]){
        return climatesMap[climate];
    }
    return '';
}