export type PostItem = {
  id: number;
  title: string;
  body: string;
};

export async function fetchPostBatch(postIds: number[]): Promise<PostItem[]> {
  const responses = await Promise.all(
    postIds.map((id) =>
      fetch(`https://jsonplaceholder.typicode.com/posts/${id}`),
    ),
  );

  const posts: PostItem[] = await Promise.all(
    responses.map((response) => response.json() as Promise<PostItem>),
  );

  return posts;
}
