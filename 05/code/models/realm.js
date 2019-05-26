import realm from 'realm';

export default{
    realm(callback) {
        Realm.open({schema: [Session]})
        .then (callback)
    }
}

function add(type, data){
    realm( (realm) => {
        realm.create(type, data)
    })
}

function get(type){
    realm((realm)=>{
        realm.objects(type)
    })
}

export default {
    realm, 
    add,
    get
};