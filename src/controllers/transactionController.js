import { db } from "../datasource/datasource.js";
import joi from "joi";

const bodyTransaction = joi.object({
    description: joi.string().required(),
    value: joi.number().positive().required(),
    type: joi.string().valid("in", "out").required()
});

function isValidTransaction(transaction) {
    const { error } = bodyTransaction.validate(transaction);
    if (error) return false;
    return true;
}

export async function createTransaction(req, res) {
    const transaction = req.body;
    if (!isValidTransaction(transaction)) return res.sendStatus(422);
    const date = Date.now;
    await db.collection("transactions").insertOne({ ...transaction, value: parseFloat(transaction.value), date});
    return res.status(201).send({ message: "sucesso" });
}

export async function readTransactions(_, res) {
    const transactions = await db.collection("transactions").find().toArray();
    return res.status(200).send({ transactions: transactions })
}


