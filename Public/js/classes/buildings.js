class Building extends Sprite {
    constructor({ position = { x: 0, y: 0 } }) {
        super({
            position,
            imageSrc: '../img/ninja.png',
            frames: {
                max: 4,
                hold: 15
            }
        })
        // This should be in reference to our sprite size
        this.width = 16
        this.height = 16
        this.center = {
            x: this.position.x + this.width / 2,
            y: this.position.y + this.height / 2
        }
        this.projectiles = []
        // Setting building radius to target enemies
        this.radius = 125
        this.target
        this.elapsedSpawnTime = 0
    }

    draw() {
        super.draw()
    }

    update() {
        this.draw()
        // Animate back to original position after target leaves radius
        if(this.target || !this.target && this.frames.current !== 0) {
            super.update()
        }
        // Controls how fast the building shoots
        if(this.elapsedSpawnTime % 80 === 0 && this.target) {
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
        this.elapsedSpawnTime++
    }
}