const express = require('express');
const axios = require("axios");
const {Agent} = require("https");
const app = express();
const cors = require('cors');

app.use(cors());
let BASE_URL = "https://localhost:9200";

app.get('/getdata', async function(req, res){
    try {
        const axiosConfig = {
            auth: {
                username: 'admin',
                password: 'admin'
            },
            httpsAgent: new Agent({
                rejectUnauthorized: false
            })
        };

        const result = await axios.get( BASE_URL + `/techtask/_search?pretty&size=100`, axiosConfig);
        res.send(result.data.hits.hits.map (item => item._source) );
        // res.send(result.data);

    } catch(error) {
        console.error(error);
        res.status(500).send('An error occurred!');
    }
});

app.listen(5000, function(){
    console.log('Сервер работает на http://localhost:5000/');
});