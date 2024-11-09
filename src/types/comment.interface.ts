export default interface CommentInterface {
  parentID?: string;
  authorID: string;
  media: {
    content: any; // Allows paragraphs, image / video / gif URLs.
    kind: MediaType;
  };
  publicationDate: Date;
}
