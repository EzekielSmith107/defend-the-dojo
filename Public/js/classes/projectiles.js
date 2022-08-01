class Projectile extends Sprite {
    constructor({ position = { x: 0, y: 0 }, enemy }) {
        super({ position, imageSrc: './img/Shuriken.png', frames: { max: 2, hold: 25 } })
        // property for a moving object
        this.velocity = {
            x: 0,
            y: 0
        }
        this.enemy = enemy
        this.radius = 5
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

