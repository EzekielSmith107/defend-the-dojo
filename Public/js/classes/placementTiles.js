// Creating a class to make placement tiles
class PlacementTile {
    constructor({ position = { x: 0, y: 0 } }) {
        this.position = position
        this.size = 16
        this.color = 'rgba(255, 255, 255, 0.2)'
        this.occupied = false
    }

    draw() {
        context.fillStyle = this.color
        context.fillRect(this.position.x, this.position.y, this.size, this.size)
    }

    update(mouse) {
        this.draw()

        // Mouse is colliding if within bounds of tile size
        if(
            mouse.x > this.position.x && 
            mouse.x < this.position.x + this.size &&
            mouse.y > this.position.y &&
            mouse.y < this.position.y + this.size
            ) {
                this.color = 'white'
        } else {
            this.color = 'rgba(255, 255, 255, 0.2)'
        }
    }
}