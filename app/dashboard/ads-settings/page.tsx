"use client";

import AdsUpload from "@/components/AdsUpload";
import useSWR from "swr";
import AdsImage from "@/components/AdsImage";

export default function Page() {
  const fetcher = (path: string) => fetch(path).then((res) => res.json());

  const { data, mutate } = useSWR<{ Key?: string }[]>(
    "/api/ads-upload",
    fetcher
  );

  return (
    <main className="max-w-screen-xl mx-auto p-4 mt-8">
      <div className="flex flex-row w-full items-center justify-between">
        <h1 className="text-2xl font-bold mb-4">Ads Images</h1>
        <AdsUpload />
      </div>
      <div className="flex flex-row flex-wrap gap-4">
        {data?.map((image) => (
          <AdsImage
            key={image.Key}
            image={{
              id: image.id,
              src: image.src,
            }}
            mutate={mutate}
          />
        ))}
      </div>
    </main>
  );
}
