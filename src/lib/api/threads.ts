import { Thread } from "@/store/threadSlice";
import { makeHttpReq } from "../helper/makeHttpReq";

export async function getThreads(userId: string): Promise<Thread[]> {
  const data = (await makeHttpReq(
    "GET",
    `threads?userId=${userId}`,
  )) as Thread[];
  return data;
}

export async function createThread(userId: string): Promise<Thread> {
  const data = (await makeHttpReq("POST", "threads", {
    userId,
  })) as Thread;
  return data;
}
