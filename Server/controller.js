require('dotenv').config()
const Sequelize = require("sequelize")

// Still needed if hosting
const{ CONNECTION_STRING } = process.env

const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
})

module.exports = {
    seed: (req, res) => {
        sequelize.query(`
            DROP TABLE IF EXISTS leaderboard;

            CREATE TABLE leaderboard (
                leaderboard_id SERIAL PRIMARY KEY,
                initials VARCHAR(3),
                score INTEGER
            );

            INSERT INTO leaderboard (initials, score)
            VALUES ('ABC', 100),
            ('DEF', 80),
            ('GHI', 60),
            ('JKL', 40),
            ('MNO', 20);
        `).then(() => {
            console.log('DB seeded!')
            res.sendStatus(200)
        }).catch(err => console.log('error seeding DB', err))
    },

    getLeaderboard: (req, res) => {
        sequelize.query(`
            SELECT * 
            FROM leaderboard
            ORDER BY 2 ASC
            LIMIT 5;
        `)
        .then((dbRes) => {
            res.status(200).send(dbRes[0])
        })
        .catch(err => console.log(err))
    }
}