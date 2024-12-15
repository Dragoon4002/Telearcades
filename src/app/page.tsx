import Image from "next/image";
import Link from "next/link";
import { ConnectButton } from "thirdweb/react";
import { client } from "./client";

export default function Home() {
  return (
    <div className="white p-8">
    <div className="text-6xl md:text-8xl font-bold dark:text-white text-center">
          Arcades on MANTLE
        </div>
        <div className="font-extralight text-base md:text-4xl dark:text-neutral-200 py-4">
          Enter the <b>Arena</b> of arcade and board games on MANTLE!!
        </div>
        <div className="flex flex-row gap-2">
        <Link className="bg-black dark:bg-white rounded-xl w-fit text-white dark:text-black px-8 py-3" href="./arena">
          Enter Arena
        </Link>
          <ConnectButton
          client={client}
          theme={"dark"}
          ></ConnectButton>
        </div>
    </div>
  );
}
