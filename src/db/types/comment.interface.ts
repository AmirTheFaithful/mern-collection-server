export default interface CommentInterface {
  authorID: string;
  content: any; // Allows paragraphs, image / video / gif URLs.
  publicationDate: Date;
}
