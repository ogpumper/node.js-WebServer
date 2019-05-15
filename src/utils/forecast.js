const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/3cb938737b4bc2f03e5f68d0c6a8108a/'
    +latitude + ',' + longitude
    //37.8267,-122.4233'

    request({url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service.', undefined)
        } else if (body.error) {
            callback('Unable to find location.', undefined)
        }
        else {
            callback(undefined, body.daily.data[0].summary
                + ' It is currently '+ body.currently.temperature + ' degrees out.'
                + ' There is a ' + body.currently.precipProbability*100 + '% chance of rain.'
            )
        }
    })
}

module.exports = forecast