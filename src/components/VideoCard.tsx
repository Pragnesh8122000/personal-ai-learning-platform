"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { VideoContent } from "../lib/content";

/**
 * Clickable video card with a YouTube-hosted thumbnail.
 * Clicking opens the video on YouTube in a new tab — this avoids
 * embed restrictions ("Video unavailable") that plague iframe embeds.
 */
export default function VideoCard({ video }: { video: VideoContent }) {
  const url = `https://www.youtube.com/watch?v=${video.youtubeId}`;
  const thumb = `https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg`;

  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      aria-label={`Play video: ${video.title}`}
      className="my-6 block rounded-xl overflow-hidden glass border border-[var(--border)] card-glow group"
    >
      <div className="relative aspect-video bg-[var(--surface-2)]">
        {/* YouTube-hosted thumbnail. `unoptimized` skips Next.js image
            optimization since the CDN already serves a sized image. */}
        <Image
          src={thumb}
          alt={video.title}
          width={480}
          height={360}
          className="w-full h-full object-cover"
          loading="lazy"
          unoptimized
        />
        {/* Play overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/50 group-focus-within:bg-black/50 transition-colors">
          <motion.div
            whileHover={{ scale: 1.15 }}
            aria-hidden="true"
            className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity"
          >
            <span className="text-white text-2xl ml-1">▶</span>
          </motion.div>
        </div>
        {video.duration && (
          <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/80 text-white text-xs font-mono">
            {video.duration}
          </span>
        )}
      </div>
      <div className="p-4 bg-[var(--surface)]">
        <h4 className="font-semibold mb-1 flex items-center gap-2">
          {video.title}
          <span className="text-xs text-[var(--text-muted)] opacity-0 group-hover:opacity-100 transition-opacity">
            ↗ YouTube
          </span>
        </h4>
        <p className="text-sm text-[var(--text-muted)] mb-2">{video.description}</p>
        <div className="flex items-center gap-3 text-xs text-[var(--text-muted)]">
          {video.creator && <span>👤 {video.creator}</span>}
          {video.duration && <span>⏱ {video.duration}</span>}
        </div>
      </div>
    </motion.a>
  );
}