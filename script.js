init();

async function init() {
    const plantesURL = 'https://swapi.dev/api/planets';
    getPlanets(plantesURL).then((planets) => {
        popolaTimeline(planets)
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
    console.log(planets);
    let planetList = document.getElementById('listapianeti');
    planets.forEach(pianeta => {
        planetList.innerHTML += pianeta.name
    });
    
}