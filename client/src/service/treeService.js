import Constants from '../Constants';

let calcultaeSum = (tree_json)=>{
    let api_data = {
        treeData: tree_json
    }
    return fetch(`${Constants.HOST_NAME}/calculate`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(api_data),
    })
    .then(response =>response.json())
    .catch(err => console.log(err));
}
export default{ calcultaeSum }