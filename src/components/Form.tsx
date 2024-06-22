import React, { useState } from "react";
import axios from "axios";
import { FileChange, Commit } from "@/lib/types";
import { ButtonLoading } from "@/components/ButtonLoading";
import { Button } from "@/components/ui/button";

interface FormProps {
  setCommits: (commits: Commit[]) => void;
}

const Form: React.FC<FormProps> = ({ setCommits }) => {
  const [repoUrl, setRepoUrl] = useState<string>("");
  const [commitLimit, setCommitLimit] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    try {
      const limit = commitLimit ? parseInt(commitLimit) : null;
      const response = await axios.post("http://localhost:5000/commits", {
        repo_url: repoUrl,
        limit: limit,
      });

      const fileChanges: FileChange[] = response.data;

      // Group file changes by commit SHA
      const commits: Commit[] = [];
      const grouped = fileChanges.reduce((acc, fileChange) => {
        if (!acc[fileChange.sha]) {
          acc[fileChange.sha] = {
            sha: fileChange.sha,
            author: fileChange.author,
            timestamp: fileChange.timestamp,
            file_changes: [],
          };
        }
        acc[fileChange.sha].file_changes.push(fileChange);
        return acc;
      }, {} as { [key: string]: Commit });

      for (const sha in grouped) {
        commits.push(grouped[sha]);
      }

      setCommits(commits);
    } catch (error) {
      console.error("Error fetching commits:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="repoUrl" className="block text-gray-700 mb-2">
          GitHub Repository URL
        </label>
        <input
          type="text"
          id="repoUrl"
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div>
        <label htmlFor="commitLimit" className="block text-gray-700 mb-2">
          Commit Limit (leave empty to scan all commits)
        </label>
        <input
          type="number"
          id="commitLimit"
          value={commitLimit}
          onChange={(e) => setCommitLimit(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          min="1"
        />
      </div>
      {loading ? (
        <ButtonLoading />
      ) : (
        <Button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Fetch Commits
        </Button>
      )}
    </form>
  );
};

export default Form;
