import './styles/styles.css';
import html from './timeline.html';
import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'
import '@fortawesome/fontawesome-free/js/regular'
import '@fortawesome/fontawesome-free/js/brands'

import {init, searchPlanets} from './script';

const timeline = document.createElement('div');
timeline.innerHTML = html;
document.body.appendChild(timeline);
//TODO: importare copia e incolla di script.js, capire come importare google fonts
//https://stackoverflow.com/questions/42708257/google-fonts-webpack

init();