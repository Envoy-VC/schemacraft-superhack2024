export interface Transaction {
  timestamp: string;
  fee: Fee;
  gas_limit: number;
  block: number;
  status: string;
  method: string;
  confirmations: number;
  type: number;
  exchange_rate: string;
  to: AddressParam;
  tx_burnt_fee: string;
  max_fee_per_gas: string;
  result: string;
  hash: string;
  gas_price: string;
  priority_fee: string;
  base_fee_per_gas: string;
  from: AddressParam;
  token_transfers: TokenTransfer[];
  tx_types: string[];
  gas_used: string;
  created_contract: AddressParam;
  position: number;
  nonce: number;
  has_error_in_internal_txs: boolean;
  actions: object[];
  decoded_input: DecodedInput;
  token_transfers_overflow: boolean;
  raw_input: string;
  value: string;
  max_priority_fee_per_gas: string;
  revert_reason: string;
  confirmation_duration: [number?, number?];
  tx_tag: string;
}

interface AddressParam {
  hash: string;
  implementation_name: string;
  name: string;
  is_contract: boolean;
  private_tags: AddressTag[];
  watchlist_names: WatchlistName[];
  public_tags: AddressTag[];
  is_verified: boolean;
}

interface AddressTag {
  address_hash: string;
  display_name: string;
  label: string;
}

interface WatchlistName {
  display_name: string;
  label: string;
}

interface TokenTransfer {
  block_hash: string;
  from: AddressParam;
  log_index: string;
  method: string;
  timestamp: string;
  to: AddressParam;
  token: TokenInfo;
  total: TotalERC20 | TotalERC721 | TotalERC1155 | TotalERC1155Batch;
  tx_hash: string;
  type: string;
}

interface TokenInfo {
  address: string;
  circulating_market_cap: string;
  icon_url: string;
  name: string;
  decimals: string;
  symbol: string;
  type: string;
  holders: string;
  exchange_rate: string;
  total_supply: string;
}

interface TotalERC20 {
  decimals: string;
  value: string;
}

interface TotalERC721 {
  token_id: string;
}

interface TotalERC1155 {
  token_id: string;
  decimals: string | null; // Can be null based on the example provided
  value: string;
}

type TotalERC1155Batch = TotalERC1155[];

interface Fee {
  type: string;
  value: string;
}

interface DecodedInput {
  method_call: string;
  method_id: string;
  parameters: DecodedInputParameter[];
}

interface DecodedInputParameter {
  name: string;
  type: string;
  value: string;
}
