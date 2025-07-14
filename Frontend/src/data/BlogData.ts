
export type BlogType = {
    id: string;
    title: string;
    synopsis: string;
    content: string;
    author: string;
    createdAt: string;
    featuredImg: string;
  };
  
  export const blogData: BlogType[] = [
    {
      id: "1",
      title: "The Beauty of Minimalism",
      synopsis: "Why less can often mean more, and how simplicity clears the mind.",
      content: `
  ## The Beauty of Minimalism
  
  Minimalism isn't about having less. It's about making room for what truly matters.
  
  > "The ability to simplify means to eliminate the unnecessary so that the necessary may speak." – Hans Hofmann
  
  In a world of distractions, simplicity is a rebellion. Minimalism helps you focus, breathe, and live with intention. Start with your space. Then your schedule. Then your soul.
  
  **Try this today:**  
  Declutter one corner of your room. Feel the lightness.  
      `,
      author: "Claire Nora",
      createdAt: "2025-07-01",
      featuredImg: "https://res.cloudinary.com/demo/image/upload/v1620212345/minimalism.jpg"
    },
    {
      id: "2",
      title: "Living with Purpose",
      synopsis: "Learn how intentional living can transform your day-to-day.",
      content: `
  ## Living with Purpose
  
  Purpose doesn't have to be grand or global. It can be local, quiet, and personal.
  
  Wake up and ask: _What matters most today?_  
  When your choices align with your values, even the mundane feels meaningful.
  
  **Steps to start:**
  - Write down your top 3 values.
  - Cut 1 thing today that doesn't serve them.
  - Replace it with something that does.
  
  Every purposeful day is a step toward a purposeful life.
      `,
      author: "Claire Nora",
      createdAt: "2025-07-05",
      featuredImg: "https://res.cloudinary.com/demo/image/upload/v1620212345/purpose.jpg"
    },
    {
      id: "3",
      title: "Digital Rest: Why You Need It",
      synopsis: "Too much screen time? Discover the power of unplugging regularly.",
      content: `
  ## Digital Rest: Why You Need It
  
  We're always online. But rest doesn't happen in notifications.  
  
  > Real rest is offline. Uninterrupted. Unfiltered.
  
  Digital rest means:
  - No screens before bed.
  - Reclaiming mornings without phones.
  - Deep focus without the urge to scroll.
  
  **Challenge:**  
  Try a 1-hour screen break each day. No phone, no laptop. Just you and the world around you.
  
  Let your mind breathe.  
      `,
      author: "Claire Nora",
      createdAt: "2025-07-10",
      featuredImg: "https://res.cloudinary.com/demo/image/upload/v1620212345/digitalrest.jpg"
    },
    {
      id: "4",
      title: "Routines That Actually Heal",
      synopsis: "Not all routines are soul-crushing. Some rebuild you.",
      content: `
  ## Routines That Actually Heal
  
  We often confuse routine with monotony. But healing routines bring rhythm and restoration.
  
  **Examples:**
  - Morning journaling with tea
  - Evening walks with no music
  - Weekly check-ins with your emotions
  
  The goal isn't perfection. It's presence.
  
  > A good routine doesn't trap you. It frees you.
  
  Start small. Pick one moment of your day and ritualize it. Watch how your soul responds.
      `,
      author: "Claire Nora",
      createdAt: "2025-07-12",
      featuredImg: "https://res.cloudinary.com/demo/image/upload/v1620212345/healingroutines.jpg"
    },
  ];
  
  