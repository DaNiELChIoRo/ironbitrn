const Schema = {
    name: 'Comic',
    primaryKey: 'id',
    properties: {
        id: 'int',
        title: 'string?',
        description: 'string?',
        thumbnail: 'string?',
        characters: { type: 'list',
        //  optional: true, 
         objectType: 'Character' }
    },
};

export default Schema;