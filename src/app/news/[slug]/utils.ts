import { Bitcoin, Snowflake, Webhook } from "lucide-react";
import { StoryContent } from "@/types/news";

export const SPEAKER_CONFIG = {
  W: {
    name: "Vinesh",
    icon: Webhook,
    color: "#ff003c",
  },
  D: {
    name: "Deep",
    icon: Bitcoin,
    color: "#00d419",
  },
  V: {
    name: "Vaidehi",
    icon: Snowflake,
    color: "#3e2adb",
  },
} as const;

export function groupContentBySpeaker(
  content: StoryContent[]
): StoryContent[][] {
  return content.reduce((groups: StoryContent[][], current) => {
    const lastGroup = groups[groups.length - 1];

    if (lastGroup && lastGroup[0].speaker === current.speaker) {
      lastGroup.push(current);
    } else {
      groups.push([current]);
    }

    return groups;
  }, []);
}

export async function getStory(slug: string) {
  const response = await fetch(
    `https://raw.githubusercontent.com/axiom-svgu/blogs/refs/heads/main/${slug}.json`,
    { next: { revalidate: 3600 } } // Cache for 1 hour
  );

  if (!response.ok) {
    throw new Error("Failed to fetch story");
  }

  return response.json();
}
