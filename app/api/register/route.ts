import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

import db from "@/lib/db";
import _ from "lodash";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body) {
      return new NextResponse("Missing body", { status: 400 });
    }

    const { email, name, password } = body;
    if (!email || !name || !password) {
      return new NextResponse("Missing info", { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await db.user.create({
      data: {
        email,
        name,
        hashedPassword,
      },
    });

    return NextResponse.json(_.pick(user, ["email", "id"]));
  } catch (err) {
    console.log("REGISTER ERROR", err);
    return new NextResponse("Internal error", { status: 500 });
  }
}
