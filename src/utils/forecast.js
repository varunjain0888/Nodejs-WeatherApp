const request = require('request')

const forecast = (lat,lng,callback)=>{
const url = 'https://api.darksky.net/forecast/10e14cbb16472015f1f01c37f911f18a/' + lat +',' + lng
request({url,json:true},(error,{body})=>{
   if(error){
    callback('Unable to connect to location service!',undefined)
   }else if(body.error){
    callback('Unable to find location!',undefined)
   }else{
      callback(undefined, body.daily.data[0].summary+ ' It is currently '+body.currently.temperature+' degress out. There is a '+body.currently.precipProbability + ' % change of rain.')
   }
})
}

module.exports = forecast


