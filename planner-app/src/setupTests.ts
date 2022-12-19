// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { createHash, randomBytes } from 'crypto';
import { TextEncoder } from 'util';

global.TextEncoder = TextEncoder;

Object.defineProperty(global.self, "crypto", {
  value: {
    getRandomValues: (arr: any) => randomBytes(arr.length),
    subtle: {
      digest: (algorithm: string, data: Uint8Array) => {
        return new Promise((resolve, reject) =>
          resolve(
            createHash(algorithm.toLowerCase().replace("-", ""))
              .update(data)
              .digest()
          )
        );
      },
    },
  },
});