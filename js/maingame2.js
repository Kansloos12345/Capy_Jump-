const image = new Image(); image.src = 'img/Platform2.png'

const playersprite = new Image(); playersprite.src = 'img/capyidle2.png'

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

let loseCounter = 0;

canvas.width = innerWidth
canvas.height = innerHeight

const gravity = 0.5

class Player {
    constructor() {
        this.speed = 5
        this.position = {
            x: 100,
            y: 400
        }
        this.velocity = {
            x: 0,
            y: 0
        }

        this.image = playersprite

        this.width = 75
        this.height = 75
    }
    draw() {
        c.drawImage(this.image, this.position.x, this.position.y)
    }
    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if (
            this.position.y +this.height + 
            this.velocity.y <= canvas.height)
            this.velocity.y += gravity
    }
}

class Platform {
    constructor({x, y, width = 500, height = 200, image}) {
        this.position = {
            x,
            y
        }

        this.image = image

        this.width = image.width;
        this.height = image.height;

        
    }

    draw() {
        c.drawImage(this.image, this.position.x, this.position.y)
    }
}

let player = new Player()
let platforms = []
const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    }
}

let scrollOffset = 0


function init() {

console.log(image)



player = new Player()
platforms = [
    new Platform({ //spawn platform
        x: 0,
        y: 600,
        image
    }), 
    new Platform({ 
        x: 200,
        y: 600,
        image
    }),
    new Platform({ 
        x: 700,
        y: 600,
        image
    }),
    new Platform({ 
        x: 900,
        y: 500,
        image
    }),
    new Platform({ 
        x: 900,
        y: 600,
        image
    }),
    new Platform({
        x: 1480,
        y: 400,
        image
    }),
    new Platform({
        x: 1480,
        y: 500,
        image
    }),
    new Platform({
        x: 1480,
        y: 600,
        image
    }),
    new Platform({
        x: 1950,
        y: 300,
        image
    }),
    new Platform({
        x: 2350,
        y: 650,
        image
    }),
    new Platform({
        x: 2850,
        y: 450,
        image
    }),
    new Platform({
        x: 2750,
        y: 550,
        image
    }),
    new Platform({
        x: 2650,
        y: 650,
        image
    }),
    new Platform({
        x: 3300,
        y: 250,
        image
    }),
    new Platform({
        x: 3700,
        y: 600,
        image
    }),
    new Platform({
        x: 3900,
        y: 600,
        image
    }),
    new Platform({
        x: 4100,
        y: 600,
        image
    }),
]



scrollOffset = 0
}

function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    
    platforms.forEach(platform => {
        platform.draw()
    })
    player.update()

    //change the && player.position.x < and > number to change how far away from wall to move everything

    if (keys.right.pressed && player.position.x < 600) {
        player.velocity.x = player.speed
    } else if (keys.left.pressed && player.position.x > 0) {
        player.velocity.x = -player.speed
    } else {
        player.velocity.x = 0

        if (keys.right.pressed) {
            scrollOffset += player.speed
            platforms.forEach(platform => {
                platform.position.x -= player.speed
            })
        } else if (keys.left.pressed && scrollOffset > 0) {
            scrollOffset -= player.speed
            platforms.forEach(platform => {
                platform.position.x += player.speed
            })
        }
    }

    console.log(scrollOffset)
    
    //platform col detection
    platforms.forEach(platform => {
        if (
            player.position.y + player.height 
            <= platform.position.y && player.
            position.y + player.height + player.velocity.y >= platform.
            position.y && player.position.x +
            player.width >= platform.position.x && player.
            position.x <= platform.
            position.x + + platform.width
        ) {
            player.velocity.y = 0
        }
    })

    //win 
    if (scrollOffset > 3000) {
        window.location.href = "./maingame3.html";
    }

    //lose
    if (player.position.y > canvas.height) {
        if (loseCounter === 0) {
            // Run init() on the first occurrence of "lose"
            init();
            loseCounter++;
        } else {
            // Run window.location.href for subsequent occurrences of "lose"
            window.location.href = "./lose.html";
        }
    }
}

init()
animate()

window.addEventListener('keydown', ({ keyCode }) => {
    switch (keyCode) {
        case 37:
            console.log('left')
            keys.left.pressed = true
            break

        case 90:
            console.log('up')
            player.velocity.y -= 14
            break

        case 39:
            console.log('right')
            keys.right.pressed = true
            break
    }
})

window.addEventListener('keyup', ({ keyCode }) => {
    switch (keyCode) {
        case 37:
            console.log('left')
            keys.left.pressed = false
            break

        case 90:
            console.log('up')
            player.velocity.y -= 0
            break

        case 39:
            console.log('right')
            keys.right.pressed = false
            break
    }
})