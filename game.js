//IIFE
(() => {

    //Assign test/random URLs to varibales for easy swapping
    const testURL = "https://threeinarowpuzzle.herokuapp.com/sample";
    const randomURL = "https://threeinarowpuzzle.herokuapp.com/random";
    
    //Fetch puzzle data
    fetch(testURL)
    .then((response) => response.json())
    .then((data) => {

        //Store puzzle data into an array
        let tiles = data;

        //Select div element that will hold the game
        let puzzleNode = document.querySelector("#theGame");

        //Create a table node to add the puzzle tiles to
        let tableNode = document.createElement("table");
        tableNode.id = "gameTable";
         
        //Add table element to the game div
        puzzleNode.appendChild(tableNode);

        //Add puzzle tiles to the table
        for (let i = 0; i < tiles.rows.length; i++){

            //Create a new row for each subset of tiles
            let newRow = document.createElement("tr");
            newRow.id = i;
            tableNode.appendChild(newRow);

            //Create table cell for each tile
            for (let j = 0; j < tiles.rows.length; j++){

                let newTile = document.createElement("td");

                newTile.className = "tile";
                newTile.setAttribute("correctState", tiles.rows[i][j].correctState);
                newTile.setAttribute("currentState", tiles.rows[i][j].currentState);
                
                if (tiles.rows[i][j].currentState == 0){
                    newTile.style.backgroundColor = "gray";
                }

                if (tiles.rows[i][j].currentState == 1){
                    newTile.style.backgroundColor = "blue";
                }

                if (tiles.rows[i][j].currentState == 2){
                    newTile.style.backgroundColor = "white";
                }

                if (tiles.rows[i][j].canToggle == false){
                    newTile.id = "cantClick";
                }
                else if(tiles.rows[i][j].canToggle == true){
                    newTile.id = "canClick";
                }

                //Add tile to the table
                newRow.appendChild(newTile);
            }
        }

        //Add button to check tiles
        let checkButton = document.createElement("button");
        checkButton.id = "checkButton";
        checkButton.innerHTML = "Check Tiles";
        puzzleNode.appendChild(checkButton);

        //Add element to display completion message
        let checkMessage = document.createElement("label");
        checkMessage.id = "checkMessage";
        checkMessage.htmlFor = "checkButton";
        puzzleNode.appendChild(checkMessage);

        //Add checkbox to show incorrect tiles;
        let showTiles = document.createElement("input");
        showTiles.id = "showTiles";
        showTiles.type = "checkbox";
        document.body.appendChild(showTiles);

        //Label for checkbox
        let showLabel = document.createElement("label");
        showLabel.htmlFor = "showTiles";
        showLabel.innerHTML = "Show Incorrect Tiles";
        document.body.appendChild(showLabel);

        //Add event listeners
        let canClick = document.querySelectorAll("#canClick");
        let allTiles = document.querySelectorAll(".tile");

        //Add event listener to toggle clickable tiles between states
        canClick.forEach(element => element.addEventListener("click", function() {

            if (this.getAttribute("currentState") == 0){
                this.style.backgroundColor = "blue";
                this.setAttribute("currentState", 1);
            }
            else if (this.getAttribute("currentState") == 1){
                this.style.backgroundColor = "white";
                this.setAttribute("currentState", 2);
            }
            else if (this.getAttribute("currentState") == 2){
                this.style.backgroundColor = "gray";
                this.setAttribute("currentState", 0);
            }

        }))

        //Check if all tiles are correct
        document.querySelector("#checkButton").addEventListener("click", function() {

            let correctTiles = 0;
            let incorrectTiles = 0;

            //Check is each tile is in its correct state
            allTiles.forEach(tile => {
                if (tile.getAttribute("currentState") == tile.getAttribute("correctState")){
                    correctTiles += 1;
                }
                else if((tile.getAttribute("currentState") != tile.getAttribute("correctState") && tile.getAttribute("currentState") != 0)){
                    incorrectTiles += 1;
                }
            })

            //Display message accordingly
            if (correctTiles == allTiles.length){
                checkMessage.innerHTML = "You did it!!!";
            }
            else if(incorrectTiles > 0){
                checkMessage.innerHTML = "Something is wrong.";
            }
            else if(correctTiles >= 1 && correctTiles < allTiles.length && incorrectTiles == 0){
                checkMessage.innerHTML = "So far so good!";
            }
        })

        //Show incorrect tiles
        document.querySelector("#showTiles").addEventListener("click", function() {

            if (this.checked == true){
                allTiles.forEach(tile => {

                    if (tile.getAttribute("currentState") != tile.getAttribute("correctState")){
                        tile.style.border = "2px solid red";
                    }
                    else {
                        tile.style.border = "2px solid black";
                    }
                })
            }
            else {
                allTiles.forEach(tile => tile.style.border = "2px solid black")
            }
        })

        //Innovative Feature - Simple JS audio tutorial followed from: https://www.youtube.com/watch?v=30PvYhVKNGg&t=395s
        let audioNode = document.createElement("audio");
        audioNode.id = "audioNode";
        audioNode.src = "nonCopyRightElevatorMusic.mp3"; //Downloaded from: https://www.youtube.com/watch?v=ioi_-5sAuXQ&t=525s
        audioNode.loop = "loop";
        audioNode.autoplay = "autoplay";
        document.body.appendChild(audioNode);

        //Add script to run innovative feature
        let aduioScript = document.createElement("script");
        aduioScript.innerHTML = "window.onload = function(){ document.getElementById('audioNode').play();}"
        document.body.appendChild(aduioScript);

        //Add button to stop music
        let playPauseButton = document.createElement("button");
        playPauseButton.id = "playPause";
        playPauseButton.innerHTML = "Play / Pause Music";
        document.body.appendChild(playPauseButton);

        //Variable to determine if music is playing
        let isPlaying = true;

        //Add event listener for play/pause music button
        document.querySelector("#playPause").addEventListener("click", function() {

            if(isPlaying == true){
                document.getElementById('audioNode').pause();
                isPlaying = false;
            }
            else{
                document.getElementById('audioNode').play();
                isPlaying = true;
            }        
        })
    });
})();
