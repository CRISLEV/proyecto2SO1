
const mongoose = require('mongoose')
const redis = require('redis')
const util = require('util')

const redisUrl = 'redis://35.202.82.130:6379/';
const client = redis.createClient(redisUrl);
client.hget = util.promisify(client.hget);                

mongoose.Query.prototype.cache = function(hkey){
    this.useCache = true;

    this.hashkey = JSON.stringify(hkey || '')

    return this;
}


const exec = mongoose.Query.prototype.exec 

mongoose.Query.prototype.exec = async function(){ 
    if(!this.useCache){
        return exec.apply(this, arguments)
    }

   
    let key = JSON.stringify(Object.assign({},this.getQuery(),{collection: this.mongooseCollection.name}));

  
    const cacheValue = await client.hget(this.hashkey, key)
    
    
    if(cacheValue){
        const doc = JSON.parse(cacheValue) 
        return  Array.isArray(doc)
                ? doc.map((d)=>new this.model(d))
                : new this.model(doc);
    }

   
    const result = await exec.apply(this, arguments) // using the default exec function

  
    if(result){ 
        if(Array.isArray(result) && result.length==0){
            // array is empty
            return null
        }
        else{
            // data is there (non-empty array or an single object)
            client.hset(this.hashkey, key, JSON.stringify(result)); // saving data in redis cache
            return result
        }
    }else{ // database returned null value
        console.log("data not present")
        return null
    } 
}

module.exports = 
    function clearCache(hashkey){
        client.del(JSON.stringify(hashkey))
    }