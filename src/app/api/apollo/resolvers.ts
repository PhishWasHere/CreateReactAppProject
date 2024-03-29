import getError from "@/utils/getErr";
import prisma from "@/lib/prisma";
import { serverAuth } from "@/utils/auth";
import {toISO, toLocal} from "@/utils/dateConverter";
import { ProjectType } from "@/utils/types";

// need to fix types later
// type TaskType = {
//   id: string;
//   name: string;
//   description: string;
//   isActive: boolean;
//   priority: number;
//   dueDate: Date;
//   project: ProjectType;
// };

// type ProjectType = {
//   id: string;
//   name: string;
//   description: string;
//   isActive: boolean;
//   createdAt: Date;
//   createdBy: UserType;
//   dueDate: Date;
//   tasks: TaskType[];
// };

// type UserType = {
//   id: string;
//   name: string;
//   email: string;
//   createdAt: Date;
//   projects: ProjectType[];
// };

// type ContextType = {
//   prisma: Prisma;
//   user: UserType;
//   project: ProjectType;
//   task: TaskType;
// };

const resolvers = {
  Query: {
    //todo: add auth middleware to queries
    Hello:  async (_: null, __: null, ___: null) => {
      // for testing purposes
      return "world";
    },

    users: async (_: null, __: null, ___: null) => {
      // for testing purposes
      return prisma.user.findMany({ include: { projects: true }});
    },
    
    user: async (_: null, __: null, context: any) => {      
      if (!context.body.token) throw new Error("Not authenticated");
      const ctx: any = await serverAuth.authMiddleware(context);
      if (ctx.statusCode !== 200) throw new Error("Authentication error");
      
      try {
        const data = await prisma.user.findUnique({
          where: { id: String(ctx.body.user._id) },
          include: { projects: true, tasks: true},
        });
        
        return data
      } catch (err) {

        const msg = getError(err);
        throw new Error(msg);
      }
    },

    projects: async (_: null, __: null, context: any) => {
      if (!context.body.token) throw new Error("Not authenticated");
      const ctx: any = await serverAuth.authMiddleware(context);
      if (ctx.statusCode !== 200) throw new Error("Authentication error");

      try {
        const projects = await prisma.project.findMany({ 
          where: { userId: ctx.body.user._id },
          include: { tasks: true }}
        );
          
        return projects

      } catch (err) {
        const msg = getError(err);
        throw new Error(msg);
      }
    },

    project: async (_: null, { id }: { id: string }, context: any) => {     
      if (!context.body.token) throw new Error("Not authenticated");
      const ctx: any = await serverAuth.authMiddleware(context);
      if (ctx.statusCode !== 200) throw new Error("Authentication error");

      try {
        const project = await prisma.project.findUnique({
          where: { id: String(id) },
          include: { user: true, tasks: true },
        });


        if (project?.userId !== ctx.body.user._id) {
          return { error: true, message: "Unauthorized", status: 401 };
        }

        return project;

      } catch (err) {

        const msg = getError(err);
        throw new Error(msg);
      }
    },
    
    tasks: async (_: null, {id}: {id:string}, context: any) => {
      if (!context.body.token) throw new Error("Not authenticated");
      const ctx: any = await serverAuth.authMiddleware(context);
      if (ctx.statusCode !== 200) throw new Error("Authentication error");

      try {
        return prisma.task.findMany({ 
          where : { projectId: String(id) },
          include: { project: true } 
        });

      } catch (err) {
        const msg = getError(err);
        throw new Error(msg);
      }
    },

    task: async (_: null, { id }: { id: string }, context: any) => {
      if (!context.body.token) throw new Error("Not authenticated");
      const ctx: any = await serverAuth.authMiddleware(context);
      if (ctx.statusCode !== 200) throw new Error("Authentication error");

      try {
        const task = await prisma.task.findUnique({
          where: { id: String(id) },
          include: { project: true },
        });

        if (task?.project.userId !== ctx.body.user._id) {
          return { error: true, message: "Unauthorized", status: 401 };
        }

        return task;

      } catch (err) {
        const msg = getError(err);
        throw new Error(msg);
      }
    }
    
  },

  Mutation: {
    // todo: need to remove any type from ctx inside protected routes
    // todo: inside folded
    signup: async (_: null, { email, password, name }: { email: string, password: string, name: string }, __: null) => {
      try {
        const user = await prisma.user.create({
          data: {
            email, // todo: need to encrypt email
            password, // todo: need to hash
            name,
          },
        });
        
        const token = serverAuth.signToken({ _id: user.id, username: user.name});
        
        return {user, token};
      } catch (err) {
        const msg = getError(err);
        throw new Error(msg);
      }
    },

    // todo inside folded
    login: async (_: null, { email, password }: { email: string, password: string }, __: null) => {
      try {
        
        const user = await prisma.user.findUnique({
          where: { email },
        });        
        
        // todo: need to add hashing comparison
        if (!user || user.password !== password) {
          throw new Error("Invalid credentials");
        };

        const token = serverAuth.signToken({ _id: user.id, email, username: user.name});
        
        return {user, token};
      } catch (err) {
        const msg = getError(err);
        throw new Error(msg);
      }
    },

    updateUser: async (_: null, { name, email, password }: { name: string, email: string, password: string }, context: any) => {      
      if (!context.body.token) throw new Error("Not authenticated");

      const ctx: any = await serverAuth.authMiddleware(context);
      if (ctx.statusCode !== 200) throw new Error("Authentication error");

      try {
        const id = ctx.body.user._id;

        const user = await prisma.user.update({
          where: { id: String(id)},
          data: {
            name,
            email,
            password
          },
        });
        
        return user;
      } catch (err) {
        const msg = getError(err);
        throw new Error(msg);
      }
    },
    
    removeUser: async (_: null, { id }: { id: string }, context: any) => {
      if (!context.body.token) throw new Error("Not authenticated");

      const ctx: any = await serverAuth.authMiddleware(context);
      if (ctx.statusCode !== 200) throw new Error("Authentication error");
      
      try {
        const user = await prisma.user.delete({
          where: { id: String(ctx.body.user._id) },
        });

        return user;
      } catch (err) {
        const msg = getError(err);
        throw new Error(msg);
      }
    },

    createProject: async (_: null, { name, description, dueDate }: { name: string, description: string, dueDate: Date }, context: any) => {
         
      if (!context.body.token) throw new Error("Not authenticated");

      const ctx: any = await serverAuth.authMiddleware(context);
      if (ctx.statusCode !== 200) throw new Error("Authentication error");
      
      if (!name || !description || !dueDate) {
        throw new Error("Invalid values");
      }

      try {
        const _id = ctx.body.user._id;

        const project = await prisma.project.create({
          data: {
            name,
            description,
            dueDate,
            user: {
              connect: {
                id: _id, 
              },
            },
          },
        });
        
        return project;
      } catch (err) {
        const msg = getError(err);
        throw new Error(msg);
      }
    },

    removeProject: async (_: null, { id }: { id: string }, context: any) => {      
      if (!context.body.token) throw new Error("Not authenticated");
      const ctx: any = await serverAuth.authMiddleware(context);
      if (ctx.statusCode !== 200) throw new Error("Authentication error");

      try {
        const project = await prisma.project.findUnique({
          where: { id: String(id) }
        });

        if (!project) throw new Error("Project not found");

        if (project.userId !== ctx.body.user._id) {
          throw new Error("Unauthorized");
        }

        await prisma.project.delete({
          where: { id: String(id) },
        });

        let res = {
          id: id,
        };
        
        return res

      } catch (err) {
        console.log(err);
  
        const msg = getError(err);
        throw new Error(msg);
      }
    },

    updateProject: async (_: null, { id, name, description, dueDate, isActive }: { id: string, name: string, description: string, dueDate: Date, isActive: boolean }, context: any) => {      
      if (!context.body.token) throw new Error("Not authenticated");
      const ctx: any = await serverAuth.authMiddleware(context);
      if (ctx.statusCode !== 200) throw new Error("Authentication error");

      try {
        const project = await prisma.project.update({
          where: { id: String(id) },
          data: {
            name,
            description,
            dueDate,
            isActive,
          },
        });

        return project;
      } catch (err) {
        const msg = getError(err);
        throw new Error(msg);
      }
    },

    createTask: async (_: null, { name, description, priority, dueDate, isActive, projectId }: { name: string, description: string, priority: number, dueDate: Date, isActive: boolean, projectId: string }, context: any) => {
      if (!context.body.token) throw new Error("Not authenticated");

      const ctx: any = await serverAuth.authMiddleware(context);
      if (ctx.statusCode !== 200) throw new Error("Authentication error");

      if (!name || !description || !dueDate || !projectId) {
        throw new Error("Invalid values");
      }

      try {
        const task = await prisma.task.create({
          data: {
            name,
            description,
            priority,
            dueDate,
            isActive,
            project: { 
              connect: { 
                id: String(projectId) 
              } 
            },
            user: {
              connect: {
                id: ctx.body.user._id,
              }
            }
          },
        });
                
        return task;
      } catch (err) {
        const msg = getError(err);
        throw new Error(msg);
      }
    },

    removeTask: async (_: null, { id }: { id: string }, context: any) => {
      if (!context.body.token) throw new Error("Not authenticated");

      const ctx: any = await serverAuth.authMiddleware(context);
      if (ctx.statusCode !== 200) throw new Error("Authentication error");     

      try {
        const task = await prisma.task.delete({
          where: { id: String(id) },
        });

        return task;
      } catch (err) {
        const msg = getError(err);
        throw new Error(msg);
      }
    },

    updateTask: async (_: null, { id, name, description, dueDate, isActive }: { id: string, name: string, description: string, dueDate: Date, isActive: boolean }, context: any) => {
      if (!context.body.token) throw new Error("Not authenticated");

      const ctx: any = await serverAuth.authMiddleware(context);
      if (ctx.statusCode !== 200) throw new Error("Authentication error");

      try {
        const task = await prisma.task.update({
          where: { id: String(id) },
          data: {
            name,
            description,
            dueDate,
            isActive,
          },
        });

        return task;
      } catch (err) {
        const msg = getError(err);
        throw new Error(msg);
      }
    },

  }
};

export default resolvers;