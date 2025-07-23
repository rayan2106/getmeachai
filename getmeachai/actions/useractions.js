"use server"
import Razorpay from 'razorpay';
import payment from "@/models/payment";
import dbConnect from "@/db/connectDB";
import User from "@/models/User";

export const initiate = async (amount, to_username, paymentForm) => {
    await dbConnect();

    let user = await User.findOne({ username: to_username });
    const secret = user.razorpaysecret;


    var instance = new Razorpay({ key_id: user.razorpayid, key_secret: secret })

    let options = {
        amount: Number.parseInt(amount), // amount in the smallest currency unit
        currency: "INR",
    }

    let x = await instance.orders.create(options);
    ("razorpay order created", x);

    if (!x || !x.id) throw new Error("Failed to create Razorpay order");

    await payment.create({ oid: x.id, to_user: to_username, name: paymentForm.name, message: paymentForm.message, amount: paymentForm.amount });

    return x;
}

export const fetchuser = async (username) => {
    await dbConnect();
    let u = await User.findOne({ username: username });
    let user = JSON.parse(JSON.stringify(u));
    return user;
}


export const fetchpayments = async (username) => {
    await dbConnect();
    let p = await payment.find({ to_user: username, done: true }).sort({ amount: -1 }).lean().limit(10);

    let cleanedPayments = p.map(pay => ({
        ...pay,
        _id: pay._id.toString(),
        createdAt: pay.createdAt.toISOString(),
        updatedAt: pay.updatedAt.toISOString(),
    }))
    return cleanedPayments;
}

export const UpdateProfile = async (data, oldusername) => {
    await dbConnect();
    let ndata = Object.fromEntries(data)
    if (oldusername !== ndata.username) {
        let u = await User.findOne({ username: ndata.username });
        if (u) {
            return { error: "Username already exists" };
        }
        await User.updateOne({ email: ndata.email }, ndata);

        await payment.updateMany({ to_user: oldusername }, { to_user: ndata.username });
    } else {
        await User.updateOne({ email: ndata.email }, ndata);
    }
}
