"use client";

import AdsUpload from "@/components/AdsUpload";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import useSWR from "swr";

export default function Page() {
  const fetcher = (path: string) => fetch(path).then((res) => res.json());

  const { data } = useSWR<{ Key?: string }[]>("/api/ads-upload", fetcher);

  const S3Image = ({ Key }: { Key: string }) => {
    const { data } = useSWR<{ src: string }>(`/api/ads-upload/${Key}`, fetcher);
    return (
      <Card className="h-48 w-48">
        <Image
          className="object-contain"
          src={data?.src}
          alt="ads image"
          width={200}
          height={200}
        />
      </Card>
    );
  };

  return (
    <main className="max-w-screen-xl mx-auto p-4 mt-8">
      <div className="flex flex-row w-full items-center justify-between">
        <h1 className="text-2xl font-bold mb-4">Ads Images</h1>
        <AdsUpload />
      </div>
      <div className="flex flex-row flex-wrap gap-4">
        {data?.map((image) => (
          <S3Image Key={image.Key} />
        ))}
      </div>
    </main>
  );
}
