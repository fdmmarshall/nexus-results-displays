import { Predicate } from "../types/props";

export default function createColumns(predicates: Predicate[]) {

    const filteredPredicates = predicates.map(predicate => [predicate.name.substring(predicate.name.indexOf("/") + 1), predicate.type])

    console.log(filteredPredicates)

    return filteredPredicates

}