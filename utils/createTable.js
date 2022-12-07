const createTable = (data) => {
    let table = []

    for (let key in data) {
        table.push(`<tr><td style="border:1px solid">${key}</td><td style="border:1px solid">${data[key]}</td></tr>`)
    }

    table.unshift(`<table style="border-collapse:collapse">`)
    table.push(`</table>`)

    return table.join('')
}

exports.createTable = createTable