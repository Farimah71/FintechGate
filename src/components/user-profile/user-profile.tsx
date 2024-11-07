import { Dropdown } from "antd";
import { items } from "../../data/user-profile-menu";
import avatar from "../../assets/images/avatars/300-23.jpg";

export const UserProfile = () => {
  return (
    <Dropdown menu={{ items }} trigger={["click"]}>
      <a onClick={(e) => e.preventDefault()}>
        <img src={avatar} alt="avatar" className="w-10 h-10 rounded-lg aspect-square shrink-0" />
      </a>
    </Dropdown>
  );
};
