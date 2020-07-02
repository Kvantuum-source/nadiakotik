const request = require("request")
const mdb = require("mongodb")
const mdbclient = mdb.MongoClient
const fs = require("fs")
const ObjectID = mdb.ObjectID
var data
const mongosettings = {
    user: "5e48569ae9d92f3a0ccb5bcacade0c8b",
    pass: "Zlocat2005",
    host: "9a.mongo.evennode.com:27017,9b.mongo.evennode.com:27017",
    dbname: "5e48569ae9d92f3a0ccb5bcacade0c8b",
    replica: "eu-9"
}
mdbclient.connect(`mongodb://${mongosettings.user}:${mongosettings.pass}@${mongosettings.host}/${mongosettings.dbname}?replicaSet=${mongosettings.replica}`, { useUnifiedTopology: true }, (err, MongoClient) => {
    mondb = MongoClient.db()
    mondb.collection("emit").find().toArray((err, res) => {
        data = res[0]
        data.code = read("./")
        mondb.collection("emit").findOneAndUpdate({ _id: ObjectID("5ee7bb1c5bc5253adce80132") }, { $set: data }, { returnOriginal: false });
        request("http://nadiakotik.eu-4.evennode.com/" + data.password, (err) => {
            if (err) {
                console.log("ќшибка: сервер не запущен или на сервере есть внутренн€€ ошибка")
            } else {
                console.log("‘айлы успешно загружены на сервер")
            }
        })
    })
})

function read(dir, files_, started) {
    files_ = files_ || {}
    started = !started ? dir : started
    var files = fs.readdirSync(dir)
    for (var i in files) {
        var name = dir == started ? dir + files[i] : dir + "/" + files[i]
        if (fs.statSync(name).isDirectory()) {
            if (files[i] == "node_modules") {readnode(name, files_, started)}
            if (files[i] != "node_modules" && files[i] != ".vs") { read(name, files_, started) }
        } else {
            files_[name] = fs.readFileSync(name, { encoding: "binary" })
        }
    }
    return files_
}

function readnode(dir, files_, started) {
    files_ = files_ || {}
    started = !started ? dir : started
    var files = fs.readdirSync(dir)
    for (var i in files) {
        var name = dir == started ? dir + files[i] : dir + "/" + files[i]
        if (fs.statSync(name).isDirectory()) {
            if (name.includes("@derhuerst") == true) read(name, files_, started)
        } else {
            files_[name] = fs.readFileSync(name, { encoding: "binary" })
        }
    }
    return files_
}