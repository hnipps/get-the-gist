export const awaitStream = (observable$, testAssertions, setupTest) =>
  new Promise(resolve => {
    observable$.subscribe(value => {
      resolve(testAssertions(value));
    });
    setupTest && setupTest();
  });
