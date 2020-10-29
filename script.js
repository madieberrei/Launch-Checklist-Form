// Load Window
window.addEventListener("load", function() {
   // Form
   let form = document.querySelector("form");
   form.addEventListener("submit", function(event) {
      let pilotName = document.querySelector("input[name=pilotName]");
      let copilotName = document.querySelector("input[name=copilotName]");
      let fuelLevelInput = document.querySelector("input[name=fuelLevel]");
      let cargoMassInput = document.querySelector("input[name=cargoMass]");
      
      console.log(pilotName.value);

      // Alerts
      if ((pilotName.value === '')|| (copilotName.value === '')||(fuelLevelInput.value === '') || (cargoMassInput.value === '')) {
         alert("All fields required!");
         event.preventDefault();
      } else if (isNaN(pilotName.value) === false || isNaN(copilotName.value) === false) {
         alert("Please enter valid name for Pilot Name and/or Co-pilot Name");
         event.preventDefault();
      } else if (isNaN(fuelLevelInput.value) === true || isNaN(cargoMassInput.value) === true) {
         alert("Please enter valid number for Fuel Level and/or Cargo Mass");
         event.preventDefault();
      } else {
         document.getElementById("pilotStatus").innerHTML = "Pilot " + pilotName.value + " Ready";
         document.getElementById("copilotStatus").innerHTML = "Co-pilot " + copilotName.value + " Ready";
         if (fuelLevelInput.value <= 10000) {
            document.getElementById("faultyItems").style.visibility = "visible";
            document.getElementById("launchStatus").innerHTML = "Shuttle Not Ready for Launch";
            document.getElementById("launchStatus").style.color = "red";
            document.getElementById("fuelStatus").innerHTML = "Fuel level too low for launch";
         } else {
            document.getElementById("fuelStatus").innerHTML = "Fuel level high enough for launch";
         }
         if (cargoMassInput.value >= 10000) {
            document.getElementById("faultyItems").style.visibility = "visible";
            document.getElementById("launchStatus").innerHTML = "Shuttle Not Ready for Launch";
            document.getElementById("launchStatus").style.color = "red";
            document.getElementById("cargoStatus").innerHTML = "Cargo mass too high for launch";
         } else {
            document.getElementById("cargoStatus").innerHTML = "Cargo mass low enough for launch";
         }
         if (cargoMassInput.value <= 10000 && fuelLevelInput.value >= 10000) {
            document.getElementById("launchStatus").innerHTML = "Shuttle Ready for Launch";
            document.getElementById("launchStatus").style.color = "green";
            document.getElementById("cargoStatus").innerHTML = "Cargo mass low enough for launch";
            document.getElementById("faultyItems").style.visibility = "hidden";
         }
         event.preventDefault();
      }
   });

   this.fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response) {
      response.json().then(function(json) {
         const missionTargetDiv = document.getElementById("missionTarget");
         const randomPlanet = Math.round(Math.random()*5);
         missionTargetDiv.innerHTML = `
         <h2>Mission Destination</h2>
         <ol>
            <li>Name: ${json[randomPlanet].name}</li>
            <li>Diameter: ${json[randomPlanet].diameter}</li>
            <li>Star: ${json[randomPlanet].star}</li>
            <li>Distance from Earth: ${json[randomPlanet].distance}</li>
            <li>Number of Moons: ${json[randomPlanet].moons}</li>
         </ol>
         <img src="${json[randomPlanet].image}">
         `;
      });
   });
}); 


