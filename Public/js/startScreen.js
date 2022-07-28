const baseURL = 'http://localhost:5500/leaderboard'

const getLeaderboard = () => {
    axios.get(baseURL)
    .then(res => {
        createTable(res.data)
    })
}

let headers = ['Rank', 'Initials', 'Score']
let table = document.createElement('table')
table.classList.add('leaderboardTable')
let headerRow = document.createElement('tr')
let tableHome = document.getElementById('leaderboardBox')

function createTable(arr) {
    headers.forEach(headerText => {
        let header = document.createElement('th')
        let textNode = document.createTextNode(headerText)
        header.appendChild(textNode)
        headerRow.appendChild(header)
    })
    table.appendChild(headerRow)
    tableHome.appendChild(table)

    arr.forEach(player => {
        let row = document.createElement('tr')

        Object.values(player).forEach(text => {
            let cell = document.createElement('td')
            let textNode = document.createTextNode(text)
            cell.appendChild(textNode)
            row.appendChild(cell)
        })
        table.appendChild(row)
    })
}

getLeaderboard()