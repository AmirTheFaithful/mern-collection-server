export default interface CommentInterface {
  authorID: string;
  media: {
    content: any; // Allows paragraphs, image / video / gif URLs.
    kind: MediaType;
  };
  publicationDate: Date;
}
