import { useEffect, useState } from "react";
import { useUserStore } from "@/store/useUserStore";
import { useNavigate } from "react-router-dom";
import UserCard from "./UserCard";
import { Input } from "./ui/Input/input";

const UserList = () => {
  const { users, loading, error, fetchUsers, filteredUsers, setFilteredUsers } =
    useUserStore();
  const [searchQuery, setSearchQuery] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  useEffect(() => {
    const filteredItems = users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.username.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setFilteredUsers(filteredItems);
  }, [searchQuery, setFilteredUsers, users]);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>{error}</p>;

  const navigateToUser = (userId: number) => {
    navigate(`/user/${userId}`);
  };

  return (
    <div className="flex flex-col items-center justify-between">
      <div className="mb-6 w-[350px]">
        <Input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search..."
          className="text-black"
        />
      </div>
      <div className="flex flex-row items-center flex-wrap gap-1">
        {filteredUsers.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            onClick={navigateToUser}
          />
        ))}
      </div>
    </div>
  );
};

export default UserList;
