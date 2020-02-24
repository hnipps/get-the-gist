import { GistData } from "../types/gist-data.type";
import { CreateGistResponse } from "../types/create-gist-response.type";

export const setupCreateGist = (octokit: any) => (
  files: GistData,
  description: string
): Promise<CreateGistResponse> =>
  octokit.gists.create({
    files,
    description
  });
