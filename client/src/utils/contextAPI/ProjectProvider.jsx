import React, { useContext, useState } from "react";

export const ProjectContext = React.createContext();

export default function ProjectProvider({ children }) {
  const [projectData, setProjectData] = useState({
    project: children.project || "",
    projectId: children.projectId || "",
    name: children.name || "",
    description: children.description || "",
    status: children.status || "",
    isClicked: children.isClicked || false,
  });

  console.log('from context', children.project);

  return (
    <ProjectContext.Provider value={{ projectData, setProjectData }}>
      {children}
    </ProjectContext.Provider>
  );
}

export function useProject() {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error("useProject must be used within a ProjectProvider");
  }
  return context;
}
