export interface RegisterMutation {
  username: string;
  password: string;
}

export interface User {
  _id: string;
  username: string;
  token: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _message: string;
}

export interface RegisterResponse {
  message: string;
  user: User;
}

export interface LoginMutation {
  username: string;
  password: string;
}

export interface GlobalError {
  error: string;
}

export interface PostsMutation {
  title: string;
  description: string;
  image: string | null;
}

export interface PostHomeWindow {
  _id: string;
  author: {
    username: string;
  };
  title: string;
  image: string;
  createdAt: string;
}

export interface CommentsI {
  _id: string;
  user: {
    username: string;
  };
  post: string;
  text: string;
}

export interface CommentsMutation {
  post: string;
  text: string;
}

export interface PostWithID {
  _id: string;
  author: {
    username: string;
  };
  title: string;
  description: string;
  image: string;
  createdAt: string;
}
