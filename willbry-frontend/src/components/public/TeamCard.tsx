import { Mail, UserRound } from 'lucide-react'

interface TeamCardProps {
  name: string
  role: string
  bio?: string
  image?: string
  email?: string
}

export default function TeamCard({ name, role, bio, image, email }: TeamCardProps) {
  return (
    <article className="group rounded-3xl border border-willbry-green-100 bg-white p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-willbry-green-50 to-willbry-light">
        {image ? (
          <img
            src={image}
            alt={name}
            className="h-72 w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-72 items-center justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-willbry-green-500 text-white">
              <UserRound size={36} />
            </div>
          </div>
        )}
      </div>

      <div className="pt-5">
        <h3 className="text-lg font-black text-willbry-green-900">{name}</h3>
        <p className="mt-1 text-sm font-bold text-willbry-teal">{role}</p>

        {bio && <p className="mt-3 text-sm leading-6 text-gray-600">{bio}</p>}

        {email && (
          <a
            href={`mailto:${email}`}
            className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-willbry-green-600 hover:text-willbry-green-800"
          >
            <Mail size={15} />
            Contact
          </a>
        )}
      </div>
    </article>
  )
}