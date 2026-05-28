const drone = document.getElementById("drone");
const gameArea = document.getElementById("gameArea");
const fuelZone = document.getElementById("fuelZone");
const truck = document.getElementById("truck");

const fuelText = document.getElementById("fuel");
const fruitCountText = document.getElementById("fruitCount");
const messageBox = document.getElementById("messageBox");

/* CONTADOR DE FRUTAS COMEÇA OCULTO */
fruitCountText.parentElement.style.display = "none";

let x = 100;
let y = 100;

let speed = 5;

let fuel = 0;
let mission = 1;

let fruitsCollected = 0;
let paintProgress = 0;

/* PRODUTO */
let productAmount = 0;

/* HUD PRODUTO */
const productUI = document.createElement("p");

productUI.style.position = "fixed";
productUI.style.top = "20px";
productUI.style.left = "50%";
productUI.style.transform = "translateX(-50%)";
productUI.style.background = "rgba(0,0,0,0.6)";
productUI.style.padding = "10px 20px";
productUI.style.borderRadius = "10px";
productUI.style.border = "2px solid #00ffaa";
productUI.style.color = "white";
productUI.style.fontWeight = "bold";
productUI.style.zIndex = "9999";
productUI.style.display = "none";

productUI.innerHTML = "Produto: 0%";
document.body.appendChild(productUI);

const keys = {};

document.addEventListener("keydown", (e) => {
    keys[e.key.toLowerCase()] = true;
});

document.addEventListener("keyup", (e) => {
    keys[e.key.toLowerCase()] = false;
});

/* ÁREA DE PULVERIZAÇÃO */
const paintArea = document.createElement("div");

paintArea.style.position = "absolute";
paintArea.style.left = "180px";
paintArea.style.top = "120px";
paintArea.style.width = "500px";
paintArea.style.height = "300px";
paintArea.style.border = "4px dashed white";
paintArea.style.background = "rgba(255,255,255,0.05)";
paintArea.style.zIndex = "1";

gameArea.appendChild(paintArea);

const paintedTiles = [];

/* CONTROLE DE BOTÕES */
let buttonCreated = false;

/* BOTÃO CONTINUAR */
function createContinueButton(nextMission, text){

    const old = document.getElementById("continueBtn");
    if(old) old.remove();

    const button = document.createElement("button");

    button.id = "continueBtn";
    button.innerText = "Continuar";

    button.style.position = "fixed";
    button.style.bottom = "40px";
    button.style.left = "50%";
    button.style.transform = "translateX(-50%)";
    button.style.padding = "18px 40px";
    button.style.border = "none";
    button.style.borderRadius = "14px";
    button.style.background = "#00ffaa";
    button.style.color = "black";
    button.style.fontWeight = "bold";
    button.style.fontSize = "1rem";
    button.style.cursor = "pointer";
    button.style.zIndex = "9999";

    document.body.appendChild(button);

    button.addEventListener("click", () => {

        mission = nextMission;
        messageBox.innerHTML = text;
        button.remove();
        buttonCreated = false;

        /* MISSÃO FRUTAS */
        if(nextMission === 3){

            productUI.style.display = "none";

            paintedTiles.forEach(t => t.remove());
            paintArea.style.display = "none";

            fruitsCollected = 0;
            fruitCountText.parentElement.style.display = "block";
            fruitCountText.innerText = "0";

            for(let i = 0; i < 8; i++){
                createFruit();
            }
        }

        /* VOLTA DO PRODUTO NA PULVERIZAÇÃO */
        if(nextMission === 2){
            productUI.style.display = "block";
        }

    });
}

/* FRUTAS */
const fruits = [];

function createFruit(){

    const emojis = ["🍎","🍌","🍇","🍓","🥕"];

    const fruit = document.createElement("div");
    fruit.classList.add("fruit");

    fruit.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];

    fruit.style.left = (Math.random() * 800 + 40) + "px";
    fruit.style.top = (Math.random() * 500 + 40) + "px";

    gameArea.appendChild(fruit);

    fruits.push({ el: fruit, collected: false });
}

