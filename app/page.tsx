"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, BookOpen, Sparkles, Volume2, RefreshCw } from "lucide-react"
import { generateStory } from "./actions/generate-story"

interface Story {
  title: string
  content: string
  imageUrl: string
}

export default function StoryGenerator() {
  const [formData, setFormData] = useState({
    childName: "",
    favoriteColor: "",
    favoriteAnimal: "",
    genre: "",
  })
  const [story, setStory] = useState<Story | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isRegenerating, setIsRegenerating] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)

  const genres = [
    { value: "adventure", label: "Adventure" },
    { value: "fantasy", label: "Fantasy" },
    { value: "mystery", label: "Mystery" },
    { value: "friendship", label: "Friendship" },
    { value: "space", label: "Space Adventure" },
    { value: "underwater", label: "Underwater Adventure" },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.childName || !formData.favoriteColor || !formData.favoriteAnimal || !formData.genre) {
      return
    }

    setIsGenerating(true)
    try {
      const result = await generateStory(formData)
      setStory(result)
    } catch (error) {
      console.error("Error generating story:", error)
      // Show user-friendly error message
      alert(
        "Sorry, there was an issue creating your story. Please try again or check that the OpenAI API key is configured.",
      )
    } finally {
      setIsGenerating(false)
    }
  }

  const handleRegenerate = async () => {
    if (!story) return

    setIsRegenerating(true)
    try {
      const result = await generateStory(formData)
      setStory(result)
    } catch (error) {
      console.error("Error regenerating story:", error)
      alert("Sorry, there was an issue creating a new story. Please try again.")
    } finally {
      setIsRegenerating(false)
    }
  }

  const handleReadAloud = () => {
    if (!story || !("speechSynthesis" in window)) return

    if (isSpeaking) {
      window.speechSynthesis.cancel()
      setIsSpeaking(false)
      return
    }

    const utterance = new SpeechSynthesisUtterance(story.content)
    utterance.rate = 0.8
    utterance.pitch = 1.1
    utterance.volume = 0.9

    utterance.onstart = () => setIsSpeaking(true)
    utterance.onend = () => setIsSpeaking(false)
    utterance.onerror = () => setIsSpeaking(false)

    window.speechSynthesis.speak(utterance)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-purple-800 mb-2 flex items-center justify-center gap-2">
            <BookOpen className="h-8 w-8" />
            Magical Story Creator
          </h1>
          <p className="text-purple-600 text-lg">Create personalized stories just for you!</p>
        </div>

        {!story ? (
          <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0">
            <CardHeader>
              <CardTitle className="text-2xl text-center text-purple-700 flex items-center justify-center gap-2">
                <Sparkles className="h-6 w-6" />
                Tell us about yourself!
              </CardTitle>
              <CardDescription className="text-center text-purple-600">
                We'll create a magical story just for you
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="childName" className="text-purple-700 font-medium">
                      What's your name?
                    </Label>
                    <Input
                      id="childName"
                      placeholder="Enter your name"
                      value={formData.childName}
                      onChange={(e) => setFormData((prev) => ({ ...prev, childName: e.target.value }))}
                      className="border-purple-200 focus:border-purple-400"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="favoriteColor" className="text-purple-700 font-medium">
                      What's your favorite color?
                    </Label>
                    <Input
                      id="favoriteColor"
                      placeholder="e.g., Rainbow, Blue, Pink"
                      value={formData.favoriteColor}
                      onChange={(e) => setFormData((prev) => ({ ...prev, favoriteColor: e.target.value }))}
                      className="border-purple-200 focus:border-purple-400"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="favoriteAnimal" className="text-purple-700 font-medium">
                      What's your favorite animal?
                    </Label>
                    <Input
                      id="favoriteAnimal"
                      placeholder="e.g., Dragon, Unicorn, Cat"
                      value={formData.favoriteAnimal}
                      onChange={(e) => setFormData((prev) => ({ ...prev, favoriteAnimal: e.target.value }))}
                      className="border-purple-200 focus:border-purple-400"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="genre" className="text-purple-700 font-medium">
                      What kind of story do you like?
                    </Label>
                    <Select
                      value={formData.genre}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, genre: value }))}
                    >
                      <SelectTrigger className="border-purple-200 focus:border-purple-400">
                        <SelectValue placeholder="Choose a story type" />
                      </SelectTrigger>
                      <SelectContent>
                        {genres.map((genre) => (
                          <SelectItem key={genre.value} value={genre.value}>
                            {genre.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 text-lg"
                  disabled={
                    isGenerating ||
                    !formData.childName ||
                    !formData.favoriteColor ||
                    !formData.favoriteAnimal ||
                    !formData.genre
                  }
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Creating your magical story...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-5 w-5" />
                      Create My Story!
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            <Card className="bg-white/90 backdrop-blur-sm shadow-xl border-0">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl text-purple-800 mb-2">{story.title}</CardTitle>
                <div className="flex justify-center gap-4">
                  <Button
                    onClick={handleReadAloud}
                    variant="outline"
                    className="border-purple-300 text-purple-700 hover:bg-purple-50 bg-transparent"
                  >
                    <Volume2 className="mr-2 h-4 w-4" />
                    {isSpeaking ? "Stop Reading" : "Read Aloud"}
                  </Button>
                  <Button
                    onClick={handleRegenerate}
                    variant="outline"
                    className="border-purple-300 text-purple-700 hover:bg-purple-50 bg-transparent"
                    disabled={isRegenerating}
                  >
                    {isRegenerating ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <RefreshCw className="mr-2 h-4 w-4" />
                    )}
                    New Story
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-lg">
                      <img
                        src={story.imageUrl || "/placeholder.svg"}
                        alt="Story illustration"
                        className="w-full h-64 object-cover rounded-lg shadow-lg"
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="prose prose-purple max-w-none">
                      <Textarea
                        value={story.content}
                        readOnly
                        className="min-h-[300px] text-base leading-relaxed border-purple-200 bg-gradient-to-br from-purple-50/50 to-pink-50/50 resize-none"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="text-center">
              <Button
                onClick={() => setStory(null)}
                variant="outline"
                className="border-purple-300 text-purple-700 hover:bg-purple-50"
              >
                Create Another Story
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
