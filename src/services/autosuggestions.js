export default (inString) => {
    return fetch(`http://localhost:8090/processWordJSON?inString=${inString}&lang=hindi`, {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            'Accept-Encoding': 'gzip,deflate',
           },
    }).then(resp => resp.json())
}