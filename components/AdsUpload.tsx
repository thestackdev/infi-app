"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import useSWRMutation from "swr/mutation";

interface FileUploadResponse {
  id: string;
  name: string;
  size: number;
  url: string;
}

export default function AdsUpload() {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  async function uploadDocuments(
    url: string,
    { arg }: { arg: { files: FileList[] } }
  ): Promise<FileUploadResponse[]> {
    const body = new FormData();

    for (var i = 0; i < arg.files.length; i++) {
      var file = files[i];
      body.append("file", file, file.name);
    }

    const response = await fetch(url, { method: "POST", body });
    return await response.json();
  }

  const { trigger } = useSWRMutation("/api/ads-upload", uploadDocuments);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    await trigger({ files: files });
    setLoading(false);
    setOpen(false);
  }

  function handleSelect(event) {
    const selectedFiles = event.target.files;

    if (selectedFiles) {
      setFiles(selectedFiles);
    }
  }
  return (
    <Dialog open={open}>
      <DialogTrigger>
        <Button onClick={() => setOpen(true)}>Add</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <form onSubmit={handleSubmit}>
            <DialogTitle>Add image to ads</DialogTitle>
            <DialogDescription>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Input
                  type="file"
                  accept="image/* video/*"
                  required
                  id="coupon-code"
                  placeholder="Enter Coupon Code"
                  className="mt-6"
                  multiple
                  onChange={handleSelect}
                />
              </div>
            </DialogDescription>
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
              >
                Upload
              </Button>
            </div>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
