import CompanyIcon from "@/assets/CompanyIcon";
import EmailIcon from "@/assets/EmailIcon";
import LocationIcon from "@/assets/LocationIcon";
import PhoneIcon from "@/assets/PhoneIcon";
import WebsiteIcon from "@/assets/WebsiteIcon";
import { cn } from "@/lib/utils";
import Button from "./ui/Button/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./ui/Card/card";
import { FC } from "react";
import { User } from "@/store/useUserStore";

interface UserCardProps {
  user: User;
  onClick: (userId: number) => void;
}

const UserCard: FC<UserCardProps> = ({ user, onClick }) => {
  return (
    <Card className={cn("w-[300px]", "h-[355px]")}>
      <CardHeader>
        <CardTitle>{user.name}</CardTitle>
        <CardDescription>{user.username}</CardDescription>
      </CardHeader>
      <CardContent className="text-start">
        <p>
          <EmailIcon
            width={15}
            height={15}
            color="black"
          />
          {user.email}
        </p>
        <p>
          <PhoneIcon
            width={15}
            height={15}
            color="black"
          />
          {user.phone}
        </p>
        <p>
          <WebsiteIcon
            width={15}
            height={15}
            color="black"
          />
          {user.website}
        </p>
        <p>
          <CompanyIcon
            width={15}
            height={15}
            color="black"
          />
          {user.company.name}
        </p>
        <p>
          <LocationIcon
            width={15}
            height={15}
            color="black"
          />
          {user.address.city}
        </p>
      </CardContent>
      <CardFooter className="flex flex-row items-center justify-around text-sm px-3">
        <Button
          className="w-full"
          {...{ onClick: () => onClick(user.id) }}
        >
          View
        </Button>
      </CardFooter>
    </Card>
  );
};

export default UserCard;
