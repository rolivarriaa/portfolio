import { type SanityDocument } from "@sanity/client";
import { client } from "@/sanity/client";
import ProfileImage from "./ProfileImage";
import Link from "next/link";
import { LayoutTextFlip } from "../ui/layout-text-flip";
import { urlFor } from "@/sanity/image";
import {
  FaEnvelope,
  FaFilePdf,
  FaGithubAlt,
  FaLaptopCode,
  FaLinkedin,
  FaMapMarkerAlt,
} from "react-icons/fa";

const HERO_QUERY = `*[_type == "profile"]{
    firstName,
    lastName,
    headline,
    headlineStaticText,
    headlineAnimatedWords,
    headlineAnimationDuration,
    shortBio,
    email,
    phone,
    location,
    availability,
    socialLinks,
    yearsOfExperience,
    profileImage
  }`;

export async function HeroSection() {
  const profile = await client
    .fetch<SanityDocument>(HERO_QUERY, {}, { next: { revalidate: 30 } })
    .then((res) => res[0]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center  py-10 overflow-hidden"
    >
      {/* Background Ripple Effect */}
      {/* <BackgroundRippleEffect rows={8} cols={27} cellSize={56} /> */}

      <div className="relative z-10 container mx-auto max-w-6xl">
        <div className="@container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center ">
            {/* Text Content */}
            <div className="@container/hero space-y-4 @md/hero:space-y-6">
              <h1 className="text-4xl @md/hero:text-5xl @lg/hero:text-7xl font-bold tracking-tight">
                {profile.firstName}{" "}
                <span className="text-primary">{profile.lastName}</span>
              </h1>
              {profile.headlineStaticText &&
              profile.headlineAnimatedWords &&
              profile.headlineAnimatedWords.length > 0 ? (
                <LayoutTextFlip
                  text={profile.headlineStaticText}
                  words={profile.headlineAnimatedWords}
                  duration={profile.headlineAnimationDuration || 3000}
                  className="text-lg @md/hero:text-2xl @lg/hero:text-3xl text-muted-foreground font-medium"
                />
              ) : (
                <p className="text-xl @md/hero:text-2xl @lg/hero:text-3xl text-muted-foreground font-medium">
                  {profile.headline}
                </p>
              )}
              <p className="text-base @md/hero:text-lg text-muted-foreground leading-relaxed">
                {profile.shortBio}
              </p>

              {profile.socialLinks && (
                <div className="flex flex-wrap gap-3 @md/hero:gap-4 pt-4">
                  {profile.socialLinks.linkedin && (
                    <Link
                      href={profile.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex gap-2 items-center px-4 py-2 @md/hero:px-6 @md/hero:py-3 rounded-lg border hover:bg-accent transition-colors text-sm @md/hero:text-base"
                    >
                      <FaLinkedin className="text-[#0A66C2]" />
                      LinkedIn
                    </Link>
                  )}
                  {profile.socialLinks.github && (
                    <Link
                      href={profile.socialLinks.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex gap-2 items-center px-4 py-2 @md/hero:px-6 @md/hero:py-3 rounded-lg border hover:bg-accent transition-colors text-sm @md/hero:text-base"
                    >
                      <FaGithubAlt className="text-[#501DAF]" />
                      GitHub
                    </Link>
                  )}

                  {profile.socialLinks.website && (
                    <Link
                      href={profile.socialLinks.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex gap-2 items-center px-4 py-2 @md/hero:px-6 @md/hero:py-3 rounded-lg border hover:bg-accent transition-colors text-sm @md/hero:text-base"
                    >
                      <FaFilePdf className="text-red-700" />
                      Resume
                    </Link>
                  )}
                </div>
              )}

              <div className="flex flex-wrap gap-4 text-[14px] @md/hero:gap-6 pt-4 text-xs @md/hero:text-sm text-muted-foreground">
                {profile.email && (
                  <div className="flex items-center gap-2">
                    <span>
                      <FaEnvelope />
                    </span>
                    <span className="truncate">{profile.email}</span>
                  </div>
                )}
                {profile.location && (
                  <div className="flex items-center gap-2">
                    <span>
                      <FaMapMarkerAlt />
                    </span>
                    <span>{profile.location}</span>
                  </div>
                )}
                {profile.availability && (
                  <div className="flex items-center gap-2">
                    <span>
                      <FaLaptopCode />
                    </span>
                    <span>{profile.availability}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Profile Image */}
            {profile.profileImage && (
              <ProfileImage
                // imageUrl=""
                imageUrl={urlFor(profile.profileImage)
                  .width(600)
                  .height(600)
                  .url()}
                firstName={profile.firstName || ""}
                lastName={profile.lastName || ""}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
