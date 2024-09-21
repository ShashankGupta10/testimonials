export interface CreateSpace {
    spaceName: string;
    headerTitle: string;
    customMessage: string;
    questions: string[];
    collectStarRatings: boolean;
    extraInfo: string;
}