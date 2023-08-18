import { NextResponse } from "next/server";
import Customer from "../../../lib/models/Customer";

import dbConnect from "../../../lib/configs/database";

dbConnect();
export async function DELETE(req) {
  let id = req.url.split("delete-customer/")[1];
  console.log(id, "id", typeof id);

  // console.log(resp);
  try {
    const response = await Customer.deleteOne({ _id: id });
    if (response.acknowledged) {
      return NextResponse.json(
        { success: true, deletion: response },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { success: false, deletion: null }
        // { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, deletion: null }
      // { status: 400 }
    );
  }
}
