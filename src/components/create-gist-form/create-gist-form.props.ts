export interface GistItemFormProps {
  onAddSnippetClick: (event: MouseEvent) => void;
  onRemoveSnippetClick: (event: MouseEvent) => void;
  onFilenameChange: (ev: any) => void;
  filename?: string;
}
