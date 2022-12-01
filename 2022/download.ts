import { readerFromStreamReader } from "https://deno.land/std/streams/reader_from_stream_reader.ts";
import { copy } from "https://deno.land/std/streams/copy.ts";
import { config as loadEnv } from "https://deno.land/std/dotenv/mod.ts";

const configData = await loadEnv({
  export: true,
  allowEmptyValues: true,
});

const download = async () => {
  console.log(configData);
  const url = Deno.args[0];
  const res = await fetch(url, {
    headers: { Cookie: configData.SESSION_COOKIE },
  });
  const day = url.split("/")[url.split("/").length - 2];
  const rdr = res.body?.getReader();
  if (rdr) {
    const read = readerFromStreamReader(rdr);
    try {
      await Deno.stat(day);
    } catch {
      await Deno.mkdir(day);
    }
    const file = await Deno.open(day + "/input.txt", {
      create: true,
      write: true,
    });
    await copy(read, file);
    file.close();
  }
};

download();
