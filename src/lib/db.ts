import { PrismaClient } from "@prisma/client";

let prismaInstance;

export default prismaInstance || (prismaInstance = new PrismaClient());