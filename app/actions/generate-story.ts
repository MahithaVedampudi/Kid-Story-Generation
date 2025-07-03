"use server"

interface StoryParams {
  childName: string
  favoriteColor: string
  favoriteAnimal: string
  genre: string
}

// Story templates for different genres
const storyTemplates = {
  adventure: [
    `Once upon a time, there was a brave explorer named {childName} who loved everything {favoriteColor}. One day, while wearing their favorite {favoriteColor} backpack, {childName} discovered a mysterious map that led to a hidden treasure!

{childName} packed their supplies and set off on an incredible journey with their loyal companion, a wise {favoriteAnimal} named Sparkle. Together, they crossed rushing rivers, climbed tall mountains, and solved ancient riddles.

When they finally reached the treasure location, {childName} discovered that the real treasure wasn't gold or jewels, but the friendship they had built with Sparkle and the confidence they had gained from their adventure.

{childName} returned home with a heart full of joy and memories that would last forever, knowing that the greatest adventures come from being brave and kind.`,

    `{childName} was known throughout the village for their love of the color {favoriteColor} and their special bond with animals, especially {favoriteAnimal}s. One morning, a magical {favoriteColor} {favoriteAnimal} appeared at their window with an urgent message.

The {favoriteAnimal} explained that the Enchanted Forest was in danger, and only someone with a pure heart like {childName} could help save it. Without hesitation, {childName} grabbed their {favoriteColor} cloak and followed their new friend into the mystical woods.

Through courage, kindness, and clever thinking, {childName} helped restore the forest's magic. The grateful woodland creatures celebrated by painting the sky in beautiful shades of {favoriteColor}.

{childName} learned that helping others and protecting nature are the most important adventures of all.`,
  ],

  fantasy: [
    `In a magical kingdom where {favoriteColor} flowers bloomed year-round, there lived a special child named {childName} who could speak to {favoriteAnimal}s. One day, a tiny {favoriteAnimal} brought news that the kingdom's magic was fading.

{childName} embarked on a quest to find the legendary {favoriteColor} Crystal of Wonder, guided by their faithful {favoriteAnimal} friend. They traveled through enchanted meadows, crossed bridges made of rainbows, and met friendly dragons along the way.

With determination and a kind heart, {childName} discovered that the crystal's power came from acts of kindness and friendship. By helping everyone they met on their journey, {childName} restored the crystal's glow.

The kingdom was saved, and {childName} was celebrated as a true hero who proved that magic comes from caring for others.`,

    `{childName} lived in a cozy cottage at the edge of the Whispering Woods, where {favoriteColor} butterflies danced in the sunlight. Their best friend was a magical {favoriteAnimal} who could grant one wish each day.

When the village children lost their ability to dream, {childName} and their {favoriteAnimal} friend set out to find the Dream Keeper's lost {favoriteColor} staff. Their journey took them through clouds made of cotton candy and over rivers that sparkled like diamonds.

Using wisdom, bravery, and the power of imagination, {childName} found the staff and restored everyone's dreams. The grateful Dream Keeper gifted {childName} with the ability to visit the dream world whenever they wished.

{childName} learned that dreams and imagination are the most precious gifts we can share with others.`,
  ],

  mystery: [
    `Detective {childName} was famous for solving puzzles while wearing their lucky {favoriteColor} detective hat. When the town's beloved {favoriteAnimal} mascot went missing, everyone turned to {childName} for help.

Armed with a magnifying glass and their sharp mind, {childName} followed clues throughout the town. They discovered {favoriteColor} paw prints, interviewed witnesses, and pieced together the mystery step by step.

The trail led to the old library, where {childName} found the {favoriteAnimal} had been hiding because it was scared of the thunderstorm. With gentle words and patience, {childName} coaxed their furry friend out of hiding.

{childName} learned that sometimes the best way to solve a mystery is with kindness and understanding, not just clever detective work.`,

    `{childName} loved reading mystery books in their {favoriteColor} reading nook, dreaming of solving real cases. When strange {favoriteColor} lights began appearing in the night sky, {childName} decided to investigate.

With their pet {favoriteAnimal} as a faithful sidekick, {childName} gathered clues and interviewed neighbors. They discovered that the lights were actually signals from a lost baby star who had fallen from the sky.

Using creativity and compassion, {childName} helped the star family reunite by creating a {favoriteColor} beacon that could be seen from space. The grateful stars rewarded {childName} with a constellation shaped like a {favoriteAnimal}.

{childName} realized that the greatest mysteries are solved not just with logic, but with empathy and care for others.`,
  ],

  friendship: [
    `{childName} was new to town and felt lonely until they met a shy {favoriteAnimal} in the park who also seemed to need a friend. They bonded over their shared love of the color {favoriteColor} and spent every afternoon together.

When the annual Friendship Festival arrived, {childName} wanted to participate but felt nervous about meeting new people. Their {favoriteAnimal} friend encouraged them to be brave and share their talents with others.

Together, they created beautiful {favoriteColor} decorations for the festival and helped organize fun activities. Soon, {childName} had made many new friends who appreciated their kindness and creativity.

{childName} learned that friendship grows when we open our hearts and share our gifts with others, and that being a good friend means supporting each other through both happy and challenging times.`,

    `{childName} and their best friend, a gentle {favoriteAnimal} named Buddy, did everything together. They especially loved painting pictures with {favoriteColor} paint and sharing stories under their favorite tree.

When Buddy became sad because other animals teased him for being different, {childName} knew they had to help. They organized a talent show where every animal could showcase what made them special and unique.

{childName} helped Buddy discover his amazing ability to make others laugh with his silly dances. Soon, all the animals were celebrating their differences and becoming friends.

{childName} learned that true friendship means accepting others just as they are and helping them see their own special qualities.`,
  ],

  space: [
    `Captain {childName} was the youngest astronaut ever to pilot a {favoriteColor} spaceship through the galaxy. Their co-pilot was a brave space {favoriteAnimal} who helped navigate through asteroid fields and nebulae.

During their mission to explore distant planets, they received a distress signal from a planet where all the colors had disappeared. The inhabitants lived in a gray, sad world and desperately needed help.

{childName} and their {favoriteAnimal} friend used their ship's special {favoriteColor} ray to restore color to the planet. They taught the aliens about friendship, art, and the beauty of diversity.

{childName} returned to Earth as a hero, having learned that sharing joy and beauty with others makes the whole universe a brighter place.`,

    `{childName} discovered a {favoriteColor} meteorite in their backyard that turned out to be a spaceship belonging to a friendly alien {favoriteAnimal}. The alien needed help getting home to the {favoriteColor} Planet.

Together, they built a rocket using recycled materials and {childName}'s brilliant engineering skills. Their journey through space was filled with wonder as they saw shooting stars, colorful planets, and dancing comets.

When they reached the {favoriteColor} Planet, {childName} was welcomed as an honorary citizen and learned about different cultures and ways of life throughout the galaxy.

{childName} returned to Earth with a new understanding that friendship knows no boundaries and that helping others is the greatest adventure of all.`,
  ],

  underwater: [
    `{childName} was an excellent swimmer who loved exploring the ocean while wearing their {favoriteColor} diving gear. One day, they met a talking {favoriteAnimal} who lived in an underwater kingdom that was in trouble.

The ocean's coral reefs were losing their colors, and all the sea creatures were worried. {childName} volunteered to help find the magical {favoriteColor} Pearl of the Deep that could restore the reef's beauty.

Swimming deeper than ever before, {childName} and their new {favoriteAnimal} friend faced challenges with courage and teamwork. They solved riddles from wise old sea turtles and helped lost fish find their way home.

When they found the pearl, {childName} learned that its power came from acts of environmental kindness. By cleaning up ocean trash and protecting sea life, they restored the reef's vibrant colors.

{childName} became known as the Ocean Guardian, teaching others that we must protect our planet's beautiful waters for all creatures to enjoy.`,

    `{childName} loved spending time at the beach, especially looking for {favoriteColor} seashells and watching {favoriteAnimal}s play in the waves. One magical morning, they discovered they could breathe underwater!

A friendly dolphin invited {childName} to visit the lost city of Aquatica, where merpeople and sea creatures lived in harmony. The city was famous for its {favoriteColor} towers that glowed with bioluminescent light.

When pirates threatened to disturb the peaceful underwater world, {childName} used their unique ability to communicate between the land and sea worlds. They organized both humans and sea creatures to protect the ocean.

{childName} learned that being different is a gift that can help bridge worlds and that cooperation between all living beings makes everyone stronger.`,
  ],
}

