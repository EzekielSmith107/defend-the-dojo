//? Add inheritance from placement tiles?
class Building {
    constructor({ position = { x: 0, y: 0 } }) {
        this.position = position
        // This should be in reference to our sprite size
        this.width = 16
        this.height = 16
        this.center = {
            x: this.position.x + this.width / 2,
            y: this.position.y + this.height / 2
        }
        this.projectiles = []
        // Setting building radius to target enemies
        this.radius = 115
        this.target
        this.frames = 0
    }

    draw() {
        context.fillStyle = 'blue'
        context.fillRect(this.position.x, this.position.y, this.width, this.height)

        //! This circle radius is bugged on the last enemy when given a visual. Has no effect on gameplay.
        //! After updating code, bug is on first enemy while a projectile is not in the air.
        // context.beginPath
        // context.arc(this.center.x, this.center.y, this.radius, 0, Math.PI * 2)
        // context.fillStyle = 'rgba(0, 0, 255, 0.2)'
        // context.fill()
    }

    update() {
        this.draw()
        // Controls how fast the building shoots
        if(this.frames % 80 === 0 && this.target) {
            this.projectiles.push(
                new Projectile({
                    position: {
                        x: this.center.x,
                        y: this.center.y
                    },
                    enemy: this.target
                })
            )
        }
        this.frames++
    }
}