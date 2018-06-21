import {light} from '../json/mechlist.json';
import {medium} from '../json/mechlist.json';
import {heavy} from '../json/mechlist.json';
import {assault} from '../json/mechlist.json';
import {mechMAP} from '../json/mechMAP.js';

/*global fetch*/
function goFetch(location) {
    return fetch(location, {
            headers: {'content-type': "application/json"},
            mode: 'no-cors'
    }).then(function(response) {
            return response.json();
        }).then(function(json) {
            return json;
        });
}

export function fetchMechList(weightClass) {
    //console.log("fetching " + weightClass + " mechs");
    switch(weightClass){
      case "Light":
         //console.log(light);
         return light;
      case "Medium":
         //console.log(medium);
         return medium;
      case "Heavy":
         //console.log(heavy);
         return heavy;
      case "Assault":
         //console.log(assault);
         return assault;
      default:
         //console.log(light);
         return light;
    }
}

export function fetchMechData(mechFrame) {
    //console.log("fetching data for currently selected mech");
    let dataLocation = mechMAP[mechFrame];
    dataLocation = '/model/mech_data/' + dataLocation;
    let thisMechData = goFetch(dataLocation).then(function(data) {return data});
    return thisMechData;
}
