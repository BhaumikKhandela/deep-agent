import { withErrorHandler } from "@/lib/mongodb/withErrorHandler";
import { getAllThreadsByUserTool } from "@/lib/tools/ThreadTools";
import { UserService } from "@/services/UserService";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
          scope: ["openid", "email", "profile"].join(" "),
        },
      },
      httpOptions: {
        timeout: 10000,
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({
      user,
      account,
      profile,
      email,
      credentials,
    }: Record<string, any>) {
      const userData = { ...user } as {
        id: string;
        name: string;
        email: string;
        image: string;
      };
      const access_token = account?.access_token;
      const refresh_token = account?.refresh_token;

      withErrorHandler(async () => {
        const userService = UserService.getInstance();
        await userService.createUser({
          ...userData,
          access_token,
          refresh_token,
        });
      })();

      const result = await getAllThreadsByUserTool.invoke({
        userId: userData.id,
      });
      const { redirectThreadId } = JSON.parse(result);

      return `/chat/${redirectThreadId}`;
    },
    async redirect({ url, baseUrl }: Record<string, any>) {
      // After sign in
      if (url.startsWith("/")) return `${baseUrl}/chat`;
      if (new URL(url).origin === baseUrl) return `${baseUrl}/chat`;

      if (url.includes("/api/auth/signout") || url.includes("/auth/signin")) {
        return `${baseUrl}/auth/login`;
      }

      return baseUrl;
    },

    async jwt({
      token,
      user,
      account,
      profile,
      isNewUser,
    }: Record<string, any>) {
      if (account) {
        if (account.access_token) {
          token.access_token = account?.access_token;
        }
        if (account.refresh_token) {
          // store refresh token in jwt (server-side)
          token.refresh_token = account?.refresh_token;
        }
      }

      if (user) {
        try {
          // If it's a new sign in, get user from DB
          const userService = UserService.getInstance();
          const dbUser = await userService.findByEmail(user.email);

          if (dbUser) {
            token.userId = dbUser._id.toString();
          }
        } catch (error) {
          console.error("Error occurred while fetching user from DB:", error);
        }
      }
      return token;
    },
    // everytime session is checked
    async session({ session, user, token }: Record<string, any>) {
      if (token?.userId) {
        session.user.id = token.userId;
      }

      if (token?.access_token) {
        session.user.access_token = token.access_token;
      }

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
