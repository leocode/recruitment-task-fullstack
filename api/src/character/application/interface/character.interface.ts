
export interface Metadata {
    count: number;
    pages: number;
    next: string;
    prev: string | null;
}

export interface CharacterOrigin {
    name: string;
    url: string;
}

export interface CharacterLocation {
    name: string;
    url: string;
}

export interface Character {
    id: number;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    origin: CharacterOrigin;
    location: CharacterLocation,
    image: string;
    episode: string[];
    url: string;
    cost: number;
    created: string;
}

export interface Characters {
    info: Metadata;
    results: Character[];

}