const request = require('request')

const forecast = (lat, long, callback) => {
    const url = 'https://api.darksky.net/forecast/20b37f4a14b312dc16a95e451dcc08d8/'+ lat + ',' + long + '?units=si&lang=en'
    request({url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location!', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out. There is a ' + body.currently.precipProbability + 
                    '% chance of rain in ' + body.timezone + ' timezone.' + ' UV index is ' + body.daily.data[0].uvIndex + '.')
        }

    })
}

module.exports = forecast