const createTable = (data) => {
    let table = []

    for (let key in data) {
        table.push(`<tr><td>${key} :</td><td >${data[key]}</td></tr>`)
    }

    table.unshift(`<table>`)
    table.push(`</table>`)

    return table.join('')
}

exports.createTable = createTable