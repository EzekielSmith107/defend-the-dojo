// Creating enemy class so we can more easily add enemies without bloated code
class Enemy extends Sprite {
    constructor({ position = { x: 0, y: 0 } }) {
        super({ 
            position, 
            imageSrc: '../img/enemy.png', 
            frames: { max: 5, hold: 7 } 
        })
        this.width = 50
        this.height = 50
        this.waypointIndex = 0
        // Center property for enemies to properly follow path
        // Adding half of our width and height to find the center of the square
        this.center = {
            x: this.position.x + this.width / 2,
            y: this.position.y + this.height / 2
        }
        this.radius = 25
        this.health = 100
        this.velocity = {
            x: 0,
            y: 0
        }
    }

    draw() {
        super.draw()

        // Health bar
        context.fillStyle = 'red'
        context.fillRect(this.position.x, this.position.y - 15, this.width, 10)
        
        context.fillStyle = 'green'
        context.fillRect(this.position.x, this.position.y - 15, this.width * this.health / 100, 10)
    }

    update() {
        this.draw()
        super.update()
        // Moving x and y position using waypoint data
        // Finding x and y velocities : Use .center for finding angles using the center of our enemies
        const waypoint = waypoints[this.waypointIndex]
        const yDistance = waypoint.y - this.center.y
        const xDistance = waypoint.x - this.center.x
        const angle = Math.atan2(yDistance, xDistance)

        // Can adjust velocity to speed up enemy
        const speed = 1.25
       
        this.velocity.x = Math.cos(angle) * speed
        this.velocity.y = Math.sin(angle) * speed
        // Assigning angle to get appropriate velocities. Remember that cos is x and sin is y.
        this.position.x += this.velocity.x 
        this.position.y += this.velocity.y 
        // Updating our center as the enemies move
        this.center = {
            x: this.position.x + this.width / 2,
            y: this.position.y + this.height / 2
        }

        // After an enemy reaches a waypoint, move onto the next one
        //? Can Math.round be applied to both ends of the comparision and it still work?
        //
        if(
            Math.abs(Math.round(this.center.x) - Math.round(waypoint.x)) < 
                Math.abs(this.velocity.x) && 
            Math.abs(Math.round(this.center.y) - Math.round(waypoint.y)) < 
                Math.abs(this.velocity.y) &&
            this.waypointIndex < waypoints.length - 1
        ) {
            this.waypointIndex++
        }
    }
}