const Schema = {
    name: 'Comic',
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