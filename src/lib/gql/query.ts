import { gql } from "@apollo/client";

export const hello = gql`query {
  Hello
}
`
export const projects = gql`query {
  projects {
    createdBy {
      id
    }
    description
    dueDate
    id
    isActive
    name
    tasks {
      id
    }
  }
}`

export const project = gql`query($projectId: ID!) {
  project(id: $projectId) {
    createdBy {
      id
    }
    description
    dueDate
    id
    isActive
    name
    tasks {
      id
    }
  }
}
`

export const tasks = gql`query {
  tasks {
    isActive
    name
    dueDate
    id
    description
    project {
      id
    }
  }
}`

export const task = gql`query($taskId: ID!) {
  task(id: $taskId) {
    dueDate
    id
    description
    isActive
    name
    project {
      id
    }
  }
}
`

export const users = gql`query {
  users {
    email
    id
    name
    projects {
      id
    }
  }
}
`

export const user = gql`query($userId: ID!) {
  user(id: $userId) {
    email
    id
    name
    projects {
      id
    }
  }
}
`