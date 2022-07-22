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
};

main().catch(console.error);
