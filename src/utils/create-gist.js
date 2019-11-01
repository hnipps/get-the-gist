export const setupCreateGist = octokit => (files, description) =>
  octokit.gists.create({
    files,
    description
  });
