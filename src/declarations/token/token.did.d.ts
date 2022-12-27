import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface _SERVICE {
  'balanceOf' : ActorMethod<[Principal], bigint>,
  'getCanisterId' : ActorMethod<[], Principal>,
  'getSymbol' : ActorMethod<[], string>,
  'payOut' : ActorMethod<[], string>,
  'transfer' : ActorMethod<[Principal, bigint], string>,
}
