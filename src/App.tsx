import React, { useState } from "react";
import Form from "@/components/Form";
import Commits from "@/components/Commits";
import { Commit } from "./lib/types";

const App: React.FC = () => {
  const [commits, setCommits] = useState<Commit[]>([]);

  return (
    <div className="flex min-h-screen bg-gray-100 flex relative">
      <div className="flex flex-col w-1/2 p-8 h-full sticky top-0">
        <h1 className="text-2xl font-bold mb-4">
          GitHub Commits Skill Extractor
        </h1>
        <Form setCommits={setCommits} />
      </div>
      <div className="w-1/2 p-4">
        <Commits commits={commits} />
      </div>
    </div>
  );
};

export default App;
