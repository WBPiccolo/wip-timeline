(()=>{var e={10:e=>{function t(e,t,n,a,r,o,i){try{var c=e[o](i),s=c.value}catch(e){return void n(e)}c.done?t(s):Promise.resolve(s).then(a,r)}function n(e){return function(){var n=this,a=arguments;return new Promise((function(r,o){var i=e.apply(n,a);function c(e){t(i,r,o,c,s,"next",e)}function s(e){t(i,r,o,c,s,"throw",e)}c(void 0)}))}}function a(){return(a=n(regeneratorRuntime.mark((function e(t){var n,a,r,o;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n=[],a=t;case 2:if(!a){e.next=13;break}return e.next=5,fetch(a);case 5:return r=e.sent,e.next=8,r.json();case 8:o=e.sent,a=o.next,n=n.concat(o.results),e.next=2;break;case 13:return n.sort((function(e,t){var n=new Date(e.created),a=new Date(t.created);return n.getTime()>=a.getTime()?1:-1})),e.abrupt("return",n);case 15:case"end":return e.stop()}}),e)})))).apply(this,arguments)}e.exports={searchPlanets:function(){var e=document.getElementById("start").value,t=document.getElementById("end").value,n=new Date(e),r=new Date(t);isNaN(n.getTime())&&(n=new Date),isNaN(r.getTime())&&(r=new Date),n.setHours(23,59,59,999),r.setHours(23,59,59,999),function(e){return a.apply(this,arguments)}("https://swapi.dev/api/planets").then((function(e){!function(e){var t=document.getElementById("noPlanetsFound");t.style.display="none";var n=document.getElementById("timeline");n.innerHTML="",e.length>0?e.forEach((function(e,t){var a,r,o=t%2?"right":"left",i=(r={arid:"BlanchedAlmond",temperate:"DarkGreen",frozen:"CadetBlue",murky:"Cornsilk",hot:"Coral",tropical:"MediumAquaMarine",artificial:"AliceBlue",frigid:"CornflowerBlue",polluted:"DarkSlateBlue",unknown:"Black",superheated:"Tomato"})[a=e.climate]?r[a]:"",c=document.createElement("div");c.classList.add("container",o);var s,l,u,d='\n                <div class="content">\n                    <span class="planetTitle"><i class="fas fa-globe planetIcon" style="color: '.concat(i,'"></i> ').concat(e.name,'</span>\n                    <p class="planetText">').concat((l=e.created,u=new Date(l),isNaN(u.getTime())?"":u.toLocaleString()),'</p>\n                    <div class="planetBottomText">\n                        <i class="far fa-user planetInfo"></i> ').concat((s=e.population,isNaN(s)?s+"":s<9999?s:s<1e6?Math.round(s/1e3)+"K":s<1e7?(s/1e6).toFixed(2)+"M":s<1e9?Math.round(s/1e6)+"M":s<1e12?Math.round(s/1e9)+"B":s<1e18?Math.round(s/1e12)+"T":s<1e24?Math.round(s/1e18)+"Q":">10^24"),' \n                        <i class="far fa-clock planetInfo"></i> ').concat(e.rotation_period,' h \n                        <i class="far fa-circle planetInfo"></i> ').concat(e.orbital_period,' days \n                        <i class="far fa-map planetInfo"></i> ').concat(e.diameter," km\n                    </div>\n                </div>\n            ");c.innerHTML=d,n.appendChild(c)})):t.style.display="block"}(e.filter((function(e){var t=new Date(e.created);return t.getTime()>=n.getTime()&&t.getTime()<=r.getTime()})))}))}}}},t={};!function n(a){var r=t[a];if(void 0!==r)return r.exports;var o=t[a]={exports:{}};return e[a](o,o.exports,n),o.exports}(10)})();