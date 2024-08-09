import { formatUnits } from 'viem';
import type { Transaction } from '~/types';

export const getAverageFee = (first: Transaction[], second: Transaction[]) => {
  const firstFiltered = first.filter(
    (tx) => new Date(tx.timestamp).getTime() > new Date(1723021973000).getTime()
  );

  const secondFiltered = second.filter(
    (tx) => new Date(tx.timestamp).getTime() > new Date(1723021973000).getTime()
  );

  const firstAvg =
    firstFiltered.reduce((a, b) => {
      return a + parseInt(b.fee.value);
    }, 0) / firstFiltered.length;

  const secondAvg =
    secondFiltered.reduce((a, b) => {
      return a + parseInt(b.fee.value);
    }, 0) / secondFiltered.length;

  const percentageIncrease = firstAvg / secondAvg;

  return {
    first: Math.floor(Number(formatUnits(BigInt(Math.floor(firstAvg)), 12))),
    second: Math.floor(Number(formatUnits(BigInt(Math.floor(secondAvg)), 12))),
    percentageIncrease,
  };
};

export const getNumberByDate = (
  schemaTxns: Transaction[],
  attestationTxns: Transaction[]
) => {
  const schemaData = schemaTxns.reduce<Record<string, number>>((acc, curr) => {
    const date = new Date(curr.timestamp)
      .toLocaleDateString('en-CA', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
      .split('/')
      .join('-');
    if (!acc[date]) {
      acc[date] = 0;
    }

    acc[date] += 1;

    return acc;
  }, {});

  const attestationData = attestationTxns.reduce<Record<string, number>>(
    (acc, curr) => {
      const date = new Date(curr.timestamp)
        .toLocaleDateString('en-CA', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        })
        .split('/')
        .join('-');
      if (!acc[date]) {
        acc[date] = 0;
      }

      acc[date] += 1;

      return acc;
    },
    {}
  );

  const combinedData: {
    date: string;
    schemas: number;
    attestations: number;
  }[] = [];

  const uniqueKeys = new Set([
    ...Object.keys(schemaData),
    ...Object.keys(attestationData),
  ]);

  uniqueKeys.forEach((key) => {
    combinedData.push({
      date: key,
      schemas: schemaData[key] ?? 0,
      attestations: attestationData[key] ?? 0,
    });
  });

  return combinedData.toReversed();
};
