// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Disabling React Router Flag Warning in console for tests
beforeAll(() => {
  jest
    .spyOn(console, 'warn')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .mockImplementation((msg: string, ...args: any[]) => {
      if (!msg.includes('React Router Future Flag Warning')) {
        // eslint-disable-next-line no-console
        console.warn(msg, ...args);
      }
    });
});

afterAll(() => {
  jest.restoreAllMocks();
});
