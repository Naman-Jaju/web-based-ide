export interface TemplateFile {
  filename: string;
  fileExtension: string;
  content: string;
}
export interface PlaygroundData {
  id: string;
  name?: string;
  [key: string]: any;
}

export interface TemplateFolder {
  folderName: string;
  items: (TemplateFile | TemplateFolder)[];
}
