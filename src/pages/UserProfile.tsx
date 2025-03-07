import PostList from "@/components/PostList";
import { useNavigate, useParams } from "react-router-dom";

const UserProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  if (!id) {
    navigate("/");
    return null;
  } else {
    const userId = parseInt(id);
    if (isNaN(userId)) {
      navigate("/");
      return null;
    } else {
      return (
        <div>
          <PostList userId={userId} />
        </div>
      );
    }
  }
};

export default UserProfile;
