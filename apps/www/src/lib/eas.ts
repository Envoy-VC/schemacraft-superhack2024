interface EASConfig {
  eas: string;
  indexer: string;
  schemaRegistry: string;
}

export const easConfig: Record<number, EASConfig> = {
  13370: {
    eas: '0xe86b1899376c77e1a109eA2124E462EF58E56897',
    indexer: '0xA787c2162F60559eC602C33b5720e51ec19bfF5F',
    schemaRegistry: '0x8f966BC6Ad2D241a01C1f7634C47c7419Ce96830',
  },
  8453: {
    eas: '0x4200000000000000000000000000000000000021',
    indexer: '0x4200000000000000000000000000000000000020',
    schemaRegistry: '0x37AC6006646f2e687B7fB379F549Dc7634dF5b84',
  },
  11155111: {
    eas: '0xC2679fBD37d54388Ce493F1DB75320D236e1815e',
    indexer: '0xaEF4103A04090071165F78D45D83A0C0782c2B2a',
    schemaRegistry: '0x0a7E2Ff54e76B8E6659aedc9103FB21c038050D0',
  },
};
