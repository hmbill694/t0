import { Html } from "@elysiajs/html";
import MainLayout from "../layouts/main-layout";

export default function Index() {
  return (
    <MainLayout>
      <h1 class="text-3xl font-semibold mb-4">Welcome to T0</h1>
      <form action="/api/v1/generate-document" method="post">
        <div class="mb-4">
          <label for="chat" class="block text-gray-700 text-sm font-bold mb-2">
            Chat:
          </label>
          <textarea
            id="chat"
            name="chat"
            rows="5"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          ></textarea>
        </div>
        <div class="flex items-center justify-between">
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Generate
          </button>
        </div>
      </form>
    </MainLayout>
  );
}
