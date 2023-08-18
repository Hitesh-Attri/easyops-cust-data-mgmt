import { NextResponse } from "next/server";
import Customer from "../../lib/models/Customer";

import dbConnect from "../../lib/configs/database";

dbConnect();

export async function POST(req, res) {
  // console.log("GET ALL CUSTOMERS");
  let { name, phoneNumber, email } = await req.json();
  // console.log(req);

  if (name && phoneNumber && email) {
    let obj = new Customer({ name, phoneNumber, email });

    obj = await obj.save();

    return NextResponse.json({ success: true, Customer: obj }, { status: 201 });
  } else {
    return NextResponse.json(
      { success: false, Customer: null },
      { status: 404 }
    );
  }

  // return NextResponse.json({ msg: "Hello World" }, { status: 201 });
}
