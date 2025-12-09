import { ImageResponse } from "next/og";
import { allPosts } from "content-collections";

export const runtime = "edge";
export const alt = "Blog post cover";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: { slug: string } }) {
  const post = allPosts.find((p) => p.slug === params.slug);

  if (!post) {
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#09090b",
            color: "#fafafa",
            fontSize: 48,
          }}
        >
          Post not found
        </div>
      ),
      { ...size }
    );
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          backgroundColor: "#09090b",
          backgroundImage:
            "radial-gradient(circle at 25% 25%, #111113 0%, transparent 50%), radial-gradient(circle at 75% 75%, #111113 0%, transparent 50%)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          <div
            style={{
              display: "flex",
              gap: 12,
            }}
          >
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: 18,
                  color: "#10b981",
                  padding: "6px 16px",
                  backgroundColor: "rgba(16, 185, 129, 0.15)",
                  borderRadius: 9999,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
          <h1
            style={{
              fontSize: 64,
              fontWeight: 700,
              color: "#fafafa",
              lineHeight: 1.1,
              letterSpacing: -2,
              maxWidth: 900,
            }}
          >
            {post.title}
          </h1>
          <p
            style={{
              fontSize: 28,
              color: "#a1a1aa",
              maxWidth: 800,
              lineHeight: 1.4,
            }}
          >
            {post.description}
          </p>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
            }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 9999,
                backgroundColor: "#10b981",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#09090b",
                fontSize: 24,
                fontWeight: 600,
              }}
            >
              TM
            </div>
            <span
              style={{
                fontSize: 24,
                color: "#fafafa",
              }}
            >
              Tomas Maritano
            </span>
          </div>
          <span
            style={{
              fontSize: 20,
              color: "#71717a",
            }}
          >
            tomasmaritano.com
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
