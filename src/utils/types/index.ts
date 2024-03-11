export type ParentType = {
  data: DataType;
}

export type DataType = {
  user: UserType;
  // another hack to make it work
    // will fix oneday tm
  projects: ProjectType;
  project: ProjectType;
}

export type UserType = {
  id: string;
  name: string;
  email: string;
  password: string;
  projects: ProjectType[];
}

export type ProjectType = {
  // few queries are returning project inside a project object
  // this is a hack to make it work, as i dont want to mess around w the queries and possibly break something
  // this works so its good enough for now
  map(arg0: (p: ProjectType) => import("react").JSX.Element): import("react").ReactNode;
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  user: UserType;
  userId: string;
  dueDate: string;
  tasks: TaskType[];

  project:{
    id: string;
    name: string;
    description: string;
    isActive: boolean;
    user: UserType;
    userId: string;
    dueDate: string;
    tasks: TaskType[];
  }
}

export type TaskType = {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  dueDate: string;
  project: ProjectType;
}