export async function generateStory(params: StoryParams) {
  const { childName, favoriteColor, favoriteAnimal, genre } = params

  try {
    // Get random template from the selected genre
    const templates = storyTemplates[genre as keyof typeof storyTemplates] || storyTemplates.adventure
    const randomTemplate = templates[Math.floor(Math.random() * templates.length)]

    // Replace placeholders with user input
    const storyContent = randomTemplate
      .replace(/{childName}/g, childName)
      .replace(/{favoriteColor}/g, favoriteColor)
      .replace(/{favoriteAnimal}/g, favoriteAnimal)

    // Generate title based on the story content and inputs
    const titles = [
      `${childName} and the ${favoriteColor} ${favoriteAnimal}`,
      `${childName}'s ${genre.charAt(0).toUpperCase() + genre.slice(1)} with ${favoriteAnimal}`,
      `The ${favoriteColor} ${genre.charAt(0).toUpperCase() + genre.slice(1)} of ${childName}`,
      `${childName} and the Magical ${favoriteColor} ${favoriteAnimal}`,
      `${childName}'s Amazing ${favoriteColor} Journey`,
    ]

    const randomTitle = titles[Math.floor(Math.random() * titles.length)]

    // Create a custom placeholder image URL with story details
    const imageUrl = `/placeholder.svg?height=400&width=400&text=${encodeURIComponent(`${childName}'s ${genre} with ${favoriteAnimal}`)}`

    return {
      title: randomTitle,
      content: storyContent,
      imageUrl: imageUrl,
    }
  } catch (error) {
    console.error("Error generating story:", error)

    // Ultimate fallback
    return {
      title: `${childName}'s Special Adventure`,
      content: `Once upon a time, there was a wonderful child named ${childName} who loved the color ${favoriteColor} and had a special friend - a ${favoriteAnimal}. Together, they went on amazing adventures and learned that friendship, kindness, and courage are the most important things in the world. ${childName} always remembered that being yourself and helping others makes every day magical. The End.`,
      imageUrl: `/placeholder.svg?height=400&width=400&text=${encodeURIComponent(`${childName} & ${favoriteAnimal}`)}`,
    }
  }
}
