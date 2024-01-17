"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import axios from "axios";
import { useState } from "react";

interface AdsImageProps {
  image: {
    id: string;
    src: string;
  };
  mutate?: any;
}

export default function AdsImage({
  image: { id, src },
  mutate,
}: AdsImageProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleDelete({ id }: { id: string }) {
    try {
      setLoading(true);
      await axios.delete(`/api/ads-upload?id=${id}`);
      setOpen(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      mutate();
    }
  }

  return (
    <Card className="h-48 w-48 group relative">
      {src.includes("mp4") ? (
        <video
          className="object-contain"
          src={src}
          loop
          muted
          controls
          width={200}
          height={200}
        />
      ) : (
        <Image
          className="object-contain"
          src={src}
          alt="ads image"
          width={200}
          height={200}
        />
      )}
      <Dialog open={open} onOpenChange={(isOpen) => setOpen(isOpen)}>
        <DialogTrigger>
          <Button
            className="absolute bottom-0 left-0 w-full opacity-0 group-hover:opacity-100"
            variant="destructive"
            onClick={() => setOpen(true)}
          >
            Delete
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Are you sure you want to delete this asset?
            </DialogTitle>
            <DialogDescription>
              <div className="flex flex-row gap-4 items-center">
                <DialogTrigger>
                  <Button
                    onClick={() => setOpen(false)}
                    variant="destructive"
                    type="button"
                    className="mt-4"
                  >
                    Cancel
                  </Button>
                </DialogTrigger>
                <Button
                  variant="default"
                  loading={loading}
                  type="submit"
                  className="mt-4"
                  onClick={() => handleDelete({ id: id })}
                >
                  Delete
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
