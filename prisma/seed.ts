import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// test data
const sampleMusicians = [
  {
    id: 1,
    name: "Alicia Cooper",
    enabled: true,
    avatar:
      "https://c8.alamy.com/compes/2r7a8r0/solvesborg-suecia-07-junio-de-2023-la-banda-ucraniana-de-heavy-metal-jinjer-realiza-un-concierto-en-vivo-durante-el-festival-de-musica-sueca-sweden-rock-festival-2023-en-solvesborg-aqui-la-vocalista-tatiana-shmailyuk-se-ve-en-vivo-en-el-escenario-credito-de-la-foto-gonzales-foto-terje-dokken-2r7a8r0.jpg",
    schedule: [
      "2024-01-01T12:15:00.000Z",
      "2024-01-01T19:15:00.000Z",
      "2024-01-01T20:15:00.000Z",
    ],
    services: ["Guitar", "Bass"],
  },
  {
    id: 1,
    name: "Marino Manson",
    enabled: true,
    avatar:
      "https://media.npr.org/assets/img/2015/02/09/marilyn-manson-credit-jiro-schneider_wide-74ef1df6aebb202ff9d45949cf10a7c07b812d13-s1400-c100.jpg",
    schedule: [
      "2024-01-01T13:15:00.000Z",
      "2024-01-01T14:20:00.000Z",
      "2024-01-01T22:15:00.000Z",
    ],
    services: ["Vocals", "Drums"],
  },
  {
    id: 1,
    name: "Johnny Dept",
    enabled: true,
    avatar:
      "https://media.vanityfair.com/photos/56c2a0c89895ef054035d775/master/pass/johnny-depp-hollywood-vampires-grammys.jpg",
    schedule: [
      "2024-01-01T15:15:00.000Z",
      "2024-01-01T19:15:00.000Z",
      "2024-01-01T23:15:00.000Z",
    ],
    services: ["Sax", "Guitar"],
  },
  {
    id: 1,
    name: "Bruno Marz",
    enabled: true,
    avatar:
      "https://los40.com/resizer/lxkeOmnI7JBxmVtm1yGVY9I5mfc=/1200x900/filters:format(jpg):quality(70)/cloudfront-eu-central-1.images.arcpublishing.com/prisaradiolos40/VA6MYF5ZAJMMFAHOIEDEA5TZHI.jpg",
    schedule: [
      "2024-01-01T12:15:00.000Z",
      "2024-01-01T19:15:00.000Z",
      "2024-01-01T20:15:00.000Z",
    ],
    services: ["Vocals", "Bass"],
  },
  {
    id: 1,
    name: "Copernico Sanchez",
    enabled: false,
    avatar: "https://i.blogs.es/50a1c5/t4yxpvu/1366_2000.jpeg",
    schedule: [
      "2024-01-01T12:15:00.000Z",
      "2024-01-01T19:15:00.000Z",
      "2024-01-01T20:15:00.000Z",
    ],
    services: ["Guitar", "Bass"],
  },
];

// extract unique service names
const serviceSet = new Set(
  sampleMusicians.reduce((acc, row) => {
    acc = [...acc, ...row.services];
    return acc;
  }, [] as string[])
);

const services: Prisma.ServiceCreateInput[] = Array.from(serviceSet).map(
  (service) => {
    return {
      name: service,
    };
  }
);

async function main() {
  // add initial data here

  // add services
  const serviceMap = new Map<String, number>();
  for (const service of services) {
    const newService = await prisma.service.create({
      data: service,
    });

    serviceMap.set(newService.name, newService.id);
  }

  // add musicians
  for (const musician of sampleMusicians) {
    const serviceIds = musician.services
      .map((service) => serviceMap.get(service) || 0)
      .map((service) => {
        return {
          id: service,
        };
      });

    await prisma.musician.create({
      data: {
        name: musician.name,
        enabled: musician.enabled,
        avatar: musician.avatar,
        schedule: "", // skip this, as we create this value dynamically on requested
        services: {
          connect: serviceIds,
        },
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
