import { Context } from "../../../../../context";
import { User } from "../../../../schema/User";

async function meService(context: Context): Promise<User | null> {
    return context.prisma.user.findUnique({
        where: {
            id: context.user?.id
        }
    })
};

export default meService;