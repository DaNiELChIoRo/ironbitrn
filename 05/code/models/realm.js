import Session from './session';
import Comic from './comic';
import Realm from 'realm';
import Character from './character';
import Api from '../api';

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
function getById(type, id, callback) {
    reino((realm) => {
        return callback(realm.objects(type).filtered('id == $0', id))
    })
}

function getComicById(type, id, callback) {
    reino((realm) => {
        return callback(realm.objects(type).filtered('id == $0', id));             
    })
}

function addListener(object ,funcion){
    realm.objects(object).addListener(funcion)
}

export default {
    reino,
    add,
    get,
    getById,
    getComicById,
    addListener
};