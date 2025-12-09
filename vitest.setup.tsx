import "@testing-library/jest-dom";
import { vi } from "vitest";

// Mock next/navigation
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
  }),
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
}));

// Mock next/image
vi.mock("next/image", () => ({
  default: ({ src, alt, ...props }: { src: string; alt: string }) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} {...props} />;
  },
}));

// Mock framer-motion
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: { children: React.ReactNode }) => (
      <div {...props}>{children}</div>
    ),
    span: ({ children, ...props }: { children: React.ReactNode }) => (
      <span {...props}>{children}</span>
    ),
    button: ({ children, ...props }: { children: React.ReactNode }) => (
      <button {...props}>{children}</button>
    ),
    a: ({ children, ...props }: { children: React.ReactNode }) => (
      <a {...props}>{children}</a>
    ),
    section: ({ children, ...props }: { children: React.ReactNode }) => (
      <section {...props}>{children}</section>
    ),
    p: ({ children, ...props }: { children: React.ReactNode }) => (
      <p {...props}>{children}</p>
    ),
    header: ({ children, ...props }: { children: React.ReactNode }) => (
      <header {...props}>{children}</header>
    ),
    footer: ({ children, ...props }: { children: React.ReactNode }) => (
      <footer {...props}>{children}</footer>
    ),
    li: ({ children, ...props }: { children: React.ReactNode }) => (
      <li {...props}>{children}</li>
    ),
    blockquote: ({ children, ...props }: { children: React.ReactNode }) => (
      <blockquote {...props}>{children}</blockquote>
    ),
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  useScroll: () => ({ scrollYProgress: { current: 0 } }),
  useTransform: () => 0,
}));

// Mock window.matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});
