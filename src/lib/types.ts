export interface FileChange {
  author: string;
  changed_lines: number[];
  file_content: string;
  sha: string;
  temp_filepath: string;
  timestamp: string;
}

export interface Commit {
  sha: string;
  author: string;
  timestamp: string;
  file_changes: FileChange[];
}
