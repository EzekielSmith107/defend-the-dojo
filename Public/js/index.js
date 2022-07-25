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

console.log(placementTiles)

// Connect map to browser
const image = new Image()
image.onload = () => {
    animate()
}
image.src = '../img/map.png'

// Creating new enemies from our class
const enemySpawn = []
for(let i = 1; i < 10; i++) {
    const xOffset = i * 150
    enemySpawn.push(
        new Enemy({
            position: { x: waypoints[0].x - xOffset, y: waypoints[0].y }
    }))
}

// Creating our animation and linking everything together
function animate() {
    requestAnimationFrame(animate)

    context.drawImage(image, 0, 0)
    enemySpawn.forEach(enemy => {
        enemy.update()
    }) 

    placementTiles.forEach((tile) => {
        tile.update(mouse)
    })
}

// Add event listener to detect mouse collision with placement tiles
const mouse = {
    x: undefined,
    y: undefined
}

window.addEventListener('mousemove', (event) => {
    mouse.x = event.clientX
    mouse.y = event.clientY
})