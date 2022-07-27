class Projectile {
    constructor({ position = { x: 0, y: 0 }, enemy }) {
        this.position = position
        // property for a moving object
        this.velocity = {
            x: 0,
            y: 0
        }
        this.enemy = enemy
        this.radius = 5

        // Connecting sprite to projectile
        this.image = new Image()
        // Reference file in relation to index.html
        this.image.src = '../img/Shuriken.png'
    }

    draw() {
        context.drawImage(this.image, this.position.x, this.position.y)
        // context.beginPath()
        // // Drawing the projectile in the shape of a circle using radians
        // context.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
        // context.fillStyle = 'orange'
        // context.fill()
    }

    update() {
        this.draw()
        // Using sin and cosine to determine projectile velocity
        const angle = Math.atan2(
            this.enemy.center.y - this.position.y, 
            this.enemy.center.x - this.position.x
        )
        
        // Using power to speed up our projectiles
        const power = 3
        this.velocity.x = Math.cos(angle) * power
        this.velocity.y = Math.sin(angle) * power

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}

