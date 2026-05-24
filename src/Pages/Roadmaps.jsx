import RoadmapCard from "../Components/custom-components/RoadmapCard";
import ROADMAP_CARDS from "../Data/dataRoadmap";

export default function Roadmaps() {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 w-full max-w-6xl mx-auto">
        {ROADMAP_CARDS.map((roadmap) => (
          <div key={roadmap.id}>
            <RoadmapCard roadmap={roadmap} />
          </div>
        ))}
      </div>
    </>
  );
}
