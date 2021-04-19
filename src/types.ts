import { OperationTypeNode } from "graphql";

export interface Author {
  id: string;
  name: string;
}

export interface User {
  id: string;
}

export interface Vote {
  id: string;
  user: User;
}

export interface Link {
  id: string;
  description: string;
  url: string;
  votes: Array<Vote>;
  createdAt: Date;
  postedBy: Author;
}

export interface LinkProps {
  link: Link;
  index: number;
}

export interface FeedLink {
  id: string;
  votes: Array<Vote>;
}

export interface Feed {
  feed: {
    id: string;
    links: Array<Link>;
    count: number;
  };
}

export type Definition = {
  kind: string;
  operation?: OperationTypeNode;
};
