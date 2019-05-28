const Schema = {
    name: 'Character',
    properties: {
        id: 'int',
        name: 'string?',
        description: 'string?',
        thumbnail: 'string?',
        comics: { type: 'list', objectType: 'Comic' }
    }
}

export default Schema