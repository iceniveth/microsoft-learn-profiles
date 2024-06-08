type RawAchievement = {
  category: "learningpaths" | "modules";
  grantedOn: string; // is a date string
  title: string;
  url: string;
  imageUrl: string;
};

type Achievement = Omit<RawAchievement, "grantedOn"> & {
  grantedOn: Date;
};

export default async function getAchievements(userId: string) {
  const response = await fetch(
    `https://learn.microsoft.com/api/achievements/user/${userId}`
  );

  const json = (await response.json()) as {
    achievements: RawAchievement[];
  };

  const achievements: Achievement[] = json.achievements.map((achievement) => ({
    ...achievement,
    grantedOn: new Date(achievement.grantedOn),
    imageUrl: "https://learn.microsoft.com/" + achievement.imageUrl,
  }));

  return {
    modules: achievements.filter(
      (achievement) => achievement.category === "modules"
    ),
    learningPaths: achievements.filter(
      (achievement) => achievement.category === "learningpaths"
    ),
  };
}
