import Image from "next/image"
import { Button } from "@/components/ui/button"
import { FileText, Users, Globe, Mail } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="container py-10">
      <div className="flex flex-col gap-12">
        {/* Hero Section */}
        <section className="text-center">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl mb-4">About LyricsFinder</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We're dedicated to providing accurate lyrics to music lovers around the world
          </p>
        </section>

        {/* Our Story */}
        <section className="grid gap-6 md:grid-cols-2 md:gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-4">Our Story</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Founded in 2023, LyricsFinder began with a simple idea: to create a platform where music lovers could
                easily find accurate lyrics to their favorite songs.
              </p>
              <p>
                What started as a small project by a group of music enthusiasts has grown into a comprehensive database
                of lyrics from artists around the world.
              </p>
              <p>
                Today, we're proud to offer one of the largest collections of verified lyrics, helping music fans
                connect more deeply with the songs they love.
              </p>
            </div>
          </div>
          <div className="relative aspect-video md:aspect-square overflow-hidden rounded-lg border">
            <Image src="/placeholder.svg?height=600&width=600" alt="Our team" fill className="object-cover" />
          </div>
        </section>

        {/* Our Mission */}
        <section className="bg-muted rounded-lg p-8 md:p-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Our Mission</h2>
            <p className="text-xl mb-6">
              To help music lovers understand and connect with their favorite songs through accurate lyrics.
            </p>
            <div className="grid gap-6 sm:grid-cols-3">
              <div className="flex flex-col items-center p-4">
                <div className="rounded-full bg-primary/10 p-3 mb-3">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold">Accuracy</h3>
                <p className="text-sm text-muted-foreground text-center">Providing verified and correct lyrics</p>
              </div>
              <div className="flex flex-col items-center p-4">
                <div className="rounded-full bg-primary/10 p-3 mb-3">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold">Accessibility</h3>
                <p className="text-sm text-muted-foreground text-center">Making lyrics available to everyone</p>
              </div>
              <div className="flex flex-col items-center p-4">
                <div className="rounded-full bg-primary/10 p-3 mb-3">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold">Community</h3>
                <p className="text-sm text-muted-foreground text-center">Building a community of music enthusiasts</p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col items-center text-center p-4">
              <span className="text-4xl font-bold text-primary">100K+</span>
              <span className="text-muted-foreground">Songs with Lyrics</span>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <span className="text-4xl font-bold text-primary">2M+</span>
              <span className="text-muted-foreground">Monthly Users</span>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <span className="text-4xl font-bold text-primary">50K+</span>
              <span className="text-muted-foreground">Artists</span>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <span className="text-4xl font-bold text-primary">150+</span>
              <span className="text-muted-foreground">Countries</span>
            </div>
          </div>
        </section>

        {/* Team */}
        <section>
          <h2 className="text-3xl font-bold tracking-tight mb-6 text-center">Meet Our Team</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member) => (
              <div key={member.name} className="flex flex-col items-center text-center">
                <div className="relative w-32 h-32 mb-4 overflow-hidden rounded-full">
                  <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                </div>
                <h3 className="font-semibold">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Get In Touch</h2>
          <p className="text-muted-foreground mb-6">
            Have suggestions for improving our lyrics database? We'd love to hear from you!
          </p>
          <div className="flex justify-center">
            <Button size="lg" className="gap-2">
              <Mail className="h-4 w-4" />
              Contact Us
            </Button>
          </div>
        </section>
      </div>
    </div>
  )
}

// Mock data for team members
const team = [
  {
    name: "Alex Johnson",
    role: "Founder & CEO",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    name: "Sarah Chen",
    role: "Head of Content",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    name: "Marcus Williams",
    role: "Chief Technology Officer",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    name: "Priya Patel",
    role: "Head of User Experience",
    image: "/placeholder.svg?height=200&width=200",
  },
]

