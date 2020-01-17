import { GistData } from "../../types/gist-data.type";
import { CreateGistResponse } from "../../types/create-gist-response.type";

export interface MainProps {
  currentTab: string;
  createGist: (
    files: GistData,
    description: string
  ) => Promise<CreateGistResponse>;
  handleSignOut: (e: MouseEvent) => void;
}
