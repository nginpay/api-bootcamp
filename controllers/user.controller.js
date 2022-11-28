//importar models
const {User} = require('../models/index')
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const jwt = require('jsonwebtoken')

exports.createUsers  = async (req, res) => {
    try{

        const  { firstName, lastName, email, password} = req.body

        // valida se os campos firstName e email existem na requisição
        // retorna um erro caso um desses campos não esteja no body.
        if(!firstName || !email || !password){
            return res.status(400).json({"error": "firstName or email invalid or null - please try again"})
        }
    
        const emailValidation = await User.findOne({where: {email}})
    
        if(emailValidation) {
            return res.status(302).json({"error": "user exist"})
        }
    
        const hashpassword = bcrypt.hashSync(req.body.password, salt)
        const userData  = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hashpassword
            
        }

        const userAdded = await User.create(userData)
    
        return res.status(201).json({user: userAdded})

    }catch(error){
        res.send({
            error: 'Erro',
            message: error.message
        })
    }

}

// listagem de todos os usuários
exports.listAllUsers = async (req, res) => {
    const listaDeUsuarios = await User.findAll();

    // faça uma validação de lista de usuarios para quando não existem usuários a exibir.
    if(!listaDeUsuarios) {
        return res.status(404).json({msg: "nothing to show"})
    }

    return res.status(200).json(listaDeUsuarios)
}

// listagem de 1 usuário por id
exports.userDetails = async (req, res) => {
    const id = req.params.id;

    const details = await User.findOne({where: {id}})

    if(!details){
        return res.status(404).json({"msg": "user not found"})
    }

    return res.json(details)
}

// deletar ou excluir usuário pelo ID
exports.deleteUser = async (req, res) => {
    const id = req.params.id;

    const userDeleted = await User.destroy({where: {id}})

    if(!userDeleted){
        return res.status(404).json({'error': "user not found"})
    }

    return res.json({msg: 'user deleted'})
}

exports.updatePathUser = async (req, res) => {
    const id = req.params.id;

    const dataToUpdate = req.body;

    //criar uma validação para usuário não encontrado
    const findUser = await User.findOne({where: {id}})

    if(!findUser) {
        return res.status(404).json({mgs: 'user not found'})
    }

    const resultToUpdate = await User.update(
        //os valores que serão alterados
        dataToUpdate,

        //a condição para validar a alteração
        {where: {id}}
    )

    return res.json({msg: 'user updated'})
}


exports.loginUser = async (req, res, next) => {
    const { user, password } = req.body

    if(!user || !password){
        return res.status(400).json({error: "invalid credentials"})
    }

    const userValidate = await User.findOne({where: {email: user}})

    if(!userValidate){
        return res.status(404).json({error: "user not found"})
    }

    const userEmail = userValidate.email
    const userPassword = userValidate.password

    const pwdValidate = bcrypt.compareSync(password, userPassword);

    if(!pwdValidate){
        return res.status(404).json({error: "invalid login"})
    }

    const id = userValidate.id

    //return res.status(200).json({msg: "login success"})
    const token = jwt.sign({id}, process.env.SECRET, {
        expiresIn: 3000 //expira em 5min
    })

    return res.status(200).json({
        auth: true,
        token: token
    })
}