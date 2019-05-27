import Session from './session'
import Realm from 'realm';

function reino(callback) {
        Realm.open({ schema: [Session] })
            .then(callback)
            .catch((e) => {
                console.log("Error on creation", e)
            })
    }


function add(type, data) {
    reino((realm) => {
        console.log('Ya se guardo el token', data.accessToken)
        realm.create(type, data)
    })
}

function get(type) {
    realm((realm) => {
        realm.objects(type)
    })
}

export default {
    reino,
    add,
    get
};