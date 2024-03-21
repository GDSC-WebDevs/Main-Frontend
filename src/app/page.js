import Image from "next/image";

import {Stars } from "@/components/Stars/Stars";

import { ExperienceCard } from "@/components/ExperienceCard/ExperienceCard";

export default function Home() {
  return (
    <main>
      <br/>

      <ExperienceCard  name = "Robert Downey Jr." 
                      stars={3}
                      ctcNum= "75 LpA" 
                      positionData = "Software Developer"
                      positionData2 = "FTE"
                      image = "https://source.unsplash.com/random/300x300"
                      companyImage = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Goldman_Sachs.svg/2048px-Goldman_Sachs.svg.png"/>
      <br/>
      <ExperienceCard  name = "Iron Man" 
                      stars={5}
                      ctcNum= "750 LpD" 
                      positionData = "Billionaire"
                      positionData2 = "Avenger"
                      image = "https://source.unsplash.com/random/200x200"
                      companyImage = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Goldman_Sachs.svg/2048px-Goldman_Sachs.svg.png"/>
      
    </main>
  );
}
