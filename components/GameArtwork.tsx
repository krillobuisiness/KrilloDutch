import Image from "next/image";
import { KRILLO_ARTWORK } from "@/lib/artwork-registry";

type ArtworkVariant = "homepage" | "gateway" | "walking" | "climbing" | "standing";

const variantMap: Record<ArtworkVariant, { path: string; alt: string }> = {
  homepage: {
    path: KRILLO_ARTWORK.homepageHero.path,
    alt: KRILLO_ARTWORK.homepageHero.alt
  },
  gateway: {
    path: KRILLO_ARTWORK.gatewaySun.path,
    alt: KRILLO_ARTWORK.gatewaySun.alt
  },
  walking: {
    path: KRILLO_ARTWORK.goatWalkingRuins.path,
    alt: KRILLO_ARTWORK.goatWalkingRuins.alt
  },
  climbing: {
    path: KRILLO_ARTWORK.goatClimbingStairs.path,
    alt: KRILLO_ARTWORK.goatClimbingStairs.alt
  },
  standing: {
    path: KRILLO_ARTWORK.goatStandingPlatform.path,
    alt: KRILLO_ARTWORK.goatStandingPlatform.alt
  }
};

type SceneArtworkProps = {
  variant: ArtworkVariant;
  className?: string;
  alt?: string;
  objectFit?: "cover" | "contain";
  objectPosition?: string;
  priority?: boolean;
};

export function SceneArtwork({
  variant,
  className = "",
  alt,
  objectFit = "cover",
  objectPosition = "center",
  priority = false
}: SceneArtworkProps) {
  const asset = variantMap[variant];
  const isDecorative = !alt;

  return (
    <div aria-hidden={isDecorative ? true : undefined} className={`game-environment ${className}`.trim()}>
      <Image
        alt={alt ?? ""}
        fill
        priority={priority}
        quality={90}
        sizes="100vw"
        src={asset.path}
        style={{ objectFit, objectPosition }}
      />
    </div>
  );
}

export function HomeHeroArtwork() {
  return (
    <div aria-hidden="true" className="hero-scene">
      <Image
        alt=""
        fill
        priority
        quality={90}
        sizes="100vw"
        src={KRILLO_ARTWORK.homepageHero.path}
        style={{ objectFit: "cover", objectPosition: "center 28%" }}
      />
    </div>
  );
}

export function GameIntroArtwork({ className = "game-environment--intro", priority = true }: { className?: string; priority?: boolean }) {
  return (
    <SceneArtwork
      alt={KRILLO_ARTWORK.gatewaySun.alt}
      className={className}
      objectFit="cover"
      objectPosition="center 38%"
      priority={priority}
      variant="gateway"
    />
  );
}

export function WalkingFeedbackArtwork() {
  return (
    <figure className="feedback-artwork">
      <Image
        alt={KRILLO_ARTWORK.goatWalkingRuins.alt}
        fill
        quality={90}
        sizes="(max-width: 600px) 100vw, 60vw"
        src={KRILLO_ARTWORK.goatWalkingRuins.path}
        style={{ objectFit: "contain", objectPosition: "center" }}
      />
    </figure>
  );
}

export function ClimbingFeedbackArtwork() {
  return (
    <figure className="feedback-artwork">
      <Image
        alt={KRILLO_ARTWORK.goatClimbingStairs.alt}
        fill
        quality={90}
        sizes="(max-width: 600px) 100vw, 60vw"
        src={KRILLO_ARTWORK.goatClimbingStairs.path}
        style={{ objectFit: "contain", objectPosition: "center" }}
      />
    </figure>
  );
}

export function ResultArtwork() {
  return (
    <figure className="result-goat-artwork">
      <Image
        alt={KRILLO_ARTWORK.goatStandingPlatform.alt}
        fill
        quality={90}
        sizes="(max-width: 600px) 100vw, 32vw"
        src={KRILLO_ARTWORK.goatStandingPlatform.path}
        style={{ objectFit: "contain", objectPosition: "center" }}
      />
    </figure>
  );
}

export function GoatStandingArtwork() {
  return <ResultArtwork />;
}