/* LOOP */
function update(){

    if(keys["w"] || keys["arrowup"]) y -= speed;
    if(keys["s"] || keys["arrowdown"]) y += speed;
    if(keys["a"] || keys["arrowleft"]) x -= speed;
    if(keys["d"] || keys["arrowright"]) x += speed;

    if(x < 0) x = 0;
    if(y < 0) y = 0;
    if(x > 910) x = 910;
    if(y > 580) y = 580;

    drone.style.left = x + "px";
    drone.style.top = y + "px";

    /* MISSÃO 1 - ABASTECIMENTO */
    if(mission === 1){

        const fuelRect = fuelZone.getBoundingClientRect();
        const droneRect = drone.getBoundingClientRect();

        if(collide(droneRect, fuelRect)){

            if(fuel < 100){

                fuel += 0.2;
                productAmount += 0.2;

                if(fuel > 100) fuel = 100;
                if(productAmount > 100) productAmount = 100;

                fuelText.innerText = Math.floor(fuel);

            }

            if(fuel >= 100 && !buttonCreated){

                mission = 1.5;
                buttonCreated = true;

                messageBox.innerHTML =
                "✅ Drone abastecido! Clique em continuar.";

                createContinueButton(
                    2,
                    "🌾 Pulverize toda a área."
                );
            }
        }
    }

    /* MISSÃO 2 - PULVERIZAÇÃO */
    if(mission === 2){

        productUI.style.display = "block";

        const areaRect = paintArea.getBoundingClientRect();
        const droneRect = drone.getBoundingClientRect();

        if(collide(droneRect, areaRect) && productAmount > 0){

            const paint = document.createElement("div");

            paint.classList.add("painted");
            paint.style.left = x + "px";
            paint.style.top = y + "px";

            gameArea.appendChild(paint);
            paintedTiles.push(paint);

            paintProgress++;

            productAmount -= 0.1;
            if(productAmount < 0) productAmount = 0;

            productUI.innerHTML =
            "Produto: " + Math.floor(productAmount) + "%";
        }

        if(paintProgress >= 900 && !buttonCreated){

            mission = 2.5;
            buttonCreated = true;

            messageBox.innerHTML =
            "✅ Área pulverizada!";

            createContinueButton(
                3,
                "🍎 Colete frutas."
            );
        }
    }

    /* MISSÃO 3 - FRUTAS */
    if(mission === 3){

        fruits.forEach(f => {

            if(f.collected) return;

            const r1 = f.el.getBoundingClientRect();
            const r2 = drone.getBoundingClientRect();

            if(collide(r1, r2)){

                f.collected = true;
                f.el.remove();

                fruitsCollected++;
                fruitCountText.innerText = fruitsCollected;
            }
        });

        if(fruitsCollected >= 8 && !buttonCreated){

            mission = 3.5;
            buttonCreated = true;

            messageBox.innerHTML = "✅ Frutas coletadas!";

            createContinueButton(
                4,
                "🚚 Leve ao caminhão."
            );
        }
    }

    /* MISSÃO 4 */
    if(mission === 4){

        const t1 = truck.getBoundingClientRect();
        const t2 = drone.getBoundingClientRect();

        if(collide(t1, t2) && !buttonCreated){

            mission = 4.5;
            buttonCreated = true;

            fruitCountText.parentElement.style.display = "none";

            messageBox.innerHTML = "✅ Entregue!";

            createContinueButton(
                5,
                "🚚 Saindo..."
            );
        }
    }

    /* FINAL */
    if(mission === 5){

        mission = 6;

        truck.style.transition = "4s linear";
        truck.style.right = "-400px";

        setTimeout(() => {
            showVictoryScreen();
        }, 4000);
    }

    requestAnimationFrame(update);
}

/* VITÓRIA */
function showVictoryScreen(){

    const v = document.createElement("div");

    v.style.position = "fixed";
    v.style.top = 0;
    v.style.left = 0;
    v.style.width = "100%";
    v.style.height = "100%";
    v.style.background = "rgba(0,0,0,0.92)";
    v.style.display = "flex";
    v.style.flexDirection = "column";
    v.style.alignItems = "center";
    v.style.justifyContent = "center";
    v.style.zIndex = "99999";

    v.innerHTML = `
        <h1 style="font-size:4rem;color:#00ffaa;">
            🎉 PARABÉNS 🎉
        </h1>
        <p style="color:white;font-size:1.3rem;max-width:800px;text-align:center;">
            Você concluiu todas as missões!
        </p>
        <a href="index.html"
           style="margin-top:30px;padding:15px 40px;
           background:#00ffaa;color:black;
           text-decoration:none;border-radius:10px;
           font-weight:bold;">
           Voltar
        </a>
    `;

    document.body.appendChild(v);
}

/* COLISÃO */
function collide(a, b){
    return !(a.top > b.bottom || a.bottom < b.top || a.left > b.right || a.right < b.left);
}

update();