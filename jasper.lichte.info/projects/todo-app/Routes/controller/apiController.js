const { connection }            = require('./../../app');
const QueryHelper               = require('./../../db/QueryHelper');

module.exports = {

    getTodo: (req, res) => {
        if (!req.user) {
            res.status(401).redirect('/login');
            return;
        }

        QueryHelper.getTableFieldsElements(
            connection, 
            'todo-items',
            '*',
            'user_ID = ' + parseInt(req.user.user_ID),
            50,
            'created DESC'
        ).then(data => {
            res.send(data);
        }).catch(error => {
            res.status(400).send(error);
        });
    },

    postTodo: (req, res) => {
        if (!req.user) {
            res.status(401).redirect('/login');
            return;
        }

        const data = {
            user_ID: req.user.user_ID,
            title: req.body.title,
            description: req.body.description,
            created: (new Date())
        }

        QueryHelper.insertTableFields(connection, 'todo-items', data)
        .then(response => {
            res.send('success');
        })
        .catch(error => {
            res.status(400).send(error);
        });
    }

};
