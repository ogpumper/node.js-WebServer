const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' 
    + encodeURIComponent(address) 
    + '.json?access_token=pk.eyJ1IjoibG9yaXN0b2tlciIsImEiOiJjanUxbTlrejEwMzUxNGRsbzc2ZDJmZDdmIn0.BJ9uhyIFfNug81C_fBKNIQ'
    + '&limit=1'

    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location service.',{})
        } else if (body.features.length===0) {
            callback('Unable to find ' + address + '. Try another search.',{})
        } else {
            callback(undefined, {
                location: body.features[0].place_name,
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0] 
            })
        }
    })
}

module.exports = geocode