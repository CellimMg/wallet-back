import { db } from "../datasource/datasource.js";


async function validateToken(req, res, next) {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");
    const session = await db.collection('sessions').findOne({ token });
    if (!session) {
        return res.sendStatus(401);
    }
    res.locals.uid = session.uid.toHexString();
    next();
}


export default validateToken;