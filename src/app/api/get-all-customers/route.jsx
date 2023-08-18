import { NextResponse } from "next/server";
import Customer from "../../lib/models/Customer";

import dbConnect from "../../lib/configs/database";

dbConnect();

export async function GET(req, res) {
  // console.log("GET ALL CUSTOMERS");
  const data = await Customer.find();
  if (data) {
    return NextResponse.json(
      { success: true, customers: data },
      { status: 200 }
    );
  } else {
    return NextResponse.json(
      { success: false, customers: null },
      { status: 404 }
    );
  }
}
