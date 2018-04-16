var jsonModif = require('../../lib/index');
global.dcDebug = true
var data = {
    name: {
        lists:[
            {
                big:'nimo',
                lists:[
                    {small:'nihaha'}
                ]
            },{
                big:'nico',
                lists:[
                    {small:'mohahaha'}
                ]
            }
        ]
    }
}
jsonModif.query('name.lists[{big:"nimo"}].lists[{small:"nihaha"}]', data)
