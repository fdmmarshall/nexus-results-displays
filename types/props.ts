export type Ref = {
    _id: number;
};

export type Dinosaur = {
    _id: number;
    dinosaurName: string;
    englishTranslation: string;
    period: Ref;
    dinoType: Ref;
    taxonomy: Ref;
    link: string;
};

export type Predicates = {
    name: string;
    _id: number;
    type: string;
    restrictCollection: string;
};