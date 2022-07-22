import { PrismaClient } from "@prisma/client";

const main = async () => {
  const prisma = new PrismaClient();

  console.info("Demo Run");

  const newGroupWithoutCapacity = await prisma.group.create({
    data: {
      name: "Group without capacity",
      slots: {
        create: [
          { from: new Date("2022-07-22T00:00:00.000Z") },
          { from: new Date("2022-07-23T00:00:00.000Z") },
          { from: new Date("2022-07-24T00:00:00.000Z") },
        ],
      },
    },
    include: {
      slots: true,
    },
  });

  console.log(JSON.stringify({ newGroupWithoutCapacity }, null, 2));

  /*
    Creation order matches the input order

    {
      "newGroupWithoutCapacity": {
        "id": 9,
        "name": "Group without capacity",
        "slots": [
          {
            "id": 25,
            "from": "2022-07-22T00:00:00.000Z",
            "groupId": 9,
            "capacityId": null
          },
          {
            "id": 26,
            "from": "2022-07-23T00:00:00.000Z",
            "groupId": 9,
            "capacityId": null
          },
          {
            "id": 27,
            "from": "2022-07-24T00:00:00.000Z",
            "groupId": 9,
            "capacityId": null
          }
        ]
      }
    }
  */

  const newGroupWithCapacity = await prisma.group.create({
    data: {
      name: "Group with capacity",
      slots: {
        create: [
          {
            from: new Date("2022-07-22T00:00:00.000Z"),
            capacity: { create: { count: 10 } },
          },
          {
            from: new Date("2022-07-23T00:00:00.000Z"),
            capacity: { create: { count: 10 } },
          },
          {
            from: new Date("2022-07-24T00:00:00.000Z"),
            capacity: { create: { count: 10 } },
          },
        ],
      },
    },
    include: {
      slots: true,
    },
  });

  console.log(JSON.stringify({ newGroupWithCapacity }, null, 2));

  /*
    Creation order is reversed input order

    {
      "newGroupWithCapacity": {
        "id": 10,
        "name": "Group with capacity",
        "slots": [
          {
            "id": 28,
            "from": "2022-07-24T00:00:00.000Z",
            "groupId": 10,
            "capacityId": 13
          },
          {
            "id": 29,
            "from": "2022-07-23T00:00:00.000Z",
            "groupId": 10,
            "capacityId": 14
          },
          {
            "id": 30,
            "from": "2022-07-22T00:00:00.000Z",
            "groupId": 10,
            "capacityId": 15
          }
        ]
      }
    }
  */
};

main().catch(console.error);
