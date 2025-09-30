export interface Idea {
  id: string;
  title: string;
  text: string;
  votes: {
    voter: {
      ip: string;
    };
  }[];
}
