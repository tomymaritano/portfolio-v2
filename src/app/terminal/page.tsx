import type { Metadata } from "next";
import { TerminalClient } from "./TerminalClient";

export const metadata: Metadata = {
  title: "Terminal",
  description: "Interactive terminal — explore the portfolio with commands",
};

export default function TerminalPage() {
  return <TerminalClient />;
}
