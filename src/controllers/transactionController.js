import { db } from "../datasource/datasource.js";
import joi from "joi";
import { ObjectId } from "mongodb";
import dayjs from "dayjs";

const bodyTransaction = joi.object({
    description: joi.string().required(),
    value: joi.number().positive().required(),
    type: joi.string().valid("in", "out").required(),
    uid: joi.string().required()
});

function isValidTransaction(transaction) {
    const { error } = bodyTransaction.validate(transaction);
    if (error) return false;
    return true;
}

export async function createTransaction(req, res) {
    const transaction = req.body;
    if (!isValidTransaction(transaction)) return res.sendStatus(422);
    transaction.date = dayjs().format('DD/MM/YY')
    await db.collection("transactions").insertOne({ ...transaction, value: parseFloat(transaction.value) });
    return res.status(201).send({ message: "sucesso" });
}

export async function readTransactions(_, res) {
    const { uid } = res.locals;
    const transactions = await db.collection("transactions").find({ "uid": ObjectId.valueOf(uid) }).toArray();
    return res.status(200).send({ transactions: transactions })
}


