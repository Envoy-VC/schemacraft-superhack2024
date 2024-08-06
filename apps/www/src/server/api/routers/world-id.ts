import { z } from 'zod';
import { env } from '~/env';
import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';

interface VerifyResponse {
  action: string;
  created_at: string;
  max_uses: number;
  nullifier_hash: string;
  success: boolean;
  uses: number;
}
export const worldIdRouter = createTRPCRouter({
  verify: publicProcedure
    .input(
      z.object({
        proof: z.string(),
        merkle_root: z.string(),
        nullifier_hash: z.string(),
        verification_level: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const res = await fetch(
        `https://developer.worldcoin.org/api/v2/verify/${env.NEXT_PUBLIC_WORLDCOIN_CLIENT_ID}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...input,
            action: 'authentication',
          }),
        }
      );

      const data = (await res.json()) as VerifyResponse;

      return data;
    }),
});
