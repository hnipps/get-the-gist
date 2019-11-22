import { Observable } from "rxjs";

export const awaitStream = <T>(
  observable$: Observable<T>,
  testAssertions: (value: T) => void,
  setupTest: () => void
) =>
  new Promise(resolve => {
    observable$.subscribe(value => {
      resolve(testAssertions(value));
    });
    setupTest && setupTest();
  });
