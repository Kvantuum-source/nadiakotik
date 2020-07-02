let ignore = [
    "?","|","/","@",".","n","o","p"
]

/**
* @param [data=0] Encoded data
*/
/**
* @param [callback=0] Callback with encoded data
*/
/** 
* @param [saveCodeData=0] Object for save data of encoding 
*/
module.exports = (data, saveCodeData, callback) => {
    let encoderdatajson = saveCodeData
    let buffdata = data.split("")
    var encdata
    for (var simv of buffdata) {
        if (!encoderdatajson[simv]) {
            encreate()
            function encreate() {
                let trued = 0
                encoderdatajson[simv] = Math.random().toString(16).slice(3, Math.floor(Math.random()*5+4))
                for (let i of Object.keys(encoderdatajson)) {
                    if (encoderdatajson[simv]==encoderdatajson[i]) {
                        trued++
                        if (trued==2) {
                            encreate()
                            trued = 0
                        }
                    }
                }
            }
        }
        encdata = encdata==undefined?encoderdatajson[simv]:encdata+ignore[Math.floor(Math.random()*ignore.length)]+encoderdatajson[simv]
    }
    saveCodeData = encoderdatajson
    callback(encdata)
}