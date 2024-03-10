import getError from "@/utils/getErr";
import prisma from "@/lib/prisma";
import { serverAuth } from "@/utils/auth";

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
    Hello:  async (parent: any, args: any, context: any) => {
      // for testing purposes
      return "world";
    },

    users: async (parent: any, args: any, context: any) => {
      // for testing purposes
      return prisma.user.findMany({ include: { projects: true }});
    },
    
    user: async (parent: any, { id }: { id: string }, context: any) => {
      // if (!context.body.token) throw new Error("Not authenticated");
      // const ctx: any = await serverAuth.authMiddleware(context);
      // if (ctx.statusCode !== 200) return ctx;

      if (!{id}) throw new Error("No user found");

      try {
        return prisma.user.findUnique({
          where: { id: String(id) },
          include: { projects: true },
        });

      } catch (err) {
        const msg = getError(err);
        throw new Error(msg);
      }
    },

    projects: async (parent: any, args: any, context: any) => {
      // if (!context.body.token) throw new Error("Not authenticated");
      // const ctx: any = await serverAuth.authMiddleware(context);
      // if (ctx.statusCode !== 200) return ctx;

      try {
        return prisma.project.findMany({ include: { user: true, tasks: true }});

      } catch (err) {
        console.log(err);
        
        const msg = getError(err);
        throw new Error(msg);
      }
    },

    project: async (parent: any, { id }: { id: string }, context: any) => {
      // if (!context.body.token) throw new Error("Not authenticated");
      // const ctx: any = await serverAuth.authMiddleware(context);
      // if (ctx.statusCode !== 200) return ctx;

      try {
        return prisma.project.findUnique({
          where: { id: String(id) },
          include: { user: true, tasks: true },
        });

      } catch (err) {
        const msg = getError(err);
        throw new Error(msg);
      }
    }
    
  },

  Mutation: {
    // todo: need to remove any type from ctx inside protected routes
    // todo inside folded
    signup: async (_: null, { email, password, name }: { email: string, password: string, name: string }, __: null) => {
      try {
        const user = await prisma.user.create({
          data: {
            email,
            password, // todo: need to hash
            name,
          },
        });
        
        return user;
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
          const res = { error: true, message: "Invalid email or password", status: 401};
          return res;
        };

        const token = serverAuth.signToken({ _id: user.id, username: user.name});
        
        return {user, token};
      } catch (err) {
        const msg = getError(err);
        throw new Error(msg);
      }
    },

    createProject: async (_: null, { name, description, dueDate }: { name: string, description: string, dueDate: Date }, context: any) => {
      // console.log("attempt create Project");
      
      if (!context.body.token) throw new Error("Not authenticated");

      const ctx: any = await serverAuth.authMiddleware(context);
      if (ctx.statusCode !== 200) return ctx;
      
      try {
        if (!ctx.body.user._id || !name || !description || !dueDate) {
          return { error: true, message: "Missing fields", status: 406 };
        }
        console.log('attempt', ctx.body.user._id);
        const _id = ctx.body.user._id;

        const project = await prisma.project.create({
          data: {
            name,
            description,
            dueDate,
            userId: _id,
            user: {
              connect: {
                id: _id, 
              },
            },
          },
        });

        return project;
      } catch (err) {
        console.log(err);
        
        const msg = getError(err);
        throw new Error(msg);
      }
    },

    createTask: async (parent: any, { name, description, priority, dueDate, projectId }: { name: string, description: string, priority: number, dueDate: Date, projectId: string }, context: any) => {
      if (!context.user) throw new Error("Not authenticated");

      try {
        const task = await prisma.task.create({
          data: {
            name,
            description,
            priority,
            dueDate,
            project: { connect: { id: String(projectId) } },
          },
        });

        return task;
      } catch (err) {
        const msg = getError(err);
        throw new Error(msg);
      }
    },

    removeProject: async (parent: any, { id }: { id: string }, context: any) => {
      // if (!context.user) throw new Error("Not authenticated");

      try {
        const project = await prisma.project.delete({
          where: { id: String(id) },
        });

        return project;
      } catch (err) {
        const msg = getError(err);
        throw new Error(msg);
      }
    },

    removeTask: async (parent: any, { id }: { id: string }, context: any) => {
      if (!context.user) throw new Error("Not authenticated");

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

    removeUser: async (parent: any, { id }: { id: string }, context: any) => {
      if (!context) throw new Error("Context not found");
      
      const ctx: any = await serverAuth.authMiddleware(context);
      
      if (ctx.statusCode !== 200) return ctx;
      
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

    updateProject: async (parent: any, { id, name, description, dueDate, isActive }: { id: string, name: string, description: string, dueDate: Date, isActive: boolean }, context: any) => {
      if (!context.user) throw new Error("Not authenticated");

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


    updateTask: async (parent: any, { id, name, description, dueDate, isActive }: { id: string, name: string, description: string, dueDate: Date, isActive: boolean }, context: any) => {
      if (!context.user) throw new Error("Not authenticated");

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

    updateUser: async (parent: any, { name, email, password }: { name: string, email: string, password: string }, context: any) => {
      if (!context.user) throw new Error("Not authenticated");

      try {
        const user = await prisma.user.update({
          where: { id: String(context.user.id) },
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
    }
  }
};

export default resolvers;