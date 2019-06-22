import Constants from '../Constants';

let signin = (credential)=>{
    return fetch(`${Constants.HOST_NAME}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(credential),
    })
    .then(response =>response.json())
    .catch(err => console.log(err));
}

let signup = (credential)=>{
    return fetch(`${Constants.HOST_NAME}/signup`, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(credential),
    })
    .then(response =>response.json())
    .catch(err =>console.log(err));
}

export default{ signin, signup }