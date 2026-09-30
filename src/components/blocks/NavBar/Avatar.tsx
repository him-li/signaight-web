import { Avatar, Button, Dropdown, Label } from "@heroui/react";
import { useAppSelector } from "@/store/store";
import { getUserinfo } from "@/store/authSlice/auth.slice";
import { Icons } from "@/components/atoms/Icons";
import { ROUTES } from "@/constants/routes";
import { modal } from "styles/styles";

export default function NavAvatar() {
  const userinfo = useAppSelector(getUserinfo);
  return (
    <Dropdown>
      <Button isIconOnly variant="tertiary" className="rounded-full">
        <Avatar color="accent" size="sm">
          <Avatar.Image src="" />
          <Avatar.Fallback>
            {userinfo?.email ?? <Icons.Person />}
          </Avatar.Fallback>
        </Avatar>
      </Button>
      <Dropdown.Popover className={modal.base}>
        <Dropdown.Menu className="">
          <Dropdown.Item
            key="settings"
            textValue="Account Settings"
            href={ROUTES.SETTING ?? "#"}
          >
            <Icons.Settings />
            <Label>Account Settings</Label>
          </Dropdown.Item>
          <Dropdown.Item
            key="profile"
            href={ROUTES.PROFILE}
            textValue="Profile"
          >
            <Icons.Person />
            <Label>Profile</Label>
          </Dropdown.Item>
          <Dropdown.Item key="help" textValue="Help">
            <Icons.Help />
            <Label>Help</Label>
          </Dropdown.Item>
          <Dropdown.Item key="contact" textValue="Contact">
            <Icons.Message />
            <Label>Contact us</Label>
          </Dropdown.Item>
          <Dropdown.Item key="logout" href={ROUTES.LOGOUT} textValue="Logout">
            <Icons.SignIn />
            <Label>Logout</Label>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );
}
