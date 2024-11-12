export default interface CommentInterface {
  // Ever type of comment should have this field. Refers to the post to which they refer.
  postID: string;
  // For reply type of comment only. Refers to it's "parent" comment.
  parentID?: string;
  authorID: string;
  media: Media;
  publicationDate: Date;
}
