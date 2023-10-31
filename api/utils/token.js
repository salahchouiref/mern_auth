import jwt from "jsonwebtoken";

export const createToken = (user) => {
    const token = jwt.sign({id:user._id},process.env.JWT_SECRET);
    const {password : hashedPassword,...rest} = user._doc;
    const expiryDate = new Date(Date.now()+3600000);
    return {rest,token,expiryDate};
}