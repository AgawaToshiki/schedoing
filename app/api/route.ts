import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json([
    { id: 1, message: "データ1" },
    { id: 2, message: "データ2" },
    { id: 3, message: "データ3" }
  ]);
}