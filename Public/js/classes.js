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

// Creating enemy class so we can more easily add enemies without bloated code
class Enemy {
    constructor({ position = { x: 0, y: 0 } }) {
        this.position = position
        this.width = 50
        this.height = 50
        this.waypointIndex = 0
        // Center property for enemies to properly follow path
        // Adding half of our width and height to find the center of the square
        this.center = {
            x: this.position.x + this.width / 2,
            y: this.position.y + this.height / 2
        }
    }

    draw() {
        context.fillStyle = 'red'
        context.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update() {
        this.draw()
        
        // Moving x and y position using waypoint data
        // Finding x and y velocities : Use .center for finding angles using the center of our enemies
        const waypoint = waypoints[this.waypointIndex]
        const yDistance = waypoint.y - this.center.y
        const xDistance = waypoint.x - this.center.x
        const angle = Math.atan2(yDistance, xDistance)

        // Assigning angle to get appropriate velocities. Remember that cos is x and sin is y.
        this.position.x += Math.cos(angle)
        this.position.y += Math.sin(angle)
        // Updating our center as the enemies move
        this.center = {
            x: this.position.x + this.width / 2,
            y: this.position.y + this.height / 2
        }

        // After an enemy reaches a waypoint, move onto the next one
        //? Can Math.round be applied to both ends of the comparision and it still work?
        if(
            Math.round(this.center.x) === Math.round(waypoint.x) && 
            Math.round(this.center.y) === Math.round(waypoint.y) &&
            this.waypointIndex < waypoints.length - 1
        ) {
            this.waypointIndex++
        }
    }
}

//? Add inheritance from placement tiles?
class Building {
    constructor({ position = { x: 0, y: 0 } }) {
        this.position = position
        // This should be in reference to our sprite size
        // this.width = 16
    }

    draw() {
        context.fillStyle = 'blue'
        context.fillRect(this.position.x, this.position.y, 16, 16)
    }
}