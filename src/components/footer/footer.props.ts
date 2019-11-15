export interface FooterProps {
  onCreateGist: (event: MouseEvent) => void;
  onGistDescriptionChange: (event: Event) => void;
  snippetCount: number;
  loading: boolean;
}
