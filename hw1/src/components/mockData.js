export default {
  users: [
    {
      id: "0", // max 24
      username: "admin", // max 15 word chars (A-Z, a-z, 0-9, _)
      nickname: "Halata",
      password: "12345678", // min 8
      sex: "male",
      isAdmin: true,
      avatarSrc: "",
      aboutme: "I am 41 and have 1 kid", // max 512
      status: "active", // active, suspended, deactivated
      timeCreated: "21:40 07.05.2020",
      timeLastMod: "22:23 07.05.2020",
    },
    {
      id: "1", // max 24
      username: "carlito", // max 15 word chars (A-Z, a-z, 0-9, _)
      nickname: "Karl",
      password: "12345678", // min 8
      sex: "",
      isAdmin: true,
      avatarSrc: "",
      aboutme: "I am 41 and have 1 kid", // max 512
      status: "suspended", // active, suspended, deactivated
      timeCreated: "5/10/2020, 12:52:09 AM",
      timeLastMod: "5/10/2020, 12:52:09 AM",
    },
    {
      id: "2", // max 24
      username: "nastya", // max 15 word chars (A-Z, a-z, 0-9, _)
      nickname: "Anastis",
      password: "12345678", // min 8
      sex: "female",
      isAdmin: true,
      avatarSrc: "",
      aboutme: "I am 40 and have 1 kid", // max 512
      status: "active", // active, suspended, deactivated
      timeCreated: "5/10/2020, 12:52:09 AM",
      timeLastMod: "5/10/2020, 12:52:09 AM",
    },
    {
      id: "3", // max 24
      username: "noadmin", // max 15 word chars (A-Z, a-z, 0-9, _)
      nickname: "non",
      password: "12345678", // min 8
      sex: "male",
      isAdmin: false,
      avatarSrc:
        "https://i2.offnews.bg/events/2020/05/08/728230/phprau0zd_800x*.jpg",
      aboutme: "", // max 512
      status: "active", // active, suspended, deactivated
      timeCreated: "21:40 07.05.2020",
      timeLastMod: "22:23 07.05.2020",
    },
  ],
  recipes: [
    {
      id: "0",
      creatorId: "0",
      title: "Meat balls", // max 80
      shortDescription: "Fancy minced meat fried in round shape", // max 256
      minutesNeeded: "20",
      ingredients: ["minced meat", "onion", "sunflower oil", "flour"],
      pictureSrc: "../../imgs/recipes/0.jpg", // required
      description:
        "Mix the minced meat with the cutted onion. Divide the mix into parts of 70-100 grams. Round the chunks into spherical shape and roll them in flour. Put in the frying oil for 50 seconds on each side", // max 2048
      tags: "meat minced_meat meat_balls fry",
      timeCreated: "21:40 07.05.2020",
      timeLastMod: "22:23 07.05.2020",
    },
  ],
};
