import { useParams } from 'react-router-dom';
import posts from '../data/posts';

function PostDetails() {
  const { id } = useParams();
  const post = posts.find((p) => p.id === id);

  if (!post) return <h2>Post not found</h2>;

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
    </div>
  );
}

export default PostDetails;
