import { type SanityDocument } from '@sanity/client'
import { client } from '@/sanity/client'

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
  const profile = await client.fetch<SanityDocument>(HERO_QUERY, {}, { next: { revalidate: 30 } }).then((res) => res[0]);
  
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 py-20 overflow-hidden">
      
      {profile && (
        <div>
          <h1 className="text-4xl font-bold">
            {profile.firstName} {profile.lastName}
          </h1>
          <p className="text-xl mt-4">{profile.headline}</p>
          <p className="mt-6">{profile.shortBio}</p>
        </div>
      )}
    </section>
  )
}

export default HeroSection