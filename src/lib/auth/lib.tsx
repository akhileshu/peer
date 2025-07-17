import { getServerSession } from "next-auth";
import { authOptions } from "./authOptions";

export const getServerUser = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    throw new Error("Unauthorized: User session not found");
  }

  return session.user;
};

