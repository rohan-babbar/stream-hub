const request = require('postman-request')

const movie =(name,callback)=>{
   const url = 'http://www.omdbapi.com/?t='+name+'&apikey=45ece678'  //api example, contains our key and movie name (t)

    request({url:url,json:true},(error,response)=>{
        if(error){
     callback('Err..! Unable To Connect To Movies Server',undefined)
        }else if(response.body.error){
       callback('Unable To Find Movie :(',undefined)
        }else{
            callback('', {
                 ...response.body
            });
        }
    })
}

module.exports = movie