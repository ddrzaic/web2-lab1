import type { Comment } from "./Types";

export const addComment = async (comment: Comment, roundId: number) => {
  const res = await fetch(`/api/comments/${roundId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ comment }),
  });
  const data = await res.json();
  return data;
};

export const deleteComment = async (comment: Comment, roundId: number) => {
  const res = await fetch(`/api/comments/${roundId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ comment }),
  });
  const data = await res.json();
  return data;
};

export const updateComment = async (comment: Comment, roundId: number) => {
  const res = await fetch(`/api/comments/${roundId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ comment }),
  });
  const data = await res.json();
  return data;
};

export const getNewId = (comments: Comment[]) => {
  if (comments?.length === 0 || !comments) {
    return 1;
  }
  const ids = comments.map((c) => c.id);
  const maxId = Math.max(...ids);
  return maxId + 1;
};

export const sortComments = (comments: Comment[]) => {
  return comments.sort((a, b) => {
    if (a.date > b.date) {
      return -1;
    }
    if (a.date < b.date) {
      return 1;
    }
    if (a.date === b.date) {
      if (a.time > b.time) {
        return -1;
      }
      if (a.time < b.time) {
        return 1;
      }
      if (a.time === b.time) {
        return 0;
      }
    }
    return 0;
  });
};
