import { Html } from "@elysiajs/html";
import NavBar from "../ui/nav/nav";
import type { Children } from "@kitajs/html";
import DocumentHead from "../ui/document-head/document-head";

export type MainLayoutProps = {
    children: Children
    title?: string
}

export default function MainLayout(props: MainLayoutProps) {
  return (
    <html lang="en">
      <DocumentHead />
      <body class="bg-gray-100 min-h-screen flex flex-col">
        <NavBar />

        <main class="flex-grow py-8 px-6">
          <div class="container mx-auto">
            {props.children}
          </div>
        </main>

        <footer class="bg-gray-800 text-white py-4 px-6">
          <div class="container mx-auto text-center">
            <p>&copy; 2024 T0. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
