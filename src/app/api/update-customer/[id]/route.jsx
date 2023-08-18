import { NextResponse } from "next/server";
import Customer from "../../../lib/models/Customer";

import dbConnect from "../../../lib/configs/database";

dbConnect();
export async function PUT(req) {
  let id = req.url.split("update-customer/")[1];
  console.log(id, "id", typeof id);

  // console.log(resp);
  try {
    const customer = await Customer.findOne({ _id: id });
    let { name, phoneNumber, email } = await req.json();
    if (customer) {
      customer.name = name;
      customer.phoneNumber = phoneNumber;
      customer.email = email;

      const save = await customer.save();
      return NextResponse.json(
        { success: true, customer: save },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { success: false, customer: null }
        // { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, customer: null }
      // { status: 400 }
    );
  }
}
