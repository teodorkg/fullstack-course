import React from "react";
import Avatar from "@material-ui/core/Avatar";

export default function UserAvatar({ avatarSrc, sex, nickname, invert }) {
  return (
    <>
      {avatarSrc && (
        <Avatar title={nickname} alt="user avatar" src={avatarSrc} />
      )}
      {!avatarSrc && sex === "male" && (
        <Avatar
          className={invert ? "invertAvatar" : ""}
          title={nickname}
          alt="user avatar"
          src="https://www.shareicon.net/data/128x128/2015/12/03/681501_image_512x512.png"
        />
      )}
      {!avatarSrc && sex === "female" && (
        <Avatar
          className={invert ? "invertAvatar" : ""}
          title={nickname}
          alt="user avatar"
          src="https://www.shareicon.net/data/128x128/2015/12/03/681480_image_512x512.png"
        />
      )}
      {!avatarSrc && sex === "" && (
        <Avatar
          className={invert ? "invertAvatar" : ""}
          title={nickname}
          alt="user avatar"
          src="https://www.shareicon.net/data/128x128/2015/12/09/684979_man_512x512.png"
        />
      )}
    </>
  );
}
