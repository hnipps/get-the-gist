export const awaitStream = (observable$, testAssertions, setupTest) =>
  new Promise(resolve => {
    setupTest && setupTest();
    observable$.subscribe(value => {
      resolve(testAssertions(value));
    });
  });
