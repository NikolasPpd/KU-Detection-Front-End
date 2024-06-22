import React from "react";
import CommitCard from "./CommitCard";
import { Commit } from "@/lib/types";

interface CommitsProps {
  commits: Commit[];
}

const Commits: React.FC<CommitsProps> = ({ commits }) => {
  if (commits.length === 0) {
    return <p className="text-gray-500">No commits yet</p>;
  }

  return (
    <div className="space-y-4">
      {commits.map((commit) => (
        <CommitCard key={commit.sha} commit={commit} />
      ))}
    </div>
  );
};

export default Commits;
