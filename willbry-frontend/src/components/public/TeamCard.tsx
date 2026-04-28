interface TeamCardProps {
  name: string
  role: string
  bio: string
  image?: string
}

export default function TeamCard({ name, role, bio, image }: TeamCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
      {image ? (
        <img src={image} alt={name} className="h-24 w-24 rounded-full object-cover mx-auto mb-4" />
      ) : (
        <div className="h-24 w-24 rounded-full bg-[#2d6a4f] flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4">
          {name[0]}
        </div>
      )}
      <h3 className="font-semibold text-gray-900 text-lg">{name}</h3>
      <p className="text-[#2d6a4f] text-sm font-medium mb-3">{role}</p>
      <p className="text-gray-600 text-sm leading-relaxed">{bio}</p>
    </div>
  )
}
