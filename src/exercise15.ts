import { promises as fs } from "fs";

export type CommentSummary = {
  postId: number;
  id: number;
  commenterEmail: string;
};

export async function processCommentsPipeline(
  targetPostId: number,
  outputPath: string,
): Promise<number> {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${targetPostId}/comments`,
  );

  const comments = (await response.json()) as Array<{
    postId: number;
    id: number;
    email: string;
  }>;

  const summaries: CommentSummary[] = comments
    .map((comment) => ({
      postId: comment.postId,
      id: comment.id,
      commenterEmail: comment.email.trim(),
    }))
    .filter(
      (comment) => !comment.commenterEmail.endsWith(".org"),
    );

  const serialized = JSON.stringify(summaries, null, 2);

  await fs.writeFile(outputPath, serialized, "utf-8");

  return summaries.length;
}
