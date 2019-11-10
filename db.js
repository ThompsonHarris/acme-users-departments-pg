const pg = require('pg')
const uuid = require('uuid')

const{Client} = pg

const client = new Client('postgres://localhost/userdepartment')

client.connect()


const sync = async ()=>{
    try{
        await client.query(SQL)
        await client.query(userdepartment)
    }catch(e){
        console.log(e)
    }
    
}

const SQL =`
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS departments;

CREATE TABLE departments(
    id UUID PRIMARY KEY,
    name TEXT NOT NULL
);

CREATE TABLE users(
    id UUID PRIMARY KEY,
    name TEXT NOT NULL,
    bio TEXT NOT NULL,
    department_id UUID REFERENCES departments(id)
);
`

const userdepartment =`
INSERT INTO departments(id,name) VALUES('${ uuid.v4()}','HR');
INSERT INTO departments(id,name) VALUES('${uuid.v4()}','Sales');
INSERT INTO departments(id,name) VALUES('${uuid.v4()}','Marketing');
INSERT INTO departments(id,name) VALUES('${uuid.v4()}','IT');

INSERT INTO users(id,name,bio,department_id) VALUES('${uuid.v4()}','Tiger Woods','Professional Golfer',(SELECT id FROM departments WHERE name='HR' LIMIT 1));
INSERT INTO users(id,name,bio,department_id) VALUES('${uuid.v4()}','Michael Jordon','Professional Baseball player',(SELECT id FROM departments WHERE name='IT' LIMIT 1));
INSERT INTO users(id,name,bio,department_id) VALUES('${uuid.v4()}','Leslie knope','Director of Pawnee Parks and Recreation',(SELECT id FROM departments WHERE name='Sales' LIMIT 1));
INSERT INTO users(id,name,bio,department_id) VALUES('${uuid.v4()}','Shaq','Professional Basketball Player',(SELECT id FROM departments WHERE name='Marketing' LIMIT 1));
`

const getAllDepartments = async()=>{
    const response = await client.query('SELECT * FROM departments')
    console.log(response)
    return response.rows
}

const getAllUsers = async()=>{
    const response = await client.query('SELECT * FROM users')
    return response.rows
}

module.exports={
sync,getAllDepartments,getAllUsers
}