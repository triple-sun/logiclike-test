export interface Idea {
  id: string;
  title: string;
  text: string;
  canVote: boolean;
  votes: {
    voter: {
      ip: string;
    };
  }[];
}
