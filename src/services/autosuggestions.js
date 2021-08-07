export default (inString) => {
    console.log("inString", inString)
    return fetch(`${window.location.origin}/processWordJSON?inString=${inString}&lang=hindi`, {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            'Accept-Encoding': 'gzip,deflate',
           },
    }).then(resp => {
        return resp.json()
    })
    .catch((error) => {
        console.log("Error in autosuggestion", error)
        return { tword: [{ options: []}]}
    })
}