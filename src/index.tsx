import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-dummy-sdk' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const DummySdk = NativeModules.DummySdk
  ? NativeModules.DummySdk
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export function multiply(a: number, b: number): Promise<number> {
  return DummySdk.multiply(a, b);
}
