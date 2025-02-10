var express = require('express');
const cors = require('cors')
var app = express();
app.use(cors());

const users = [
    {
        id:1,
        name:"Alice Johnson manuel",
        phone:"555-1234",
        email:"alice@example.com",
        address:"123 Elm Street, Springfield"
    },
    {
        id:2,
        name:"Bob Smith marley",
        phone:"555-5678",
        email:"bob@example.com",
        address:"456 Oak Avenue, Springfield"
    },
    {
        id:3,
        name:"Carol Williams Adams",
        phone:"555-8765",
        email:"carol@example.com",
        address:"789 Pine Road, Springfield"
    }
];

app.get('/api/users', (req,res) => {
    res.json(users);
})

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;