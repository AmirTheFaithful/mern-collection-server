/** Describes the essence of the contents of a post or a comment.
 *
 * @example:
 * // In fact it just contains the URL to image.
 * const commentMediaType: MediaType = "image";
 *
 * const Comment: IComment = {
 *    // Properties...
 *
 *    mediaType: commentMediaType,
 * };
 */
type MediaType = "paragraph" | "paragraphs" | "image" | "video" | "gif";

interface Media {
  content: any; // Allows paragraphs, image / video / gif URLs.
  kind: MediaType;
}
