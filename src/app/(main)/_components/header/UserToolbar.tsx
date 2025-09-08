import { useUser } from "@/providers/userProvider";
import { HeaderAddressSelectButton } from ".././header/HeaderAddressSelectButton";
import { HeaderCartButton } from "..//header/HeaderCartButton";
import { HeaderUserProfileIcon } from "..//header/HeaderUserProfileIcon";

type UserToolbarProps = {
  openSidebar: () => void;
};

export const UserToolbar = ({ openSidebar }: UserToolbarProps) => {
  const { user } = useUser();

  

  return (
    <>
      <HeaderAddressSelectButton />
      <HeaderCartButton openSidebar={openSidebar} />
      <HeaderUserProfileIcon />
    </>
  );
};
