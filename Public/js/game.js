const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

canvas.width = 1280
canvas.height = 768

// Fill and position canvas in browser
context.fillStyle = 'white'
context.fillRect(0, 0, canvas.width, canvas.height)

// Formatting data for 2D
const placementTilesData2D = []

for(let i = 0; i < placementTilesData.length; i+= 80) {
    placementTilesData2D.push(placementTilesData.slice(i, i + 80))
}

// Creating a place to store placement tiles
const placementTiles = []

// Adding a building placement tile with 2D data
placementTilesData2D.forEach((row, y) => {
    row.forEach((symbol, x) => {
        if(symbol === 999) {
            placementTiles.push(new PlacementTile({
                position: {
                    x: x * 16,
                    y: y * 16
                }
            }))
        }
    })
})

// Connect map to browser
const image = new Image()
image.onload = () => {
    animate()
}
image.src = '/img/map.png'

// Creating new enemies from our class
const enemySpawn = []

function spawnEnemies(spawnCount) {
    for(let i = 1; i < spawnCount + 1; i++) {
        const xOffset = i * 150
        enemySpawn.push(
            new Enemy({
                position: { x: waypoints[0].x - xOffset, y: waypoints[0].y }
        }))
        if(i < bossCount) {
            enemySpawn.push(
                new Boss({
                    position: { x: waypoints[0].x - xOffset + 75, y: waypoints[0].y }
                })
            )
        }
    }
    // Adjusting boss count for increased difficulty
    if(bossCount === 1) {
        bossCount++
    } else {
        bossCount += 2
    }
}

const buildings = []

let activeTile = undefined
let enemyCount = 3
let bossCount = 1
let hearts = 10
let coins = 100
let score = 0
const explosions = []
spawnEnemies(enemyCount)

// Audio Controls
let audioPanel = document.querySelector('#audioContainer')
let gameOver = document.querySelector('#gameOver')

let animation = null

window.addEventListener('keydown', function(event) {
    if(event.key === 'Escape') {
        if(audioPanel.style.display === 'flex') {
            audioPanel.style.display = 'none'
            if(gameOver.style.display === 'none') {
               requestAnimationFrame(animate) 
            }
        } else {
            audioPanel.style.display = 'flex'
            cancelAnimationFrame(animation)
        }
    }
})

// Creating our animation and linking everything together
function animate() {
    const animationId = requestAnimationFrame(animate)
    animation = animationId

    context.drawImage(image, 0, 0)

    for(let i = enemySpawn.length - 1; i >= 0; i--) {
        const enemy = enemySpawn[i]
        enemy.update()

        if(enemy.position.x > canvas.width) {
            hearts -= 1
            enemySpawn.splice(i, 1)
            document.querySelector('#heartsRemaining').innerHTML = hearts

            if(hearts === 0) {
                // Pause the game when hearts reach 0. Works on a window object
                cancelAnimationFrame(animationId)
                gameOver.style.display = 'flex'
            }
        }
    }

    for(let i = explosions.length - 1; i >= 0; i--) {
        const explosion = explosions[i]
        explosion.draw()
        explosion.update()

        if(explosion.frames.current >= explosion.frames.max - 1) {
            explosions.splice(i, 1)
        }
    }

    // tracking total amount of enemies
    if(enemySpawn.length === 0) {
        enemyCount += 2
        spawnEnemies(enemyCount)
    }

    placementTiles.forEach((tile) => {
        tile.update(mouse)
    })

    buildings.forEach(building => {
        building.update()
        building.target = null
        // Setting up valid enemies using our building radius
        const validEnemies = enemySpawn.filter(enemy => {
            const xDistance = enemy.center.x - building.position.x
            const yDistance = enemy.center.y - building.position.y
            const distance = Math.hypot(xDistance, yDistance)
            return distance < enemy.radius + building.radius
        })
        building.target = validEnemies[0]

        for(let i = building.projectiles.length - 1; i >= 0; i--) {
            const projectile = building.projectiles[i]
        
            projectile.update()

            const xDistance = projectile.enemy.center.x - projectile.position.x
            const yDistance = projectile.enemy.center.y - projectile.position.y
            const distance = Math.hypot(xDistance, yDistance)
            // When using splice, use a traditional for loop from the back to prevent flicker when using a forEach function
            
            // This is when a projectile hits an enemy
            if(distance < projectile.enemy.radius + projectile.radius) {
               // enemy health and enemy removal
                projectile.enemy.health -= 20
                if(projectile.enemy.health <= 0) {
                    const enemyIndex = enemySpawn.findIndex((enemy) => {
                        return projectile.enemy === enemy
                    })
                    // Added if statement to prevent enemyIndex from being -1 if it doesn't return true. aka enemy died while projectile mid flight
                    if(enemyIndex > -1) {
                        enemySpawn.splice(enemyIndex, 1)
                        coins += 25
                        score += 10
                        document.querySelector('#coinsRemaining').innerHTML = coins
                        document.querySelector('#score').innerHTML = `Score: ${score}`
                    }
                }
                // Creating explosion fx on projectile to enemy contact
                explosions.push(new Sprite({ 
                    position: { x: projectile.enemy.center.x, y: projectile.enemy.center.y }, 
                    imageSrc: './img/slash.png', 
                    frames : { max: 4, hold: 7 } 
                }))
                building.projectiles.splice(i, 1)
            }
        }
    })
}

// Add event listener to detect mouse collision with placement tiles
const mouse = {
    x: undefined,
    y: undefined
}

// Place a building at an active tile position with a click if it is not occupied
canvas.addEventListener('click', () => {
    if(activeTile && !activeTile.occupied && coins - 50 >= 0) {
        coins -= 50
        document.querySelector('#coinsRemaining').innerHTML = coins
        buildings.push(new Building({
            position: {
                x: activeTile.position.x,
                y: activeTile.position.y
            }
        }))
        activeTile.occupied = true
    }
})

// Connecting "Game Over" to database
const baseURL = `/leaderboard`

function addToLeaderboard(body) {
    axios.post(baseURL, body)
        .then(() => {
            console.log('leaderboard updated')
            window.location.href = "./index.html"
        })
}

function getInputValue() {
    let inputVal = document.getElementById('inputId').value
    let bodyObj = {
        initials: inputVal,
        score: score
    }
    addToLeaderboard(bodyObj)
}

// Tracking the user's mouse
window.addEventListener('mousemove', (event) => {
    mouse.x = event.clientX
    mouse.y = event.clientY

    // Setting active tile position using our mouse placement
    activeTile = null
    for(let i = 0; i < placementTiles.length; i++) {
        const tile = placementTiles[i]
        if(
            mouse.x > tile.position.x && 
            mouse.x < tile.position.x + tile.size &&
            mouse.y > tile.position.y &&
            mouse.y < tile.position.y + tile.size
            ) {
                activeTile = tile
                break
            }
    }
})