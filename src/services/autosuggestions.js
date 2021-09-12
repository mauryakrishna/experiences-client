import find from "lodash/find"

const cache = [];
const getFromCache = (inString) => {
    return find(cache, { inString })
}

const updateCache = (json) => {
    if(!getFromCache(json.inString)) {
        cache.push(json)
    }
}

const getNonEnglish = (itrans) => {
    return find(cache, { itrans })
}

const isEnglishCharacter = new RegExp("[a-zA-Z0-9]")

export default (inString) => {
    if(!isEnglishCharacter.test(inString)) {
        return Promise.resolve(getNonEnglish(inString))
    }

    const found = getFromCache(inString)
    if(found) {
        return Promise.resolve(found)
    }
    else {
        return getFromService(inString)
    }
}

const getFromService = (inString) => {
    return fetch(`${window.location.origin}/processWordJSON?inString=${inString}&lang=hindi`, {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            'Accept-Encoding': 'gzip,deflate',
           },
    }).then(resp => {
        return resp.json()
    })
    .then((json) => {
        if(json) {
            updateCache(json)
        }
        return json
    })
    .catch((error) => {
        console.log("Error in autosuggestion", error)
        return null
    })
}