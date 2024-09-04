for (let i = 0; i < 30; i++) {
    const chickenImg = document.createElement("img");
    chickenImg.className = "chickenImg";
    chickenImg.src = "./images/Chicken.png";
    chickenImg.style.left = (i % 10) * 80 + "px";
    chickenImg.style.top = Math.floor(i / 10) * 75 + "px";
    document.body.appendChild(chickenImg);
}


document.addEventListener("DOMContentLoaded", function() {
    const rocketImg = document.querySelector(".rocketImg");
    rocketImg.style.left = window.innerWidth / 2 - rocketImg.width / 2 + "px"; 
    rocketImg.style.top = window.innerHeight - rocketImg.height + "px"; 
});

document.addEventListener("keydown", function(event) {
    const rocketImg = document.querySelector(".rocketImg");
    const rocketSpeed = 20; 

    const minX = 0;
    const maxX = window.innerWidth - rocketImg.width;
    const minY = 0;
    const maxY = window.innerHeight - rocketImg.height;

    if (!rocketImg.style.top) rocketImg.style.top = "0px";
    if (!rocketImg.style.left) rocketImg.style.left = "0px";

    const currentTop = parseInt(rocketImg.style.top);
    const currentLeft = parseInt(rocketImg.style.left);

    if (event.key === "ArrowUp" && currentTop > minY) {
        rocketImg.style.top = currentTop - rocketSpeed + "px";
    } else if (event.key === "ArrowDown" && currentTop < maxY) {
        rocketImg.style.top = currentTop + rocketSpeed + "px";
    } else if (event.key === "ArrowLeft" && currentLeft > minX) {
        rocketImg.style.left = currentLeft - rocketSpeed + "px";
    } else if (event.key === "ArrowRight" && currentLeft < maxX) {
        rocketImg.style.left = currentLeft + rocketSpeed + "px";
    }

    if (event.key === " ") {
        fireBullet();
    }
});

function fireBullet() {
    const bulletImg = document.createElement("img");
    bulletImg.className = "bulletImg";
    bulletImg.src = "./images/Bullet.png";
    
    const rocketImg = document.querySelector(".rocketImg");
    bulletImg.style.left = parseInt(rocketImg.style.left) + rocketImg.width / 2 - 57 + "px"; // Center the bullet
    bulletImg.style.bottom = "100px"; 

    document.body.appendChild(bulletImg);

    const bulletInterval = setInterval(() => {
        const currentBottom = parseInt(bulletImg.style.bottom);
        bulletImg.style.bottom = currentBottom + 10 + "px";

        const chickens = document.querySelectorAll(".chickenImg");
        chickens.forEach(chicken => {
            if (isColliding(bulletImg, chicken)) {
                chicken.remove(); 
                bulletImg.remove();
                clearInterval(bulletInterval); 
            }
        });

        if (currentBottom > window.innerHeight) {
            clearInterval(bulletInterval);
            bulletImg.remove();
        }
    }, 10); 
}

function isColliding(element1, element2) {
    const rect1 = element1.getBoundingClientRect();
    const rect2 = element2.getBoundingClientRect();
    return !(
        rect1.top > rect2.bottom ||
        rect1.bottom < rect2.top ||
        rect1.left > rect2.right ||
        rect1.right < rect2.left
    );
}
