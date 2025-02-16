import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { hashPassword } from "@lib/auth"

const prisma = new PrismaClient()

export async function POST(req: Request) {
  const { username, email, password } = await req.json()

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json({ error: "Email already in use" }, { status: 400 })
    }

    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        name: username,
        email,
        password: hashedPassword,
      },
    })

    return NextResponse.json({ message: "User created successfully" }, { status: 201 })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "An error occurred during registration" }, { status: 500 })
  }
}

