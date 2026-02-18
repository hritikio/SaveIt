import { PlusIcon } from "../Icons/PlusIcon";
import ShareIcon from "../Icons/ShareIcon";
import { Tweet } from "react-tweet";

interface CardProps {
  title: string;
  link: string;
  type: "twitter" | "youtube";
}

const Card = ({ title, link, type }: CardProps) => {
  // Extract Twitter ID from URL (e.g., https://x.com/handle/status/1234567890 -> 1234567890)
  const twitterId = link.split("/").pop() || "";
  console.log(twitterId);

  return (
    <div>
      <div className="bg-white rounded-md shadow-md outline-slate-100 p-4 border  border-pink-200 max-w-72  max-h-full"> 
        <div className="flex justify-between ">
          <div className="flex items-center text-md">
            <div className="text-gray-500  ">
              <ShareIcon />
            </div>
            {title}
          </div>

          <div className="flex items-center">
            <div className="pr-2 text-gray-500">
              <a href={link} target="_blank">
                <PlusIcon size="lg" />
              </a>
            </div>

            <div className=" text-gray-500">
              <PlusIcon size="lg" />
            </div>
          </div>
        </div>

        <div className="pt-4">
          {type === "youtube" && (
            <iframe
              className="w-full"
              src={link.replace("watch", "embed")}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          )}

          {type === "twitter" && <Tweet id={twitterId} />}
        </div>
      </div>
    </div>
  );
};

export default Card;
