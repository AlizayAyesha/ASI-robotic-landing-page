// import { getStory } from "./utils";
// import { ClientArticle, MatrixOverlay } from "./components";

// type Props = {
//   params: { slug: string };
//   searchParams: { [key: string]: string | string[] | undefined };
// };

// export default async function ArticlePage({ params }: Props) {
//   const story = await getStory(params.slug);

//   return (
//     <main className="min-h-screen relative bg-black py-16 px-4">
//       <MatrixOverlay />
//       <ClientArticle story={story} slug={params.slug} />
//     </main>
//   );
// }

// // Generate static params for all possible slugs
// export async function generateStaticParams() {
//   // You can fetch all possible slugs here
//   // For now, returning an empty array as placeholder
//   return [];
// }

import React from "react";

export default function page() {
  return <div>page</div>;
}
