const express = require('express')
const app = express()
const path = require('path')
var fs = require("fs");

app.use(express.static('dist'))

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'))
})
app.get('/api/photos', function (req, res) {
    let strData = fs.readFile("urls.txt", "utf-8", function (err, data) {
        let photos = [];
        let tmp = [];
        for (let i = 0; i < data.length; i++) {
            if (data.charCodeAt(i) == 10) {
                let photo = {
                    id: photos.length,
                    title: "",
                    url: tmp.join('')
                }
                // console.log(tmp.join(''));
                tmp = [];
                photos.push(photo);
            } else {
                tmp.push(data.charAt(i));
            }
        }
        res.send(photos);
    })
})

app.post('/api/photos/update', function (req, res) {
    // let photos = JSON.parse(req.body.photos);
    console.log("updateing");
    res.send({ message: "Updated" });
})

app.listen(3000, () => console.log('App listening on port 3000'))
