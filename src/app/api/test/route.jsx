import { NextResponse } from "next/server";

export async function GET(req, res) {
  console.log("GET");
  return NextResponse.json(
    { hello: "world" },
    {
      status: 200,
    }
  );
}
