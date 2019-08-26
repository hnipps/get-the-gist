export const setupCreateGist = octokit => files =>
  octokit.gists.create({
    files,
  });
