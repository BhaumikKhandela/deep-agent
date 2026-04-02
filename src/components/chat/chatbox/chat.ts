type Role = "user" | "ai";

interface ChatMessage {
  role: Role;
  userId: string;
  projectId: string;
  content: string;
  thinking?: string;
}

export function chatMessages(): ChatMessage[] {
  const userId = "6964dad99b60669a3e261f02";
  const projectId = "69690e589eaeb9de331dd528";

  return [
    {
      role: "user",
      userId,
      projectId,
      content: "hello",
    },
    {
      role: "ai",
      userId,
      projectId,
      content: "\n\nHello! How can I assist you today?",
      thinking:
        "\nOkay, let's see. The user wrote \"hello\". That's a greeting. I should respond politely and offer help.",
    },
    {
      role: "user",
      userId,
      projectId,
      content: "hello",
    },
    {
      role: "ai",
      userId,
      projectId,
      content: "\n\nHey again! What’s up?",
      thinking:
        "\nUser repeated greeting. Keep it casual this time and invite conversation.",
    },
  ];
}