import { getNumberByDate } from '~/lib/helpers/stats';

import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';
import { type Transaction } from '~/types';

export const statsRouter = createTRPCRouter({
  getStats: publicProcedure.query(async () => {
    const attestBaseLink =
      'https://explorer-attest-chain-52s82yu298.t.conduit.xyz/api/v2/transactions?filter=validated&type=contract_call&method=';

    const attestationTxns: Transaction[] = [];
    const schemaTxns: Transaction[] = [];

    const schemaTxnsPage = await fetch(`${attestBaseLink}0x60d7a278}`).then(
      async (res) => (await res.json()) as { items: Transaction[] }
    );

    const attestationTxnsPage = await fetch(`${attestBaseLink}0xf17325e7`).then(
      async (res) => (await res.json()) as { items: Transaction[] }
    );

    schemaTxns.push(...schemaTxnsPage.items);
    attestationTxns.push(...attestationTxnsPage.items);

    const data = getNumberByDate(schemaTxns, attestationTxns);

    return data;
  }),
});
