module.exports = (data, CodeData, callback) => {
    let decoderdatajson = CodeData
    let buffdata = data.split(/[?|/@.nop]/)
    var encdata
    for (var simv of buffdata) {
        var exit
        let a = Object.keys(decoderdatajson)
        for (let i of a) {
            if (decoderdatajson[i]==simv) {
                exit = i
            }
        }
        exit==undefined?exit="":undefined
        encdata = encdata==undefined?exit:encdata+exit
    }
    saveCodeData = decoderdatajson
    callback(encdata)
}