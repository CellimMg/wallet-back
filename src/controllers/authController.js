import { db } from "../datasource/datasource.js";
import bcrypt from "bcrypt";
import joi from "joi";


const bodySignUpSchema = joi.object({
    name: joi.string().min(4).required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).required()
});

function isValidUser(user) {
    const { error } = bodySignUpSchema.validate(user);
    if (error) return false;
    return true;
}

function cryptPass(pass) {
    return bcrypt.hashSync(pass, 10);
}

export async function signup(req, res) {
    const user = req.body;

    if (!isValidUser(user)) {
        return res.sendStatus(422);
    }

    await db.collection('users').insertOne({ ...user, password: cryptPass(user.password) });
    res.status(201).send({ message: 'Usuário criado com sucesso' });
}

export async function signin(req, res) {

}