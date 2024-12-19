export type get_user_info_args = undefined;
export type get_user_info_return = UserInfo;

export type greet_args = {
  name: string;
};
export type greet_return = string;

export type UserInfoResponse = 'NoUser' | 'RequiredPassword' | { UserInfo: UserInfo; NoUser: undefined; RequiredPassword: undefined;  };

export type UserInfo = 'None' | 'Locked' | { Unlocked: { pub_key: string;  }; None: undefined; Locked: undefined; Unavailable: undefined; Invalid: undefined; } | 'Unavailable' | 'Invalid';

type Keys = 'get_user_info' | 'greet';
type FunctionArgs<K extends Keys> = K extends 'get_user_info'
  ? get_user_info_args
  : K extends 'greet'
  ? greet_args
  : never;
type FunctionRet<K extends Keys> = K extends 'get_user_info'
  ? get_user_info_return
  : K extends 'greet'
  ? greet_return
  : never;

import { invoke as tauriInvoke } from '@tauri-apps/api/core';

type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

export async function invoke<K extends Keys>(
  cmd: K,
  args: Prettify<FunctionArgs<K>>
): Promise<Prettify<FunctionRet<K>>> {
  return tauriInvoke(cmd, args);
}