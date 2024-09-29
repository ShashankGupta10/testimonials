'use client';

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

type Props = {
  embedFormModalOpen: boolean;
  setEmbedFormModalOpen: (open: boolean) => void;
  spaceId: string;
};

const EmbedFormModal = ({
  embedFormModalOpen,
  setEmbedFormModalOpen,
  spaceId,
}: Props) => {
  if (!embedFormModalOpen) {
    return null;
  }

  return (
    <Dialog open={embedFormModalOpen} onOpenChange={setEmbedFormModalOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Embed Testimonials on Your Website</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="text-sm text-gray-600">
            Follow these steps to embed the testimonial component on your
            website:
          </div>

          <ol className="list-decimal list-inside space-y-4 text-sm text-gray-700">
            <li>Copy the embed code below.</li>
            <div className="relative bg-gray-100 rounded-md p-4 text-sm">
              <pre className="overflow-auto font-mono whitespace-pre-wrap">
                {`<script src='https://example.com/embed-widget.js' data-space-id="${spaceId}"></script>`}
              </pre>
            </div>
            <li>Paste it into the head section of your website's HTML code.</li>
            <li>Ensure that your website supports external scripts.</li>
            <li>
              Place the following code snippet where you want the testimonials
              to appear on your website.
            </li>
            <div className="relative bg-gray-100 rounded-md p-4 text-sm">
              <pre className="overflow-auto font-mono whitespace-pre-wrap">
                {`<div id="testimonials-${spaceId}"></div>`}
              </pre>
            </div>
          </ol>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EmbedFormModal;
