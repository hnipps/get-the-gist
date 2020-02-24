export interface FooterProps {
  onCreateGist: (event: Event) => void;
  onGistDescriptionChange: (event: Event) => void;
  snippetCount: number;
  loading: boolean;
}
