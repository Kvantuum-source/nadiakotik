/**
* @param [reactions=0] List of reactions
*/
/**
* @param [message=0] Bot message for reactions
*/
module.exports = (message, reactions) => {
    react(message,reactions)
    function react(m,r) {
        if (!r[0]) return true;
        m.react(r[0]).then(() => {
            r.shift()
            react(m, r)
        })
    }
}