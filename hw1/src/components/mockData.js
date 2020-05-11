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
      timeCreated: "5/10/2020, 12:52:09 AM",
      timeLastMod: "5/10/2020, 12:52:09 AM",
    },
  ],
  recipes: [
    {
      id: "0",
      creatorId: "0",
      title: "Meat balls", // max 80
      shortDescription: "Fancy minced meat fried in round shape", // max 256
      minutesNeeded: "20",
      ingredients: {
        "minced meat": "1kg",
        onion: "250gr",
        "sunflower oil": "150ml",
        flour: "100gr",
      },
      pictureSrc:
        "https://sweetandsavorymeals.com/wp-content/uploads/2019/02/Homemade-Meatballs-2-680x1020.jpg", // required
      description:
        "Mix the minced meat with the cutted onion. Divide the mix into parts of 70-100 grams. Round the chunks into spherical shape and roll them in flour. Put in the frying oil for 50 seconds on each side", // max 2048
      tags: "meat minced_meat meat_balls fry",
      timeCreated: "5/10/2020, 12:52:09 AM",
      timeLastMod: "5/10/2020, 12:52:09 AM",
    },
    {
      id: "1",
      creatorId: "1",
      title: "Meat balls", // max 80
      shortDescription: "Fancy minced meat fried in round shape", // max 256
      minutesNeeded: "20",
      ingredients: {
        "minced meat": "1kg",
        onion: "250gr",
        "sunflower oil": "150ml",
        flour: "100gr",
      },
      pictureSrc:
        "https://sweetandsavorymeals.com/wp-content/uploads/2019/02/Homemade-Meatballs-2-680x1020.jpg", // required
      description:
        "Mix the minced meat with the cutted onion. Divide the mix into parts of 70-100 grams. Round the chunks into spherical shape and roll them in flour. Put in the frying oil for 50 seconds on each side", // max 2048
      tags: "meat minced_meat meat_balls fry",
      timeCreated: "5/10/2020, 12:52:09 AM",
      timeLastMod: "5/10/2020, 12:52:09 AM",
    },
    {
      id: "2",
      creatorId: "2",
      title: "Meat balls", // max 80
      shortDescription: "Fancy minced meat fried in round shape", // max 256
      minutesNeeded: "20",
      ingredients: {
        "minced meat": "1kg",
        onion: "250gr",
        "sunflower oil": "150ml",
        flour: "100gr",
      },
      pictureSrc:
        "https://sweetandsavorymeals.com/wp-content/uploads/2019/02/Homemade-Meatballs-2-680x1020.jpg", // required
      description:
        "Mix the minced meat with the cutted onion. Divide the mix into parts of 70-100 grams. Round the chunks into spherical shape and roll them in flour. Put in the frying oil for 50 seconds on each side", // max 2048
      tags: "meat minced_meat meat_balls fry",
      timeCreated: "5/10/2020, 12:52:09 AM",
      timeLastMod: "5/10/2020, 12:52:09 AM",
    },
    {
      id: "3",
      creatorId: "2",
      title: "Spaghetti", // max 80
      shortDescription: "spahetti", // max 256
      minutesNeeded: "20",
      ingredients: {
        "minced meat": "300gr",
        spaghetti: "1 pack",
        "olive oil": "40ml",
        cheese: "170gr",
      },
      pictureSrc:
        "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/homemade-spaghetti-sauce-horizontal-1530890913.jpg?crop=1xw:1xh;center,top&resize=980:*", // required
      description:
        "Put a large saucepan on a medium heat and add 1 tbsp olive oil. Add 4 finely chopped bacon rashers and fry for 10 mins until golden and crisp. Reduce the heat and add the 2 onions, 2 carrots, 2 celery sticks, 2 garlic cloves and the leaves from 2-3 sprigs rosemary, all finely chopped, then fry for 10 mins. Stir the veg often until it softens. Increase the heat to medium-high, add 500g beef mince and cook stirring for 3-4 mins until the meat is browned all over. Add 2 tins plum tomatoes, the finely chopped leaves from ¾ small pack basil, 1 tsp dried oregano, 2 bay leaves, 2 tbsp tomato purée, 1 beef stock cube, 1 deseeded and finely chopped red chilli (if using), 125ml red wine and 6 halved cherry tomatoes. Stir with a wooden spoon, breaking up the plum tomatoes. Bring to the boil, reduce to a gentle simmer and cover with a lid. Cook for 1 hr 15 mins stirring occasionally, until you have a rich, thick sauce. Add the 75g grated parmesan, check the seasoning and stir.", // max 2048
      tags: "spaghetti",
      timeCreated: "5/11/2020, 12:52:09 AM",
      timeLastMod: "5/11/2020, 12:52:09 AM",
    },
  ],
};
