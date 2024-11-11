export default interface PostInterface {
  authorID: string;
  media: {
    content: any;
    kind: string;
  };
  publishedOn: Date;
}
