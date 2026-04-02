import path from "path";
import fs from "fs";
import { z } from "zod";
import { tool } from "@langchain/core/tools";
import { v4 as uuidv4 } from "uuid";
const ROOT = process.cwd();
const CHAT_HISTORY_DIR = path.join(ROOT, "public", "threads");

if (!fs.existsSync(CHAT_HISTORY_DIR)) {
  fs.mkdirSync(CHAT_HISTORY_DIR, { recursive: true });
}

const HISTORY_FILE = path.join(CHAT_HISTORY_DIR, "threads.json");

export const threadSchema = z.object({
  userId: z.string(),
  threadId: z.string(),
  title: z.string(),
  createdAt: z.string(),
  active: z.boolean(),
});

export const createThreadHistoryTool = tool(
  async ({ userId, title }) => {
    try {
      let threads: any[] = [];

      // Load existing threads
      if (fs.existsSync(HISTORY_FILE)) {
        const data = fs.readFileSync(HISTORY_FILE, "utf-8");
        threads = JSON.parse(data);
      }

      threads = threads.map((t: any) => {
        if (t.userId === userId && t.active === true) {
          return { ...t, active: false };
        }
        return t;
      });

      const newThread = {
        userId,
        threadId: uuidv4(),
        title: title || "New Thread",
        active: true,
        createdAt: new Date().toISOString(),
      };

      threads.push(newThread);

      fs.writeFileSync(HISTORY_FILE, JSON.stringify(threads, null, 2), "utf-8");
        return JSON.stringify(newThread);
    } catch (error) {
      console.error("Error creating thread:", error);
      return "Failed to create thread";
    }
  },
  {
    name: "create_thread",
    description:
      "Create a new thread. If an active thread exists, deactivate it and create a new one.",
    schema: z.object({
      userId: z.string(),
      title: z.string().optional(),
    }),
  },
);

export const readThreadTool = tool(
  async ({ userId, threadId }) => {
    try {
      if (!fs.existsSync(HISTORY_FILE)) {
        return "[]";
      }

      const data = fs.readFileSync(HISTORY_FILE, "utf-8");
      const threads = JSON.parse(data);

      let threadFound = false;

      const updatedThreads = threads.map((t: any) => {
        if (t.userId === userId) {
          if (t.threadId === threadId) {
            threadFound = true;
            return { ...t, active: true };
          }
          return { ...t, active: false };
        }
        return t;
      });

      if (!threadFound) {
        return "Thread not found";
      }

      fs.writeFileSync(
        HISTORY_FILE,
        JSON.stringify(updatedThreads, null, 2),
        "utf-8",
      );

      const userThreads = updatedThreads.filter(
        (t: any) => t.userId === userId,
      );

      return JSON.stringify(userThreads);
    } catch (error) {
      console.error("Error reading thread:", error);
      return "[]";
    }
  },
  {
    name: "read_thread",
    description:
      "Retrieve all threads for a user and activate a specific thread.",
    schema: z.object({
      userId: z.string(),
      threadId: z.string(),
    }),
  },
);

export const updateThreadTitleTool = tool(
  async ({ userId, threadId, title }) => {
    try {
      if (!fs.existsSync(HISTORY_FILE)) {
        return "Thread not found";
      }

      const data = fs.readFileSync(HISTORY_FILE, "utf-8");
      const threads = JSON.parse(data);

      const threadIndex = threads.findIndex(
        (t: any) => t.userId === userId && t.threadId === threadId,
      );

      if (threadIndex === -1) {
        return "Thread not found";
      }

      threads[threadIndex].title = title;

      fs.writeFileSync(HISTORY_FILE, JSON.stringify(threads, null, 2), "utf-8");

      return "Thread title updated successfully";
    } catch (error) {
      console.error("Error updating thread title:", error);
      return "Failed to update thread title.";
    }
  },
  {
    name: "update_thread_title",
    description:
      "Update the title of a specific thread using userId and threadId.",
    schema: z.object({
      userId: z.string(),
      threadId: z.string(),
      title: z.string(),
    }),
  },
);

export const getAllThreadsByUserTool = tool(
  async ({ userId }) => {
    try {
      if (!fs.existsSync(HISTORY_FILE)) {
        return "[]";
      }

      const data = fs.readFileSync(HISTORY_FILE, "utf-8");
      const threads = JSON.parse(data);

      const userThreads = threads.filter((t: any) => t.userId === userId);

      return JSON.stringify(userThreads);
    } catch (error) {
      console.error("Error fetching all threads for user:", error);
      return "[]";
    }
  },
  {
    name: "get_all_threads_by_user",
    description:
      "Return all threads belonging to a specific user without modifying their active status.",
    schema: z.object({
      userId: z.string(),
    }),
  },
);
