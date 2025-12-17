import Chat from "@/components/chat/Chat";
import { client } from "@/sanity/client";
import { type SanityDocument } from "@sanity/client";

import SidebarToggle from "../SidebarToggle";

const CHAT_PROFILE_QUERY = `*[_type == "profile"]{
     _id,
    _type,
    _createdAt,
    _updatedAt,
    _rev,
    firstName,
    lastName,
    headline,
    shortBio,
    email,
    phone,
    location,
    availability,
    socialLinks,
    yearsOfExperience,
    profileImage
  }`;

async function ChatWrapper() {
  const profile = await client
    .fetch<SanityDocument>(CHAT_PROFILE_QUERY, {}, { next: { revalidate: 30 } })
    .then((res) => res[0]);

  return (
    <div className="h-full w-full">
      <div className="md:hidden p-2 sticky top-0 z-10">
        <SidebarToggle />
      </div>

      <Chat profile={profile} />
    </div>
  );
}

export default ChatWrapper;
