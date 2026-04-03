import { makeHttpReq } from "../helper/makeHttpReq";

export async function getThreads( userId: string): Promise<unknown> {
    const data = await makeHttpReq("GET", `threads?userId=${userId}`);
    return data;
}