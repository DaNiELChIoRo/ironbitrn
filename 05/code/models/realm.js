import Session from './session';
import Comic from './comic';
import Realm from 'realm';
import Character from './character';

async function reino(callback) {
    Realm.open({ schema: [Session, Comic, Character] })
        .then(callback)
        .catch((e) => {
            console.log("Error on creation", e)
        })
}


function add(type, data) {
    reino((realm) => {
        realm.write(() => {
            console.log('Ya se guardo el token', data.accessToken)
            realm.create(type, data)
        })
    })
}

// function get(type) {
//     realm((realm) => {
//         realm.objects(type)
//     })
// }

function get(type, callback) {
    reino((realm) => {
        return callback(realm.objects(type))        
    })
}

export default {
    reino,
    add,
    get
};