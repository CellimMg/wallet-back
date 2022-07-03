import { db } from "../datasource/datasource.js";
import { v4 as uuid } from 'uuid';
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


//---------------------------- signin

const bodySignInSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
});


async function storeToken(token, uid) {
    await db.collection('sessions').insertOne({
        token,
        uid: uid
    });
}

async function getUserWithCredentials(email, password) {
    const userBD = await db.collection('users').findOne({ email: email });
    if (userBD && bcrypt.compareSync(password, userBD.password)) {
        return userBD;
    }
    return;
}

export async function signin(req, res) {
    const userBody = req.body;
    const { error } = bodySignInSchema.validate(userBody);
    if (error) return res.sendStatus(422);
    const user = await getUserWithCredentials(userBody.email, userBody.password);
    if (user) {
        const token = uuid();
        await storeToken(token, user._id);
        return res.status(201).send({ token });
    } else {
        return res.status(401).send({ message: "Usuário e/ou senha incorretos!" });
    }
}