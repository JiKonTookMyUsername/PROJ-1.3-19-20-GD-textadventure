const divLocation = document.getElementById('location');
const myPossibilities = document.getElementById('possibilities');
const myInput = document.getElementById('myInput');
const feedback = document.getElementById('feedback');
const imageLocation = document.getElementById('imageLocation');
const myDescription = document.getElementById('description');
const myInventory = document.getElementById('inventory');
const treasure = document.getElementById('treasure');

let currentLocation = 4;

let locations = [];
locations[0] = "Ending";
locations[1] = "The elevator";
locations[2] = "Now, that's a cool toy";
locations[3] = "Shiny shotgun";
locations[4] = "Welcome, doomguy";
locations[5] = "First encounter";
locations[6] = "Too soon";


images = [];
images[0] = "ending.png";
images[1] = "elevator.png";
images[2] = "find_toy.png";
images[3] = "shotgun_received.png";
images[4] = "starting_point.png";
images[5] = "first_forward.png";
images[6] = "bad_ending.png";


treasures = [];
treasures[2] = "cool toy";

treasureImages = [];
treasureImages[2] = "cool_toy.png";

inventoryTreasures = [];

directions = [];
directions[0] 
directions[1] = ["path"];
directions[2] = ["path"];
directions[3] = ["path"];
directions[4] = ["backward", "forward"];
directions[5] = ["backward", "forward"];
directions[6] = ["pinky"];


descriptions = [];
descriptions[0] = "<strong>You arrived at Pinky's area, with a cool toy and shotgun.<br> You completed your mission by finishing off Pinky. ";
descriptions[1] = "<strong>You're walking to the elevator that brings you to Pinky";
descriptions[2] = "<strong>You are proudly walking with your hard earned shotgun towards Pinky<br>Something shines in the left corner of your eye...it's a cool toy!<br>You should definetly pick it up.";
descriptions[3] = "<strong>Good<br> You have found the shotgun, all you need is a cool toy.";
descriptions[4] = "<strong>You have only 1 objective: KILL THE LAST PINKY (with a shotgun) <br> NOTE: You have to find a shotgun in order to kill the last Pinky.";
descriptions[5] = "<strong>You meet 2 soldiers guarding the hallway, you put them out of their misery.";
descriptions[6] = "<strong>You arrived sooner than expected <br> Even Pinky is suprised you arrived this soon. <br> You didn't bring a shotgun with you thus can't you finish off Pinky <br> Good guy Pinky wants to give you a second chance, all you have to do is say please";

myInput.addEventListener('keydown', getInput, false);

function getInput(evt) {
  if (evt.key == "Enter") {
    let inputArray = myInput.value.split(" ");

    if (inputArray[0] == "path" || "please" || "pickup") {
      if (directions[currentLocation].indexOf(inputArray[1]) != -1) {
        switch (inputArray[1]) {
          case "backwards":
            currentLocation -= 1;
            break;
          case "forwards":
            currentLocation += 1;
            break;
            case "pinky":
              currentLocation -= 3;
            break;
            case "path":
              currentLocation -= 1;
            break;
            case "pickup":
              currentLocation;
        }
      } else {
        feedback.innerHTML = "nice";
        setTimeout(removeFeedback, 2000);

      }
      giveLocation();
      myInput.value = "";
    }

    if (inputArray[0] == "pickup") {
      console.log('You found a cool toy');
      myInput.value = "";
      if (treasureAanwezig){
        console.log('Picked up cool toy')
    
        pakTreasure(currentLocation);
        giveLocation();
      }
    }

    if (inputArray[0] != "walk" && inputArray[0] != "pickup" && inputArray[0] != "use" && "please" && inputArray[0] != "pickup" ){
      feedback.innerHTML = "Try: walk path ";
      myInput.value = "";
      setTimeout(removeFeedback, 4000);
    }

  }
}

function giveLocation() {
  divLocation.innerHTML = locations[currentLocation];
  myDescription.innerHTML = descriptions[currentLocation];
  imageLocation.src = "media/" + images[currentLocation];
  myDirections = "Available option(s): ";
  for (let i = 0; i < directions[currentLocation].length; i++) {
    myDirections += "<li>" + directions[currentLocation][i] + "</li>";
  }
  myDirections += checkTreasure(currentLocation);
  myPossibilities.innerHTML = myDirections;

  if(inventoryTreasures.length > 0){
    myInventory.innerHTML = "<h4>You now have a </h4>";
    inventoryTreasures.forEach(showInventory);
    function showInventory(item , index){
      myInventory.innerHTML += "<strong>" + item;
    }
  }
  else {
    myInventory.innerHTML = "<br>Extra: find a cool toy. ";
  }

  showTreasure(currentLocation);
  
}

// added function
function pakTreasure(currentLocation){
  inventoryTreasures.push(treasures[currentLocation]);
  treasures[currentLocation] = "";
  giveLocation() ;
}


// added function with a if-else statement
function checkTreasure(currentLocation){
  if(typeof treasures[currentLocation] != "undefined" && treasures[currentLocation] != ""){
    console.log(treasures[currentLocation]);
    treasure.src = "treasures/" + treasureImages[currentLocation];
    let treasureText = "<br><h3>You can now pickup:<br> " + treasures [currentLocation] + "</h4><br>";
    treasureAanwezig = true;
    return treasureText;
  }
  else {
    treasure.src = "";
    treasureAanwezig = false;
    return "";
  }
}



// added function:
function showTreasure(currentLocation){
  if(typeof treasures[currentLocation] != "undefined") {
    console.log(treasure[currentLocation]);
    treasure.src = "treasures/" + treasureImages [currentLocation]; 
  }
}

function removeFeedback() {
  feedback.innerHTML = "";
}

giveLocation();
