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

export type Results = unknown[];


export type Predicate = {
    name: string;
    _id: number;
    type: string;
    restrictCollection: string;
};

export type LinkProps = {
    getValue: any
}

export type RefProps = {
    info: any;
    refButtonClick: (value: number) => Promise<void>;
}

export type TableProps = {
    data: Dinosaur[];
    refButtonClick: (value: number) => Promise<void>;
    predicates: Predicate[];
    queryPredicates: string[];
};

export type VBTableProps = {
    variableBindings: string[];
    data: Results[];
}