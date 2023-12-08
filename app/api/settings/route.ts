import getCurrentUser from "@/actions/getCurrentUser";
import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { name, image } = await req.json();

    const updatedUser = await db.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        name,
        image,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (err) {
    console.log("POST SETTINGS ERROR", err);
    return new NextResponse("Internal error", { status: 500 });
  }
}
