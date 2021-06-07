window.onload = function () {
    var score = document.getElementById('score')
    var stage = document.getElementById("stage");
    var context = stage.getContext("2d");
    document.addEventListener("keydown", keyPush);
    setInterval(game, 80);

    const vel = 1;          //speed
    var cont = 0;           //score
    var maxscore = cont;    //high score
    var vx = vy = 0;        //velocity
    var px = 10;            //starting point  x
    var py = 15;            //starting point  y
    var tp = 20;            //size of pieces
    var qp = 30;            //number of pieces
    var ax = ay = 15;       //apple position


    var trail = [];
    tail = 4;


    function game() {

        px += vx;
        py += vy;

        if (px < 0) {
            px = qp - 1;
        }
        if (px > qp - 1) {
            px = 0;
        }

        if (py < 0) {
            py = qp - 1;
        }

        if (py > qp - 1) {
            py = 0;
        }

        //score
        score.innerHTML = `<h1>High Score : ${maxscore}</h1>`

        //stage
        context.fillStyle = "black";
        context.fillRect(0, 0, stage.width, stage.height);

        // apple
        context.fillStyle = "red";
        context.fillRect(ax * tp, ay * tp, tp, tp);

        //snake
        context.fillStyle = "green";
        for (var i = 0; i < trail.length; i++) {
            context.fillRect(trail[i].x * tp, trail[i].y * tp, tp - 1, tp - 1);

            if (trail[i].x == px && trail[i].y == py) {

                //high score
                if (cont > maxscore) {
                    maxscore = cont;
                }
                score.innerHTML = `<h1>High Score : ${maxscore}</h1>`

                cont = 0;
                vx = vy = 0;
                tail = 4;
            }
        }


        trail.push({ x: px, y: py })
        while (trail.length > tail) {
            trail.shift();
        }

        if (ax == px && ay == py) {
            tail++;
            cont++;
            ax = Math.floor(Math.random() * qp);
            ay = Math.floor(Math.random() * qp);
        }
    }

    // controls
    function keyPush(event) {

        switch (event.keyCode) {
            case 37: //left
                vx = -vel;
                vy = 0;
                break;

            case 38: //up
                vx = 0;
                vy = -vel;
                break;

            case 39: //right
                vx = vel;
                vy = 0;
                break;

            case 40: //down
                vx = 0;
                vy = vel;
                break;


            default:

                break;
        }


    }
}

