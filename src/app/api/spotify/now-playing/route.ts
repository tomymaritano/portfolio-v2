import { NextResponse } from "next/server";
import { getNowPlaying } from "@/lib/spotify";

export const revalidate = 0;

export async function GET() {
  try {
    const response = await getNowPlaying();

    if (response.status === 204 || response.status > 400) {
      return NextResponse.json({ isPlaying: false });
    }

    const song = await response.json();

    if (!song.item) {
      return NextResponse.json({ isPlaying: false });
    }

    const isPlaying = song.is_playing;
    const title = song.item.name;
    const artist = song.item.artists
      .map((artist: { name: string }) => artist.name)
      .join(", ");
    const albumImageUrl = song.item.album.images[0]?.url;
    const songUrl = song.item.external_urls.spotify;

    return NextResponse.json({
      isPlaying,
      title,
      artist,
      albumImageUrl,
      songUrl,
    });
  } catch {
    return NextResponse.json({ isPlaying: false });
  }
}
