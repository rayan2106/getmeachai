import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import dbConnect from "@/db/connectDB";
import Payment from "@/models/payment";
import User from "@/models/User";
import Razorpay from 'razorpay';

export const POST = async (request) => {
    await dbConnect();
    ("🔁 Reached Razorpay callback");

    let body = await request.formData();
    body = Object.fromEntries(body);

    ("Body:", body);

    let p = await Payment.findOne({ oid: body.razorpay_order_id });
    if (!p) {
        return NextResponse.json({ error: "Payment not found" }, { status: 404 });
    }

    let user = await User.findOne({ username: p.to_user });
    const secret = user.razorpaysecret;

    let xx = validatePaymentVerification({
        "order_id": body.razorpay_order_id,
        "payment_id": body.razorpay_payment_id
    },
        body.razorpay_signature,
        secret
    );

    if (xx) {
        const updatedPayment = await Payment.findOneAndUpdate(
            { oid: body.razorpay_order_id },
            { done: true },
            { new: true }
        );

        const redirectUrl = `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/${updatedPayment.to_user}?paymentdone=true`;

        return NextResponse.redirect(redirectUrl);

    }
    else {
        return NextResponse.json({ error: "Payment verification failed" }, { status: 400 });
    }
}