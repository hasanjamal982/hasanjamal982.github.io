var playing = false;
var score;
var trialsLeft;
var fruits = ['apple', 'banana', 'cherries', 'grapes', 'mango', 'orange', 'peach', 'pear', 'watermelon'];
var step;
var action;

$(function(){
    
//click the start reset button
   $("#startreset").click(function(){
       
        //are u playing?
        if(playing == true){//yes
            
            //reload page
            location.reload();
            
          }else{//no
              playing = true;
              
              //set score to 0
              score = 0;
              $("#scoreValue").html(score);
              
              //show trial left box
              $("#trialsLeft").show();
              trialsLeft = 3;
              addHearts();
              
            //change button text to reset game
              $("#startreset").html("Reset Game");
              $("#startreset").attr("title","Click me !! for Reset the Game");
              
              //start sending fruit
              startAction();
              
              //hide game over box
              $("#gameOver").hide();
          }
   });
  
    //add heart
    function addHearts(){

        $("#trialsLeft").empty();
        for(i = 0; i<trialsLeft; i++){
            $("#trialsLeft").append('<img src="images/heart.png" class="life">');
        }
    }

    //start sending fruits
    function startAction(){

        //generate a fruit
       $("#fruit1").show();
        chooseFruit();//choose a radom fruit

        //random position
        $("#fruit1").css({'left' : Math.round(550*Math.random()), 'top' : -50});

        //generate a random step
        step = 2+ Math.round(5*Math.random());//change step

        //move fruit down by one step every 10ms
        action = setInterval(function(){
         $("#fruit1").css('top',$("#fruit1").position().top + step);

            //check if the fruit is low
            if($("#fruit1").position().top > $("#fruitsContainer").height()){
                //check if have trials left?
                if(trialsLeft>1){
                        //generate a fruit
                   $("#fruit1").show();
                    chooseFruit();//choose a radom fruit

                    //random position
                    $("#fruit1").css({'left' : Math.round(550*Math.random()), 'top' : -50});

                    //generate a random step
                    step = 1+ Math.round(5*Math.random());//change step

                    //reduce trials by one
                    trialsLeft--;

                    //populate trialsleft box
                    addHearts();

                }else{//game over
                    playing = false;
                    $("#gameOver").show();
                    $("#gameOver").html('<p>Game Over!</p><p>Your Score is: ' + score + '</p>');
                    $("#startreset").html("Start Game");
                    $("#startreset").attr("title","Click me !! for Start the Game");
                    $("#trialsLeft").hide();
                    stopAction();
                }
            }
        },10);
    }

    function chooseFruit(){
        $("#fruit1").attr('src','images/' + fruits[Math.round(8*Math.random())] + '.png');
        
    }

    //stop interval
    function stopAction(){
        clearInterval(action);
        $("#fruit1").hide();
    }
    
     //slice fruit
    $("#fruit1").mousemove(function(){
        score++;
        $("#scorevalue").html(score);
//        document.getElementById("sliceSound").play();
        $("#sliceSound")[0].play();
        
        //stop fruit 
        clearInterval(action);
    
        //hide fruits
        $("#fruit1").hide("explode", 400);
        
        //send new fruit
        setTimeout(startAction, 400);
        
    });
$("#startreset").tooltip({
	show: {effect:"fadeDown"},
	hide: {effect:"explode"}
	});
});











